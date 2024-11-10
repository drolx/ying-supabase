<script setup lang="ts">
const route = useRoute();

definePageMeta({
  validate: async (route
  ) => {
    return typeof route.params.id === 'string' && /^\d+$/.test(route.params.id)
  }
});

console.log(route.params.id)
</script>

<template>
  <div>{{ '' }}</div>
</template>
