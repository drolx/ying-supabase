<script setup>
definePageMeta({
  permission: false,
  layout: 'auth',
})

const user = useSupabaseUser()

watch(user, () => {
  if (user.value) {
    return navigateTo('/')
  }
}, { immediate: true })
</script>

<template>
  <div class="d-flex">
    <v-progress-circular :size="90" :width="5" color="purple" indeterminate></v-progress-circular>
    <div>Waiting for login...</div>
  </div>
</template>
