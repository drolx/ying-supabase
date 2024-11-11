<script lang="ts" setup>
import type { Database } from '~/supabase/database.types';
import { useDate } from 'vuetify';
import { VDateInput } from 'vuetify/labs/VDateInput';
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
  { title: 'Title', key: 'title' },
  { title: 'Published At', key: 'published_at' },
  { title: 'Category', key: 'categories.name' },
  { title: 'Actions', key: 'actions', sortable: false },
];

const loadItems = async (args: { page: number, itemsPerPage: number, sortBy: SortItem[] }) => {
  loading.value = true
  try {
    const { from, to, ascending, filter } = getPagingFilter(args);

    const aritclesWithCategoriesQuery = supabase.from('articles')
      .select(`
            *,
            categories (
                id,
                name
            )
            `,
        { count: 'exact' })
      .range(from, to)
      .order(filter, { ascending })
      .like('title', `%${search.value}%`)

    const { data, count, error } = await aritclesWithCategoriesQuery;
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
  title: '',
  content: '',
  category_id: null,
  published_at: null,
});
const createItemValueTags = ref();

/** Selction items */
type CategoryItem = {
  created_at: string;
  description: string | null;
  id: number;
  name: string;
}
type TagItem = {
  created_at: string;
  id: number;
  name: string;
}
const categoryItemState = reactive<{
  value: CategoryItem[],
  loading: boolean,
}>({
  value: [],
  loading: false,
});
const tagItemState = reactive<{
  value: TagItem[],
  loading: boolean,
}>({
  value: [],
  loading: false,
});

const createItem = async () => {
  try {
    const { error, data } = await supabase.from('articles').insert(createItemValue).single();
    if (error) throw error;
    createDialog.value = false;
    console.log(createItemValueTags.value);
    console.log(data);
    refreshData();
  } catch (error) {
    console.log(error);
  }
}
const deleteItem = async (value: any) => {
  try {
    if (value?.id) {
      const { error } = await supabase.from('articles')
        .delete({ count: 'exact' })
        .eq('id', value.id);
      if (error) throw error;
    }
  } catch (error) {

  } finally {
    loadItems({ page: itemsPage.value, itemsPerPage: itemsPerPage.value, sortBy: sortBy.value, });
    deleteDialog.value = false;
  }
}

const loadCategoryItems = async (search: string = '') => {
  categoryItemState.loading = true;
  try {
    const { data, error } = await supabase.from('categories')
      .select('*', { count: 'exact' })
      .like('name', `%${search}%`)
      .range(0, 9);
    if (error) throw error;
    categoryItemState.value = data as CategoryItem[];
    categoryItemState.loading = false;
  } catch (error) {
    console.log(error);
  }
}

const loadTagItems = async (search: string = '') => {
  tagItemState.loading = true;
  try {
    const { data, error } = await supabase.from('tags')
      .select('*', { count: 'exact' })
      .like('name', `%${search}%`)
      .range(0, 9);
    if (error) throw error;
    tagItemState.value = data as TagItem[];
    tagItemState.loading = false;
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <v-card flat>
    <v-card-title class="d-flex align-center pe-2">
      <v-icon class="me-4" icon="mdi-post"></v-icon>
      <span>{{ 'Articles' }}</span>
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
          <v-form>
            <v-card prepend-icon="mdi-account" title="Create Article">
              <v-card-text>
                <v-row dense>
                  <v-col cols="12">
                    <v-text-field v-model="createItemValue.title" label="Title" required></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-date-input prepend-icon="" v-model="createItemValue.published_at"
                      label="Publish date"></v-date-input>
                  </v-col>
                  <v-col cols="12">
                    <v-autocomplete @update:menu="() => loadCategoryItems('')" @update:search="loadCategoryItems"
                      v-model="createItemValue.category_id" :loading="categoryItemState.loading"
                      :items="categoryItemState.value" label="Categories" hint="Select article category"
                      item-title="name" item-value="id"></v-autocomplete>
                  </v-col>
                  <v-col clos="12">
                    <v-autocomplete @update:menu="() => loadTagItems('')" @update:search="loadTagItems"
                      v-model="createItemValueTags" :loading="tagItemState.loading" :items="tagItemState.value"
                      hint="Pick article tags" label="Tags" multiple chips item-title="name"
                      item-value="id"></v-autocomplete>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea label="Content" v-model="createItemValue.content" variant="filled"
                      auto-grow></v-textarea>
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
          </v-form>
        </template>
      </v-dialog>
    </v-card-title>
    <v-divider></v-divider>
    <v-data-table :height="500" v-model:search="search" v-model:sort-by="sortBy" v-model:items-per-page="itemsPerPage"
      v-model:page="itemsPage" :headers="headers" v-model:items="serverItems" v-model:items-length="totalItems"
      v-model:loading="loading" item-value="name" @update:options="loadItems">
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
          :to="`/articles/${item.id}`"></v-btn>
        <v-btn variant="plain" class="me-3" density="comfortable" color="warning" icon="mdi-pencil"
          :to="`/articles/modify/${item.id}`">
        </v-btn>
        <!-- Delete Confirmation -->
        <v-dialog v-model="deleteDialog" max-width="380">
          <template v-slot:activator="{ props: activatorProps }">
            <v-icon v-bind="activatorProps" color="error" icon="mdi-delete" />
          </template>
          <template v-slot:default="{ isActive }">
            <v-card prepend-icon="mdi-variable" :title="`Article - ${item.name}`"
              :text="`Confirm you're deleting ${item.name}`">
              <template v-slot:actions>
                <v-btn color="primary" class="ml-auto" text="Cancel" @click="isActive.value = false"></v-btn>
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
