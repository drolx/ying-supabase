<script setup lang="ts">
import { computedAsync } from '@vueuse/core';

const supabase = useSupabaseClient();
const triggerSignOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log(error);
  } else {
    navigateTo('/auth/login');
  }
}

const user = computedAsync(async () => {
  const { data } = await supabase.auth.getUser();
  
  return {
    email: data?.user?.email,
    displayName: `${data.user?.user_metadata?.firstName} ${data.user?.user_metadata?.lastName}`,
  }
}, null);

const drawer = ref(true);
const rail = ref(false);
const links = [
  ['mdi-home', 'Home', '/'],
  ['mdi-post', 'Articles', '/articles'],
  ['mdi-group', 'Categories', '/categories'],
  ['mdi-tag-multiple', 'Tags', '/tags'],
];
</script>


<template>
  <v-app id="default">
    <v-layout>
      <v-navigation-drawer permanent v-model="drawer" :rail="rail" width="256">
        <template #prepend>
          <v-list-item lines="two">
            <template #prepend>
              <v-avatar class="mb-1" color="grey-darken-1" size="64"></v-avatar>
            </template>
            <template #title>
              <span class="font-bold">{{ user?.displayName }}</span>
            </template>
            <template #subtitle>
              <span>{{ user?.email }}</span>
            </template>
          </v-list-item>
          <v-divider></v-divider>
        </template>

        <v-list class="py-8" nav>
          <v-list-item v-for="[icon, text, path] in links" :key="icon" :prepend-icon="icon" :to="path" :title="text"
            link></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar elevation="0">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-spacer />
        <v-btn @click="triggerSignOut">
          Sign Out
        </v-btn>
      </v-app-bar>
      <v-main>
        <v-container>
          <slot></slot>
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>
