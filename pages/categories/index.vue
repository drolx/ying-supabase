<template>
    <v-container>
        <v-row align="center" justify="center" class="mt-12">
            <h1 class="">Here is the list of the currently available categories.</h1>
        </v-row>

        <v-list v-for="category in categories" :key="category.id" class="mt-8" >
            <v-list-item class="cursor-pointer">
                <NuxtLink :to="`/${category.name}`">
                    {{ category.name }}
                    <v-tooltip activator="parent" location="end">view articles</v-tooltip>
                </NuxtLink>
            </v-list-item>
        </v-list>    

    </v-container>
</template>

<script setup>
import { createClient } from '@supabase/supabase-js'
const supabase = createClient('https://kibfqgrmblyjxwsvdukn.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpYmZxZ3JtYmx5anh3c3ZkdWtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA5Nzg4NTIsImV4cCI6MjA0NjU1NDg1Mn0.CjV6mHNRhIMSLIs4bpx3imVMfTBCq-KnvrV-HFXYgp8')
const categories = ref([])

const getCategories = async () => {
  const { data } = await supabase.from('categories').select('*')
  categories.value = data
}

onMounted(() => {
  getCategories()
})

</script>

<style>

</style>