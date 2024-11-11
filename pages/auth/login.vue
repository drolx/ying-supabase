<script setup lang="ts">
definePageMeta({
  permission: false,
  layout: 'auth',
});

const supabase = useSupabaseClient();
const state = reactive({
  loading: false,
  username: '',
  password: '',
})
const passwordInput = ref();

// TODO: Explore standard validation
// const isValidLogin = computed(() => state.username.length < 5 && state.password.length < 5);

const triggerLogin = async () => {
  state.loading = true;
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: state.username,
      password: state.password,
    })

    if (error) throw error;
    state.loading = false;
    navigateTo('/auth/confirm');
  } catch (error) {
    console.log(error);
  }
}
</script>
<template>
  <v-card-text>
    <h4 class="text-h4 mb-2">{{ 'Welcome' }}</h4>
    <p class="mb-0">{{ 'Please log in with your email account' }}</p>
  </v-card-text>
  <v-form>
    <v-row>
      <v-col cols="12">
        <v-text-field type="text" autocomplete="username" autofocus label="Username"
          placeholder="Your username or email" v-model="state.username" @keyup.enter="() => passwordInput.focus()" />
      </v-col>

      <v-col cols="12">
        <v-text-field autocomplete="current-password" ref="passwordInput" type="password" :label="'Password'"
          placeholder="Your password" v-model="state.password" @keyup.enter="triggerLogin" />
      </v-col>

      <v-col cols="12" class="py-0 mt-1 mb-4">
        <div class="d-flex align-center justify-space-between flex-wrap">
          <a href="javascript:void(0);">
            <span>{{ '' }}</span>
          </a>
          <v-spacer />
          <nuxt-link class="text-primary" to="/auth/forget-password">
            {{ 'Forget Password?' }}
          </nuxt-link>
        </div>
      </v-col>

      <v-col cols="12">
        <v-btn color="primary" class="py-5" block @click="triggerLogin">
          {{ 'Log In' }}
          <v-progress-circular indeterminate size="22" class="ml-2" v-if="state.loading"></v-progress-circular>
        </v-btn>
      </v-col>

      <v-col cols="12" class="text-center text-base">
        <span class="me-1">{{ 'Don\'t have an account?' }}</span>
        <router-link class="text-primary" to="/auth/register">
          {{ 'Create an account' }}
        </router-link>
      </v-col>
    </v-row>
  </v-form>

</template>
