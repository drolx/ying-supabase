import { defineStore } from 'pinia'
import type { Database } from '~/supabase/database.types';
import type { SortItem } from '~/types/shared';
import { getPagingFilter } from '~/util/shared';

export const useCategories = defineStore('categories', () => {
  const supabase = useSupabaseClient<Database>();

  const loading = ref(false);
  const search = ref('');
  const itemsPage = ref(1);
  const itemsPerPage = ref(10);
  const serverItems = ref<any[]>([]);
  const totalItems = ref(0);
  const sortBy = ref<SortItem[]>([]);
  const createDialog = ref(false);
  const deleteDialog = ref(false);
  const createItemValue = reactive<{
    name: string,
    description: string | null,
  }>({
    name: '',
    description: null,
  });

  const loadItems = async (args: { page: number, itemsPerPage: number, sortBy: SortItem[] }) => {
    loading.value = true
    try {
      const { from, to, ascending, filter } = getPagingFilter(args);
      const { data, count, error } = await supabase.from('categories')
        .select('*', { count: 'exact' })
        .range(from, to)
        .order(filter, { ascending })
        .ilike('name', `%${search.value}%`)

      if (error) throw error;
      totalItems.value = count ?? 0;
      serverItems.value = data;
      loading.value = false;
    } catch (error) {
      console.log(error);
    }
  }

  const refreshData = () => loadItems({ page: itemsPage.value, itemsPerPage: itemsPerPage.value, sortBy: sortBy.value, });

  const createItem = async () => {
    try {
      const { error, data } = await supabase.from('categories').insert(createItemValue).select().single();
      if (error) throw error;
      if (data) {
        createDialog.value = false;
        refreshData();
      }
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
        refreshData();
        deleteDialog.value = false;
      }
    } catch (error) {
      console.log(error);
    }
  }


  return {
    loading,
    search,
    itemsPage,
    itemsPerPage,
    serverItems,
    totalItems,
    sortBy,
    createDialog,
    deleteDialog,
    createItemValue,
    loadItems,
    refreshData,
    createItem,
    deleteItem,
  }
})
