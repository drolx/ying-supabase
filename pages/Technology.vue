<template>
    <div class="mt-12 ml-8">
        <h1>THE TECHNOLOGY ARTICLES.</h1>

        <div class="ml-8">
            <div v-for="article in articles" :key="article.id" class="my-4">
                <NuxtLink :to="`/article/${article.article_id}`">
                    <p>{{ article.title }}</p>
                </NuxtLink>
            </div>
        </div>
        <NuxtLink to="/article/createarticle">
            <p class="mt-12">Create new Technology Article here</p>
        </NuxtLink>
    </div>
</template>

<script setup>
import { createClient } from '@supabase/supabase-js'
const supabase = createClient('https://kibfqgrmblyjxwsvdukn.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpYmZxZ3JtYmx5anh3c3ZkdWtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA5Nzg4NTIsImV4cCI6MjA0NjU1NDg1Mn0.CjV6mHNRhIMSLIs4bpx3imVMfTBCq-KnvrV-HFXYgp8')
const articles = ref([])

const getTechArticles = async () => {
  const { data } = await supabase.from('articles').select('*').eq('category_id', '1')
  articles.value = data
}

onMounted(() => {
  getTechArticles()
})

</script>

<style>

</style>