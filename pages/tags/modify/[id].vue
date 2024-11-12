<script setup lang="ts">
import type { Database } from '~/supabase/database.types';

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
const item = reactive(<{
  id: number,
  name: string | null,
}>{
    id: 0,
    name: ''
  });

onBeforeMount(async () => {
  loading.value = true;
  try {
    if (route.params.id) {
      const { data, error } = await supabase.from('tags')
        .select('*', { count: 'exact' })
        .eq('id', route.params.id)
        .single();
      if (error) throw error;

      item.name = data.name;
      item.id = data.id;
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
      const { error } = await supabase.from('tags')
        .update({ name: item.name })
        .eq('id', item.id)
      if (error) throw error;
      loading.value = false;
      router.back();
    }
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <div class="h-100 w-100 pt-8 d-flex align-center justify-center">
    <v-progress-circular v-if="!item" :size="120" :width="5" color="purple" indeterminate></v-progress-circular>
    <v-card v-else min-width="350" prepend-icon="mdi-account" :title="`Modify Tag - ${item.name}`">
      <v-card-text>
        <v-row dense>
          <v-col cols="12">
            <v-text-field v-model="item.name" label="Name" required></v-text-field>
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
