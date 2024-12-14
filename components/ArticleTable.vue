<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useDate } from 'vuetify';
import { useArticles } from '~/stores/articles';

const date = useDate();
const articleStore = useArticles();

const { loadItems, loadCategoryItems, loadTagItems } = articleStore;
const { loading, sortBy, search, itemsPage, itemsPerPage, serverItems, totalItems, createItemValue, createDialog } = storeToRefs(articleStore);

const headers = [
    { title: 'Title', key: 'title' },
    { title: 'Category', key: 'categories.name' },
    { title: 'Tags', key: 'article_tags' },
    { title: 'Created At', key: 'created_at' },
];

onBeforeMount(() => {
    createItemValue.value.title = '';
    createItemValue.value.content = '';
    createItemValue.value.published_at = null;
    createItemValue.value.category_id = null;
});

watchEffect(() => {
  if (createDialog.value) {
    loadCategoryItems('');
    loadTagItems('');
  }
});
</script>

<template>
  <v-card flat>
    <v-card-title class="d-flex align-center pe-2">
      <v-icon class="me-4" icon="mdi-post"></v-icon>
      <span class="font-weight-bold text-h5">Recent Articles</span>
      <v-spacer />

      <NuxtLink to="/articles" class="v-btn v-btn--text v-btn--primary">
        View All
      </NuxtLink>
    </v-card-title>

    <!-- Data Table -->
    <v-data-table
      class="h-100 px-8" 
      height="600"
      v-model:search="search"
      v-model:sort-by="sortBy"
      v-model:items-per-page="itemsPerPage"
      v-model:page="itemsPage"
      :headers="headers"
      v-model:items="serverItems"
      v-model:items-length="totalItems"
      v-model:loading="loading"
      item-value="name"
      @update:options="loadItems"
    >
      <template v-slot:item.created_at="{ value }">
        <v-chip color="primary" dark>{{ date.format(value, 'keyboardDateTime24h') }}</v-chip>
      </template>

      <template v-slot:item.article_tags="{ value }">
        <span v-for="tags in value" :key="tags.id" rounded class="text-sm primary">{{ `${tags.tags?.name} ` }}</span>
      </template>

      <template v-slot:loading>
        <v-skeleton-loader type="table-row@5"></v-skeleton-loader>
      </template>
    </v-data-table>
  </v-card>
</template>

<style scoped>
.v-card {
  background-color: #ffffff;
  border-radius: 12px;
}

.v-data-table {
  margin: 20px 0;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
}

.v-data-table th, .v-data-table td {
  padding: 16px;
  font-size: 16px;
}

.v-chip {
  font-weight: bold;
}

.v-btn {
  border-radius: 6px; 
  padding: 8px 16px; 
  transition: background-color 0.3s ease;
  font-size:16px;
  font-weight: 500;
}



.v-data-table .v-btn {
  text-decoration: none;
  color: inherit;
}

.v-spacer {
  flex: 1;
}
</style>
