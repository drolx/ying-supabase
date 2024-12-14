<script setup lang="ts">
import { onMounted } from 'vue';
import { useArticles } from '@/stores/articles';  
import { useCategories } from '@/stores/categories'; 
import { useTags } from '@/stores/tags';
import { useSources } from '@/stores/sources';  


const articlesStore = useArticles();
const categoriesStore = useCategories();
const tagsStore = useTags();
const sourcesStore = useSources();

onMounted(() => {
  articlesStore.loadItems({ page: articlesStore.itemsPage, itemsPerPage: articlesStore.itemsPerPage, sortBy: articlesStore.sortBy });
  categoriesStore.loadItems({ page: categoriesStore.itemsPage, itemsPerPage: categoriesStore.itemsPerPage, sortBy: categoriesStore.sortBy });
  tagsStore.loadItems({ page: tagsStore.itemsPage, itemsPerPage: tagsStore.itemsPerPage, sortBy: tagsStore.sortBy });
  sourcesStore.loadItems({ page: sourcesStore.itemsPage, itemsPerPage: sourcesStore.itemsPerPage, sortBy: sourcesStore.sortBy });
});
</script>

<template>
  <v-container class="pt-16 bg-light px-8">
    <v-row class="my-16 justify-start" align="center">
        
      <!-- Total Articles Card -->
      <v-col cols="12" sm="6" md="3">
        <v-card class="pa-6 rounded-lg shadow-lg" :style="{ backgroundColor: '#E3F2FD' }">
          <v-row align="center" justify="center" class="d-flex my-4 gap-8">
            <v-icon class="text-primary" size="large">mdi-book-open-page-variant</v-icon>
            <p class="font-bold text-h5">{{ articlesStore.totalItems }}</p> 
          </v-row>
          <v-divider></v-divider>
          <v-row justify="center" class="d-flex my-4">
            <p class="text-xs font-weight-bold">Total Articles</p>
          </v-row>
        </v-card>
      </v-col>

      <!-- Total Categories Card -->
      <v-col cols="12" sm="6" md="3">
        <v-card class="pa-6 rounded-lg shadow-lg" :style="{ backgroundColor: '#F1F8E9' }">
          <v-row align="center" justify="center" class="d-flex my-4 gap-8">
            <v-icon class="text-primary" size="large">mdi-label-outline</v-icon>
            <p class="font-bold text-h5">{{ categoriesStore.totalItems }}</p> 
          </v-row>
          <v-divider></v-divider>
          <v-row justify="center" class="d-flex my-4">
            <p class="text-xs font-weight-bold">Total Categories</p>
          </v-row>
        </v-card>
      </v-col>

      <!-- Total Tags Card -->
      <v-col cols="12" sm="6" md="3">
        <v-card class="pa-6 rounded-lg shadow-lg" :style="{ backgroundColor: '#FFEBEE' }">
          <v-row align="center" justify="center" class="d-flex my-4 gap-8">
            <v-icon class="text-primary" size="large">mdi-tag-outline</v-icon>
            <p class="font-bold text-h5">{{ tagsStore.totalItems }}</p> 
          </v-row>
          <v-divider></v-divider>
          <v-row justify="center" class="d-flex my-4">
            <p class="text-xs font-weight-bold">Total Tags</p>
          </v-row>
        </v-card>
      </v-col>

      <!-- Total Sources Card -->
      <v-col cols="12" sm="6" md="3">
        <v-card class="pa-6 rounded-lg shadow-lg" :style="{ backgroundColor: '#FFF3E0' }">
          <v-row align="center" justify="center" class="d-flex my-4 gap-8">
            <v-icon class="text-primary" size="large">mdi-link-variant</v-icon>
            <p class="font-bold text-h5">{{ sourcesStore.totalItems }}</p> 
          </v-row>
          <v-divider></v-divider>
          <v-row justify="center" class="d-flex my-4">
            <p class="text-xs font-weight-bold">Total Sources</p>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
