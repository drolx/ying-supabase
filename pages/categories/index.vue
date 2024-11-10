<script lang="ts" setup>
import type { Database } from '~/supabase/database.types';
import { useDate } from 'vuetify'

const date = useDate()
const supabase = useSupabaseClient<Database>();

const loading = ref(false);
const itemsPerPage = ref(10);
const serverItems = ref<any[]>([]);
const totalItems = ref(0);

const headers = [
    { title: 'ID', key: 'id' },
    { title: 'Created At', key: 'created_at' },
    { title: 'Name', key: 'name' },
    { title: 'Description', key: 'description' },
    { title: 'Actions', key: 'actions', sortable: false },
];

const loadItems = async (args: { page: number, itemsPerPage: number, sortBy: { key: string, order: string }[] }) => {
    loading.value = true
    try {
        let filter: string = 'id';
        let ascending: boolean = false;
        const from = args.page === 1 ? 0 : args.page * args.itemsPerPage;
        const to = from + args.itemsPerPage - 1;

        if (args.sortBy[0] && args.sortBy[0].key) {
            filter = args.sortBy[0].key;
            ascending = args.sortBy[0].order !== 'asc';
        }

        const { data, count, error } = await supabase.from('categories')
            .select('*', { count: 'exact' })
            .range(from, to)
            .order(filter, { ascending })

        if (error) throw error;
        totalItems.value = count ?? 0;
        serverItems.value = data as any[];
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
    }
}

const editItem = (value: object) => {
    console.log(value);
}

const deleteItem = (value: object) => {
    console.log(value);
}
</script>

<template>
    <div>
        <v-data-table :height="500" v-model:items-per-page="itemsPerPage" :headers="headers" :items="serverItems"
            :items-length="totalItems" :loading="loading" item-value="name" @update:options="loadItems">
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
                    :to="`/tags/${item.id}`"></v-btn>
                <v-icon color="warning" icon="mdi-pencil" class="me-3" @click="editItem(item)" />
                <v-icon color="error" icon="mdi-delete" @click="deleteItem(item)" />
            </template>
        </v-data-table>
    </div>
</template>
