<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();
const { triggerRegistration } = authStore;
const { registrationState } = storeToRefs(authStore);

definePageMeta({
  permission: false,
  layout: 'auth',
});
</script>

<template>
  <v-card-text>
    <h4 class="text-h4 mb-2">{{ 'Welcome' }}</h4>
    <p class="mb-0">{{ 'Register with your email account' }}</p>
  </v-card-text>
  <v-form>
    <v-row no-gutters>
      <v-col cols="12">
        <v-text-field type="text" :disabled="registrationState.loading" autocomplete="username" autofocus label="Email"
          placeholder="Your email" v-model="registrationState.email" />
      </v-col>
      <v-col cols="12">
        <v-text-field type="text" :disabled="registrationState.loading" autocomplete="firstname" autofocus
          label="Firstname" placeholder="Firstname" v-model="registrationState.firstName" />
      </v-col>
      <v-col cols="12">
        <v-text-field type="text" :disabled="registrationState.loading" autocomplete="lastname" autofocus
          label="Lastname" placeholder="Lastname" v-model="registrationState.lastName" />
      </v-col>
      <v-col cols="12">
        <v-text-field type="password" :disabled="registrationState.loading" autocomplete="new-password" label="Password"
          placeholder="New Password" v-model="registrationState.password" />
      </v-col>
      <v-col cols="12">
        <v-text-field type="password" :disabled="registrationState.loading" autocomplete="repeat-password"
          label="Repeat Password" placeholder="Repeat Password" v-model="registrationState.passwordRepeat" />
      </v-col>
      <v-col cols="12">
        <v-btn color="primary" class="py-5" block @click="triggerRegistration">
          {{ 'Register' }}
          <v-progress-circular indeterminate size="22" class="ml-2"
            v-if="registrationState.loading"></v-progress-circular>
        </v-btn>
      </v-col>
      <v-col cols="12" class="py-0 mt-1">
        <div class="d-flex align-center justify-center flex-wrap">
          <nuxt-link class="text-primary" to="/auth/login">
            {{ 'Login' }}
          </nuxt-link>
        </div>
      </v-col>
    </v-row>
  </v-form>
</template>
