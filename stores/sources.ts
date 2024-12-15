import { defineStore, skipHydrate } from 'pinia';
import { ref, reactive } from 'vue';
import type { Database } from '~/supabase/functions/_shared/database.types';
import type { Article, Source } from '~/supabase/functions/types';
import type { SortItem } from '~/types/shared';
import { getPagingFilter } from '~/util/shared';

export const useSources = defineStore('sources', () => {
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

    const createItemValue = reactive({
        label: '',
        link: '',
    });

    const createItemValueArticles = ref<string[]>([]);
    const articleItemState = reactive<{
        value: Article[],
        loading: boolean,
    }>({
        value: [],
        loading: false,
    });

    const loadItems = async (args: { page: number, itemsPerPage: number, sortBy: SortItem[] }) => {
        loading.value = true;
        try {
            const { from, to, ascending, filter } = getPagingFilter(args);

            const sourcesWithArticlesQuery = supabase.from('sources')
                .select(`
                  *,
                  article_sources (
                    articles (
                        title
                    )
                  )
                `, { count: 'exact' })
                .range(from, to)
                .order(filter, { ascending })
                .ilike('label', `%${search.value}%`);

            const { data, count, error } = await sourcesWithArticlesQuery;
            if (error) throw error;

            totalItems.value = count ?? 0;
            serverItems.value = data;
            loading.value = false;
        } catch (error) {
            console.log(error);
        }
    };

    const refreshData = () => loadItems({ page: itemsPage.value, itemsPerPage: itemsPerPage.value, sortBy: sortBy.value });

    const loadArticleItems = async (search: string = '') => {
        articleItemState.loading = true;
        try {
            const { data, error } = await supabase.from('articles')
                .select('*', { count: 'exact' })
                .ilike('title', `%${search}%`)
                .range(0, 9);
            if (error) throw error;
            articleItemState.value = data as Article[];
            articleItemState.loading = false;
        } catch (error) {
            console.log(error);
        }
    };

    type SourceArticleType = Database["public"]["Tables"]["sources"]["Row"];
    const bindArticles = async (value: SourceArticleType) => {
        if (value.id !== null && createItemValueArticles.value) {
            await supabase.from('article_sources').delete().eq('source_id', value.id);
            if (createItemValueArticles.value.length > 0) {
                const articlesValue = createItemValueArticles.value.map(articleId => {
                    return { source_id: value.id, article_id: articleId };
                });
                await supabase.from('article_sources').upsert(articlesValue);
            }

            createItemValueArticles.value = [];
        }
    };

    const createItem = async () => {
        try {
            const { error, data } = await supabase.from('sources')
                .insert(createItemValue)
                .select(`*, article_sources()`).single();
            if (error) throw error;
            bindArticles(data);

            createDialog.value = false;
            createItemValue.label = '';
            createItemValue.link = '';

            refreshData();
        } catch (error) {
            console.log(error);
        }
    };

    const deleteItem = async (value: Source) => {
        try {
            if (value.id) {
                const { error, count } = await supabase.from('sources')
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
            console.log(error);
        }
    };

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
        createItemValueArticles,
        articleItemState,
        loadItems,
        refreshData,
        loadArticleItems,
        createItem,
        deleteItem,
        bindArticles,
    };
});
