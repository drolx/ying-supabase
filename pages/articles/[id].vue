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
        return typeof route.params.id === 'string'
    }
});

const loading = ref(false);
const item = computedAsync(async () => {
    loading.value = true
    try {
        if (route.params.id) {
            const aritclesWithCategoriesQuery = supabase.from('articles')
                .select(`
                    *,
                    categories (
                        id,
                        name
                    ),
                    article_tags (
                        tags (
                            id,
                            name
                        )
                    )
                    `,
                    { count: 'exact' })
                .eq('id', route.params.id)
                .single()
            const { data, error } = await aritclesWithCategoriesQuery;

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
                    <span class="text-bold text-h5 text-secondary">{{ `Articles Details` }}</span>
                </template>
            </v-list-item>
            <v-divider></v-divider>
            <v-card-text class="text-medium-emphasis pa-6">
                <v-row>
                    <v-col cols="12" class="d-flex justify-start align-center gap-8">
                        <v-chip rounded color="primary" class="text-bold text-accent">{{ 'ID:' }}</v-chip>
                        <span>{{ item.id }}</span>
                    </v-col>
                    <v-col cols="12" class="d-flex justify-start align-center gap-8">
                        <v-chip rounded class="text-bold">{{ 'Created At:' }}</v-chip>
                        <span>{{ date.format(item.created_at, 'keyboardDateTime24h') }}</span>
                    </v-col>
                    <v-col cols="12" class="d-flex justify-start align-center gap-8">
                        <v-chip rounded class="text-bold">{{ 'Published At:' }}</v-chip>
                        <span>{{ date.format(item.published_at, 'keyboardDateTime24h') }}</span>
                    </v-col>
                    <v-divider></v-divider>
                    <v-col cols="12" class="d-flex justify-start align-center gap-8">
                        <v-chip rounded class="text-bold">{{ 'Title:' }}</v-chip>
                        <span>{{ item.title }}</span>
                    </v-col>
                    <v-divider></v-divider>
                    <v-col cols="12" class="d-flex justify-start align-center gap-8">
                        <v-chip rounded class="text-bold">{{ 'Category:' }}</v-chip>
                        <span>{{ item.categories?.name }}</span>
                    </v-col>
                    <v-col cols="12" class="d-flex justify-start align-center gap-8">
                        <v-chip rounded class="text-bold">{{ 'Tags:' }}</v-chip>
                        <v-row cols="12" no-gutters>
                            <v-chip v-for="tags in item.article_tags" rounded class="text-xs text-accent">{{ tags.tags?.name }}</v-chip>
                        </v-row>
                    </v-col>
                    <v-divider></v-divider>
                    <v-col cols="12" class="mt-5 d-flex justify-start align-center gap-8">
                        <v-row>
                            <v-col cols="12" class="text-h4 font-bold text-accent">{{ 'Description' }}</v-col>
                            <v-col cols="12">
                                <summary class="pa-2">
                                    {{ item.content }}
                                </summary>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </div>
</template>
