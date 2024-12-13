<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useSources } from '~/stores/sources';
import { useDate } from 'vuetify';

const date = useDate();
const sourcesStore = useSources();

const { refreshData, createItem, loadItems, deleteItem } = sourcesStore;
const { loading, search, createDialog, deleteDialog, createItemValue, sortBy, itemsPage, itemsPerPage, totalItems, serverItems } = storeToRefs(sourcesStore);

const headers = [
  { title: 'Created At', key: 'created_at' },
  { title: 'Label', key: 'label' },
  { title: 'Link', key: 'link' },
  { title: 'Articles Linked', key: 'article_sources' },
];

onBeforeMount(() => {
  createItemValue.value.label = '';
  createItemValue.value.link = '';
});
</script>

<template>
  <v-card flat>
    <v-card-title class="d-flex align-center pe-2">
      <v-icon class="me-4" icon="mdi-link"></v-icon>
      <span class="font-weight-bold text-h5">Sources</span>
      <v-spacer></v-spacer>
      <v-btn variant="plain" color="accent" size="md" class="me-3" :disabled="loading" append-icon="mdi-refresh" @click="refreshData"></v-btn>
      <v-text-field v-model="search" density="compact" label="Search" prepend-inner-icon="mdi-magnify" variant="solo-filled" flat hide-details class="me-3" single-line></v-text-field>
      <!-- Create New Source -->
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
      class="h-100 mx-4"
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
      hide-pagination
      @update:options="loadItems"
    >
      <template v-slot:item.created_at="{ value }">
        <v-chip color="primary">
          {{ date.format(value, 'keyboardDateTime24h') }}
        </v-chip>
      </template>

      <template v-slot:item.label="{ item }">
        <span class="font-weight-bold text-body-1">{{ item.label }}</span>
      </template>

      <template v-slot:item.link="{ item }">
        <v-btn title class="blue--text" :href="item.link" target="_blank">
          {{ item.link }}
        </v-btn>
      </template>

      <template v-slot:item.article_sources="{ value }">
        <span v-for="(articleSource, index) in value" :key="index" class="d-inline-block">
          <v-chip color="blue-grey" class="ma-1">
            {{ articleSource.articles?.title }}
          </v-chip>
        </span>
      </template>

      <template v-slot:item.actions="{ item }">
        <NuxtLink :to="`/sources/${item.id}`">
          <v-btn rounded color="secondary" class="me-3" density="comfortable" icon="mdi-eye"></v-btn>
        </NuxtLink>
        <NuxtLink :to="`/sources/modify/${item.id}`">
          <v-btn variant="plain" class="me-3" density="comfortable" color="warning" icon="mdi-pencil"></v-btn>
        </NuxtLink>

        <!-- Delete Confirmation -->
        <v-dialog v-model="deleteDialog" max-width="380">
          <template v-slot:activator="{ props: activatorProps }">
            <v-icon v-bind="activatorProps" color="error" icon="mdi-delete" />
          </template>
          <template v-slot:default="{ isActive }">
            <v-card prepend-icon="mdi-variable" :title="`Source - ${item.label}`" :text="`Confirm you're deleting ${item.label}`">
              <template v-slot:actions>
                <v-btn color="primary" class="ml-auto" text="Cancel" @click="isActive.value = false"></v-btn>
                <v-spacer></v-spacer>
                <v-btn color="error" variant="text" class="ml-auto" text="Delete" @click="() => deleteItem(item)"></v-btn>
              </template>
            </v-card>
          </template>
        </v-dialog>
      </template>

      <template v-slot:loading>
        <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
      </template>
    </v-data-table>
  </v-card>
</template>

<style scoped>
.v-card {
  background-color: #ffffff;
  border-radius: 12px;
}

.v-data-table .v-btn {
  text-decoration: none;
  color: inherit;
}

.v-data-table th, .v-data-table td {
  padding: 16px;
}

.v-chip {
  font-weight: bold;
}

.font-weight-bold {
  font-weight: 600;
}
</style>
