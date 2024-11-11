import { defineStore, skipHydrate } from 'pinia';
import { ref } from 'vue';
import type { Database } from '~/supabase/database.types';
import type { CategoryItem, SortItem, TagItem } from '~/types/shared';
import { getPagingFilter } from '~/util/shared';

export const useArticles = defineStore('articles', () => {
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

    /** Selction items */

    const createItemValue = reactive({
        title: '',
        content: '',
        category_id: null,
        published_at: null,
    });
    const createItemValueTags = ref();
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
                .ilike('title', `%${search.value}%`)

            const { data, count, error } = await aritclesWithCategoriesQuery;
            if (error) throw error;

            totalItems.value = count ?? 0;
            serverItems.value = data;
            loading.value = false;
        } catch (error) {
            console.log(error);
        }
    }

    const refreshData = () => loadItems({ page: itemsPage.value, itemsPerPage: itemsPerPage.value, sortBy: sortBy.value, });

    const loadCategoryItems = async (search: string = '') => {
        categoryItemState.loading = true;
        try {
            const { data, error } = await supabase.from('categories')
                .select('*', { count: 'exact' })
                .ilike('name', `%${search}%`)
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
                .ilike('name', `%${search}%`)
                .range(0, 9);
            if (error) throw error;
            tagItemState.value = data as TagItem[];
            tagItemState.loading = false;
        } catch (error) {
            console.log(error);
        }
    }

    const createItem = async () => {
        try {
            const { error, data } = await supabase.from('articles').insert(createItemValue).select().single();
            if (error) throw error;
            console.log(data);
            createDialog.value = false;
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

                refreshData();
                deleteDialog.value = false;
            }
        } catch (error) {

        }
    }

    return {
        loading: skipHydrate(loading),
        search: skipHydrate(search),
        itemsPage: skipHydrate(itemsPage),
        itemsPerPage: skipHydrate(itemsPerPage),
        serverItems: skipHydrate(serverItems),
        totalItems: skipHydrate(totalItems),
        sortBy: skipHydrate(sortBy),
        createDialog,
        deleteDialog,
        createItemValue,
        createItemValueTags,
        categoryItemState,
        tagItemState,
        loadItems,
        refreshData,
        loadCategoryItems,
        loadTagItems,
        createItem,
        deleteItem
    }
});