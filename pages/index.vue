<script lang="ts" setup>
</script>

<template>
  <div class="py-12">
      <v-row align="center" justify="center">
        <h1 class="">NUXT SUPABASE EXPERIMENT</h1>
      </v-row>
     
      <div>
          <!-- <Counts /> -->
          <ArticleTable />
        </div>
        
  </div>
</template>

<script lang="ts" setup>
const location = ref("bottom");
const tab = ref(null);


</script>

<style>
p {
  color: #002A6F;
}
</style>