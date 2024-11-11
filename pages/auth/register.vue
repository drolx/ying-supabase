<script lang="ts" setup>
definePageMeta({
  permission: false,
  layout: 'auth',
});

const client = useSupabaseClient();

const state = reactive({
  loading: false,
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordRepeat: '',
});

const triggerRegistration = async () => {
  state.loading = true;
  const { firstName, lastName, email, password, passwordRepeat } = state;
  if (password !== passwordRepeat) {
    console.log('Password error!')
    return;
  }

  try {
    const { error, data } = await client.auth.signUp({
      email,
      password,
      options: {
        data: {
          firstName,
          lastName,
          email,
          customer: false,
        },
        // TODO: Use env and host address
        // emailRedirectTo: 'http://localhost:3000/auth/login',
      },
    });
    if (error) throw error;
    state.loading = false;
    navigateTo('/');
  } catch (error) {
    console.log(error);
  }
}
</script>


<template>
  <v-card-text>
    <h4 class="text-h4 mb-2">{{ 'Welcome' }}</h4>
    <p class="mb-0">{{ 'Register with your email account' }}</p>
  </v-card-text>

  <v-form>
    <v-row no-gutters>
      <v-col cols="12">
        <v-text-field type="text" autocomplete="username" autofocus label="Email" placeholder="Your email"
          v-model="state.email" />
      </v-col>
      <v-col cols="12">
        <v-text-field type="text" autocomplete="firstname" autofocus label="Firstname" placeholder="Firstname"
          v-model="state.firstName" />
      </v-col>
      <v-col cols="12">
        <v-text-field type="text" autocomplete="lastname" autofocus label="Lastname" placeholder="Lastname"
          v-model="state.lastName" />
      </v-col>
      <v-col cols="12">
        <v-text-field autocomplete="new-password" type="password" label="Password" placeholder="New Password"
          v-model="state.password" />
      </v-col>
      <v-col cols="12">
        <v-text-field autocomplete="repeat-password" type="password" label="Repeat Password"
          placeholder="Repeat Password" v-model="state.passwordRepeat" />
      </v-col>
      <v-col cols="12">
        <v-btn color="primary" class="py-5" block @click="triggerRegistration">
          {{ 'Register' }}
          <v-progress-circular indeterminate size="22" class="ml-2" v-if="state.loading"></v-progress-circular>
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
