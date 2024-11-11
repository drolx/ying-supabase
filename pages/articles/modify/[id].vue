<script setup lang="ts">
import { storeToRefs } from 'pinia';
import type { Database } from '~/supabase/database.types';
import { useArticles } from '~/stores/articles';
import { VDateInput } from 'vuetify/labs/VDateInput';

const route = useRoute();
const router = useRouter();
const articleStore = useArticles();
const supabase = useSupabaseClient<Database>();

definePageMeta({
  validate: async (route
  ) => {
    return typeof route.params.id === 'string' && /^\d+$/.test(route.params.id)
  }
});

const { loadCategoryItems, loadTagItems } = articleStore;
const { createItemValueTags, categoryItemState, tagItemState } = storeToRefs(articleStore);

const loading = ref(false);
const item = reactive<{
  id: number,
  title: string | null,
  content: string | null,
  published_at: string | null,
  category_id: number | null,
}>({
  id: 0,
  title: null,
  content: null,
  published_at: null,
  category_id: null,
});

onBeforeMount(async () => {
  loading.value = true;
  try {
    if (route.params.id) {
      const { data, error } = await supabase.from('articles')
        .select('*', { count: 'exact' })
        .eq('id', route.params.id)
        .single();
      if (error) throw error;

      item.id = data.id;
      item.title = data.title;
      item.content = data.content;
      item.published_at = data.published_at;
      item.category_id = data.category_id;
      loading.value = false;
    }
  } catch (error) {
    console.log(error);
  }
})

const modifyItems = async () => {
  loading.value = true;
  try {
    if (item.id !== 0) {
      console.log(item)
      const { data, error } = await supabase.from('articles')
        .update({ title: item.title, content: item.content, published_at: item.published_at, category_id: item.category_id })
        .eq('id', item.id)
        .select()
        .single();
      if (error) throw error;

      if (data.id && createItemValueTags.value.length > 0) {
        const commitTags = createItemValueTags.value.map(x => {
          return { article_id: data.id, tag_id: x };
        });
        await supabase.from('article_tags')
          .insert(commitTags);
      }

      loading.value = false;
      router.back();
    }
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  loadCategoryItems('');
  loadTagItems('');
});
</script>

<template>
  <div class="h-100 w-100 pt-8 d-flex align-center justify-center">
    <v-progress-circular v-if="!item" :size="120" :width="5" color="purple" indeterminate></v-progress-circular>
    <v-card v-else min-width="350" prepend-icon="mdi-account" :title="`Modify Aticle - ${item.title}`">
      <v-card-text>
        <v-row dense>
          <v-col cols="12">
            <v-text-field v-model="item.title" label="Title" required></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-date-input prepend-icon="" v-model="item.published_at" label="Publish date"></v-date-input>
          </v-col>
          <v-col cols="12">
            <v-autocomplete @update:search="loadCategoryItems" v-model="item.category_id"
              :loading="categoryItemState.loading" :items="categoryItemState.value" label="Categories"
              hint="Select article category" item-title="name" item-value="id"></v-autocomplete>
          </v-col>
          <v-col clos="12">
            <!-- TODO: Resolve Tag storage issues -->
            <v-autocomplete @update:search="loadTagItems" v-model="createItemValueTags" :loading="tagItemState.loading"
              :items="tagItemState.value" hint="Pick article tags" label="Tags" multiple chips item-title="name"
              item-value="id"></v-autocomplete>
          </v-col>
          <v-col cols="12">
            <v-textarea label="Content" v-model="item.content" variant="filled" auto-grow></v-textarea>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn text="Cancel" variant="plain" @click="() => router.back()"></v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" text="Save" variant="tonal" @click="modifyItems"></v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
