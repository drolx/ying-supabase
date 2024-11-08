<template>
    <div class="ma-12 flex justify-center">
        <h1 class="">ARTICLE</h1>
        <h2 class="mt-6">{{ article.title }}</h2>
        <p class="">{{ article.content }}</p>

        <v-row v-for="tag in tags" :key="tag.tag_id" class="d-flex justify-center" align="center" justify="center">
            <ul class="d-inline">
                <li class="text-subtitle-2">{{ tag.tag_id === 1 ? 'AI' : tag.tag_id === 2 ? 'WELLNESS' : 'TRAVEL' }}</li>
            </ul>
        </v-row>
    </div>
</template>

<script setup>
const route = useRoute();
const articleId = route.params.id;

import { createClient } from '@supabase/supabase-js'
const supabase = createClient('https://kibfqgrmblyjxwsvdukn.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpYmZxZ3JtYmx5anh3c3ZkdWtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA5Nzg4NTIsImV4cCI6MjA0NjU1NDg1Mn0.CjV6mHNRhIMSLIs4bpx3imVMfTBCq-KnvrV-HFXYgp8')
const article = ref({});
const tags = ref([]);

const getArticle = async () => {
    const { data } = await supabase.from('articles').select('*').eq('article_id', articleId).single()
    article.value = data
    }
const getArticleTags = async () => {
    const { data } = await supabase.from('article_tag').select('*').eq('article_id', articleId)
    tags.value = data
    }

onMounted(() => {
    getArticle()
    getArticleTags()
})


</script>

<style>

</style>