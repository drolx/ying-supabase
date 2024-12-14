<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useSources } from '~/stores/sources';
import { useDate } from 'vuetify';

const date = useDate();
const sourcesStore = useSources();

const { refreshData, createItem, loadItems, deleteItem, loadArticleItems, bindArticles } = sourcesStore;
const {
  loading,
  search,
  createDialog,
  deleteDialog,
  createItemValue,
  createItemValueArticles,
  sortBy,
  itemsPage,
  itemsPerPage,
  totalItems,
  serverItems,
  articleItemState,
} = storeToRefs(sourcesStore);

const headers = [
  { title: 'Created At', key: 'created_at' },
  { title: 'Label', key: 'label' },
  { title: 'Link', key: 'link' },
  { title: 'Articles', key: 'articles', sortable: false },
  { title: 'Actions', key: 'actions', sortable: false },
];

onBeforeMount(() => {
  createItemValue.value = { label: '', link: '' };
  loadArticleItems(); 
});
</script>

<template>
  <v-card flat>
    <v-card-title class="d-flex align-center pe-2">
      <v-icon class="me-4" icon="mdi-link"></v-icon>
      <span>{{ 'Sources' }}</span>
      <v-spacer></v-spacer>
      <v-btn
        variant="plain"
        color="accent"
        size="md"
        class="me-3"
        :disabled="loading"
        append-icon="mdi-refresh"
        @click="refreshData"
      ></v-btn>
      <v-text-field
        v-model="search"
        density="compact"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="solo-filled"
        flat
        hide-details
        class="me-3"
        single-line
      ></v-text-field>
      <!-- Create New -->
      <v-dialog v-model="createDialog" max-width="600">
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn color="secondary" v-bind="activatorProps" variant="elevated">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <template v-slot:default="{ isActive }">
          <v-card prepend-icon="mdi-link" title="Create Source">
            <v-card-text>
              <v-row dense>
                <v-col cols="12">
                  <v-text-field v-model="createItemValue.label" label="Label" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="createItemValue.link" label="Link" required></v-text-field>
                </v-col>
                <!-- Articles selection for the source -->
                <v-col cols="12">
                  <v-autocomplete
                    v-model="createItemValueArticles"
                    :items="articleItemState.value"
                    item-text="title"
                    item-value="id"
                    label="Select Articles"
                    multiple
                    clearable
                  ></v-autocomplete>
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
    <v-data-table
      class="h-100"
      height="600"
      v-model:search="search"
      v-model:sort-by="sortBy"
      v-model:items-per-page="itemsPerPage"
      v-model:page="itemsPage"
      :headers="headers"
      v-model:items="serverItems"
      v-model:items-length="totalItems"
      v-model:loading="loading"
      item-value="label"
      @update:options="loadItems"
    >
      <template v-slot:item.created_at="{ value }">
        <v-chip color="primary">
          {{ date.format(value, 'keyboardDateTime24h') }}
        </v-chip>
      </template>
      <template v-slot:item.articles="{ item }">
        <div v-if="item.article_sources && item.article_sources.length">
          <v-chip
            v-for="(article, index) in item.article_sources"
            :key="index"
            color="blue-grey"
            class="ma-1"
          >
            {{ article.articles.title }}
          </v-chip>
        </div>
        <div v-else>
          No articles linked
        </div>
      </template>
      <template v-slot:loading>
        <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn
          rounded
          color="secondary"
          class="me-3"
          density="comfortable"
          icon="mdi-eye"
          :to="`/sources/${item.id}`"
        ></v-btn>
        <v-btn
          variant="plain"
          class="me-3"
          density="comfortable"
          color="warning"
          icon="mdi-pencil"
          :to="`/sources/modify/${item.id}`"
        >
        </v-btn>
        <!-- Delete Confirmation -->
        <v-dialog v-model="deleteDialog" max-width="380">
          <template v-slot:activator="{ props: activatorProps }">
            <v-icon v-bind="activatorProps" color="error" icon="mdi-delete" />
          </template>
          <template v-slot:default="{ isActive }">
            <v-card
              prepend-icon="mdi-variable"
              :title="`Source - ${item.label}`"
              :text="`Confirm you're deleting ${item.label}`"
            >
              <template v-slot:actions>
                <v-btn color="primary" class="ml-auto" text="Cancel" @click="isActive.value = false"></v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  color="error"
                  variant="text"
                  class="ml-auto"
                  text="Delete"
                  @click="() => deleteItem(item)"
                ></v-btn>
              </template>
            </v-card>
          </template>
        </v-dialog>
      </template>
    </v-data-table>
  </v-card>
</template>
