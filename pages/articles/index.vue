<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useDate } from 'vuetify';
import { VDateInput } from 'vuetify/labs/VDateInput';
import { useArticles } from '~/stores/articles';

const date = useDate();
const articleStore = useArticles();

const { loadItems, refreshData, loadCategoryItems, loadTagItems, createItem, deleteItem } = articleStore;
const { loading, sortBy, search, itemsPage, itemsPerPage, serverItems, totalItems, createItemValue, createItemValueTags, categoryItemState, tagItemState, createDialog, deleteDialog, } = storeToRefs(articleStore);

const headers = [
  { title: 'Created At', key: 'created_at' },
  { title: 'Title', key: 'title' },
  { title: 'Published At', key: 'published_at' },
  { title: 'Category', key: 'categories.name' },
  // { title: 'Tags', key: 'article_tags' },
  { title: 'Actions', key: 'actions', sortable: false },
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
                    <v-autocomplete @update:search="loadCategoryItems" v-model="createItemValue.category_id"
                      :loading="categoryItemState.loading" :items="categoryItemState.value" label="Categories"
                      hint="Select article category" item-title="name" item-value="id"></v-autocomplete>
                  </v-col>
                  <v-col clos="12">
                    <!-- TODO: Resolve Tag storage issues -->
                    <v-autocomplete @update:search="loadTagItems" v-model="createItemValueTags"
                      :loading="tagItemState.loading" :items="tagItemState.value" hint="Pick article tags" label="Tags"
                      multiple chips item-title="name" item-value="id"></v-autocomplete>
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
    <v-data-table class="h-100" height="600" v-model:search="search" v-model:sort-by="sortBy" v-model:items-per-page="itemsPerPage"
      v-model:page="itemsPage" :headers="headers" v-model:items="serverItems" v-model:items-length="totalItems"
      v-model:loading="loading" item-value="name" @update:options="loadItems">
      <template v-slot:item.created_at="{ value }">
        <v-chip color="primary">
          {{ date.format(value, 'keyboardDateTime24h') }}
        </v-chip>
      </template>
      <!-- <template v-slot:item.article_tags="{ value }">
        <span v-for="tags in value" rounded class="text-xs text-accent">{{ `${tags.tags?.name}, ` }}</span>
      </template> -->
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
            <v-card prepend-icon="mdi-variable" :title="`Article - ${item.title}`"
              :text="`Confirm you're deleting ${item.title}`">
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
