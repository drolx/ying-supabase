<template>
  <div class="ma-12">
    <h1 class="">CREATE NEW ARTICLE</h1>
    <div class="my-16 w-50">
        <form>
            <v-text-field
            v-model="state.title"
            :counter="10"
            label="Title"
            required
            ></v-text-field>

            <v-text-field
            v-model="state.category_id"
            type="number"
            label="category_id"
            required
            ></v-text-field>

            <v-textarea
            v-model="state.content"
            label="content"
            ></v-textarea>

            <!-- <v-date-input label="Date input" variant="solo"></v-date-input> -->


            <v-btn
            class="me-4"
            @click="submit"
            >
            submit
            </v-btn>
        </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { createClient } from '@supabase/supabase-js'
const supabase = createClient('https://kibfqgrmblyjxwsvdukn.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpYmZxZ3JtYmx5anh3c3ZkdWtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA5Nzg4NTIsImV4cCI6MjA0NjU1NDg1Mn0.CjV6mHNRhIMSLIs4bpx3imVMfTBCq-KnvrV-HFXYgp8')


//   const initialState = {
//     title: '',
//     category_id: '',
//     content: '',
//   }

  const state = reactive({    
    title: '',
    category_id: '',
    content: '',
  })

  const submit = async () => {
    const { error } = await supabase
  .from('articles')
  .insert({ title: state.title, category_id: state.category_id, content: state.content })

  }

</script>

<style>

</style>