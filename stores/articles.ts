import { defineStore, skipHydrate } from 'pinia';
import { ref } from 'vue';
import type { Database } from '~/supabase/database.types';
import type { Article, Category, Tag } from '~/types';
import type { SortItem } from '~/types/shared';
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
        category_id: null,
        title: '',
        content: '',
        published_at: null,
    });
    const createItemValueTags = ref<string[]>([]);
    const categoryItemState = reactive<{
        value: Category[],
        loading: boolean,
    }>({
        value: [],
        loading: false,
    });
    const tagItemState = reactive<{
        value: Tag[],
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
                      name
                  ),
                  article_tags (
                    tags (
                        name
                    )
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
            categoryItemState.value = data as Category[];
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
            tagItemState.value = data as Tag[];
            tagItemState.loading = false;
        } catch (error) {
            console.log(error);
        }
    }

    type AticleTagType = Database["public"]["Tables"]["articles"]["Row"]
    const bindTags = async (value: AticleTagType) => {
        if (value.id !== null && createItemValueTags.value) {
            await supabase.from('article_tags').delete().eq('article_id', value.id);
            if (createItemValueTags.value.length > 0) {
                const tagsValue = createItemValueTags.value.map(tagId => {
                    return { article_id: value.id, tag_id: tagId };
                });
                await supabase.from('article_tags').upsert(tagsValue)
            }

            createItemValueTags.value = [];
        }
    }

    const createItem = async () => {
        try {
            const { error, data } = await supabase.from('articles')
                .insert(createItemValue)
                .select(`*, article_tags()`).single();
            if (error) throw error;
            bindTags(data);

            createDialog.value = false;
            createItemValue.title = '';
            createItemValue.category_id = null;
            createItemValue.content = '';
            createItemValue.published_at = null;

            refreshData();
        } catch (error) {
            console.log(error);
        }
    }

    const deleteItem = async (value: Article) => {
        try {
            if (value.id) {
                const { error, count } = await supabase.from('articles')
                    .delete()
                    .eq('id', value.id);
                if (error) throw error;
                if (count && count > 0) {
                    console.log(`Deleted:: ${count}`);
                    refreshData();
                }
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
        deleteItem,
        bindTags,
    }
});