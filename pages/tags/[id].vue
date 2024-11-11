<script setup lang="ts">
import { computedAsync } from '@vueuse/core';
import type { Database } from '~/supabase/database.types';
import { useDate } from 'vuetify'

const date = useDate();
const route = useRoute();
const router = useRouter();
const supabase = useSupabaseClient<Database>();

definePageMeta({
  validate: async (route
  ) => {
    return typeof route.params.id === 'string' && /^\d+$/.test(route.params.id)
  }
});

const loading = ref(false);
const item = computedAsync(async () => {
  loading.value = true
  try {
    if (route.params.id) {
      const { data, error } = await supabase.from('tags')
        .select('*', { count: 'exact' })
        .eq('id', route.params.id)
        .single();

      if (error) throw error;
      loading.value = false;

      return data;
    }
  } catch (error) {
    console.log(error);
  }

  return null;
})
</script>

<template>
  <div class="h-100 w-100 pt-8 d-flex align-center justify-center">
    <v-progress-circular v-if="!item" :size="120" :width="5" color="purple" indeterminate></v-progress-circular>
    <v-card v-else class="mx-auto" min-width="500" max-width="600" border flat>
      <v-list-item class="px-6" height="88">
        <template v-slot:prepend>
          <v-btn @click="() => router.back()" color="primary" icon="mdi-arrow-left" text="Back" variant="text"
            slim></v-btn>
        </template>
        <template v-slot:title>
          <span class="font-bold text-h5 text-primary">{{ `Tag Details` }}</span>
        </template>
      </v-list-item>
      <v-divider></v-divider>
      <v-card-text class="text-medium-emphasis pa-6">
        <v-row>
          <v-col cols="12" class="d-flex justify-start align-center gap-8">
            <v-chip rounded color="primary" class="text-bold text-accent">{{ 'ID:' }}</v-chip>
            <span>{{ item.id }}</span>
          </v-col>
          <v-divider></v-divider>
          <v-col cols="12" class="d-flex justify-start align-center gap-8">
            <v-chip rounded class="text-bold">{{ 'Created At:' }}</v-chip>
            <span>{{ date.format(item.created_at, 'keyboardDateTime24h') }}</span>
          </v-col>
          <v-divider></v-divider>
          <v-col cols="12" class="d-flex justify-start align-center gap-8">
            <v-chip rounded class="text-bold">{{ 'Name:' }}</v-chip>
            <span>{{ item.name }}</span>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>
