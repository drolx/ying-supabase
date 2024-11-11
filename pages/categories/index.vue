<script lang="ts" setup>
import type { Database } from '~/supabase/database.types';
import { useDate } from 'vuetify'
import type { SortItem } from '~/types/shared';
import { getPagingFilter } from '~/util/shared';

const date = useDate()
const supabase = useSupabaseClient<Database>();

const loading = ref(false);
const search = ref('');
const itemsPage = ref(1);
const itemsPerPage = ref(10);
const serverItems = ref<any[]>([]);
const totalItems = ref(0);
const sortBy = ref<SortItem[]>([])

const headers = [
    { title: 'ID', key: 'id' },
    { title: 'Created At', key: 'created_at' },
    { title: 'Name', key: 'name' },
    { title: 'Description', key: 'description' },
    { title: 'Actions', key: 'actions', sortable: false },
];

const loadItems = async (args: { page: number, itemsPerPage: number, sortBy: SortItem[] }) => {
    loading.value = true
    try {
        const { from, to, ascending, filter } = getPagingFilter(args);
        const { data, count, error } = await supabase.from('categories')
            .select('*', { count: 'exact' })
            .range(from, to)
            .order(filter, { ascending })
            .like('name', `%${search.value}%`)

        if (error) throw error;
        totalItems.value = count ?? 0;
        serverItems.value = data;
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
    }
}

const refreshData = () => loadItems({ page: itemsPage.value, itemsPerPage: itemsPerPage.value, sortBy: sortBy.value, });
const createDialog = ref(false);
const deleteDialog = ref(false);
const createItemValue = reactive({
    name: '',
    description: '',
});

const createItem = async () => {
    try {
        const { error } = await supabase.from('categories').insert(createItemValue);
        if (error) throw error;
        createDialog.value = false;
        refreshData();
    } catch (error) {
        console.log(error);
    }
}
const deleteItem = async (value: any) => {
  try {
    if (value?.id) {
      const { error, count } = await supabase.from('categories')
        .delete({ count: 'exact' })
        .eq('id', value.id)

      if (error) throw error;
    }
  } catch (error) {

  } finally {
    loadItems({ page: itemsPage.value, itemsPerPage: itemsPerPage.value, sortBy: sortBy.value, });
    deleteDialog.value = false;
  }
}
</script>

<template>
    <v-card flat>
        <v-card-title class="d-flex align-center pe-2">
            <v-icon class="me-4" icon="mdi-group"></v-icon>
            <span>{{ 'Categories' }}</span>
            <v-spacer></v-spacer>
            <v-btn variant="plain" color="accent" size="md" class="me-3" :disabled="loading" append-icon="mdi-refresh"
                @click="refreshData"></v-btn>
            <v-text-field v-model="search" density="compact" label="Search" prepend-inner-icon="mdi-magnify"
                variant="solo-filled" flat hide-details class="me-3" single-line></v-text-field>
            <!-- Create New -->
            <v-dialog v-model="createDialog" max-width="600">
                <template v-slot:activator="{ props: activatorProps }">
                    <v-btn color="secondary" v-bind="activatorProps" variant="elevated">
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </template>
                <template v-slot:default="{ isActive }">
                    <v-card prepend-icon="mdi-account" title="Create Category">
                        <v-card-text>
                            <v-row dense>
                                <v-col cols="12">
                                    <v-text-field v-model="createItemValue.name" label="Name" required></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-textarea label="Description" v-model="createItemValue.description"
                                        variant="filled" auto-grow></v-textarea>
                                </v-col>
                            </v-row>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-btn text="Cancel" variant="plain" @click="isActive.value = false"></v-btn>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" text="Save" variant="tonal" @click="createItem"></v-btn>
                        </v-card-actions>
                    </v-card>
                </template>
            </v-dialog>
        </v-card-title>
        <v-divider></v-divider>
        <v-data-table :height="500" v-model:search="search" v-model:sort-by="sortBy"
            v-model:items-per-page="itemsPerPage" v-model:page="itemsPage" :headers="headers"
            v-model:items="serverItems" v-model:items-length="totalItems" v-model:loading="loading" item-value="name"
            @update:options="loadItems">
            <template v-slot:item.created_at="{ value }">
                <v-chip color="primary">
                    {{ date.format(value, 'keyboardDateTime24h') }}
                </v-chip>
            </template>
            <template v-slot:loading>
                <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-btn rounded color="secondary" class="me-3" density="comfortable" icon="mdi-eye"
                    :to="`/categories/${item.id}`"></v-btn>
                <v-btn variant="plain" class="me-3" density="comfortable" color="warning" icon="mdi-pencil"
                    :to="`/categories/modify/${item.id}`">
                </v-btn>
                <!-- Delete Confirmation -->
                <v-dialog v-model="deleteDialog" max-width="380">
                    <template v-slot:activator="{ props: activatorProps }">
                        <v-icon v-bind="activatorProps" color="error" icon="mdi-delete" />
                    </template>
                    <template v-slot:default="{ isActive }">
                        <v-card prepend-icon="mdi-variable" :title="`Tag - ${item.name}`"
                            :text="`Confirm you're deleting ${item.name}`">
                            <template v-slot:actions>
                                <v-btn color="primary" class="ml-auto" text="Cancel"
                                    @click="isActive.value = false"></v-btn>
                                <v-spacer></v-spacer>
                                <v-btn color="error" variant="text" class="ml-auto" text="Delete"
                                    @click="() => deleteItem(item)"></v-btn>
                            </template>
                        </v-card>
                    </template>
                </v-dialog>
            </template>
        </v-data-table>
    </v-card>
</template>
