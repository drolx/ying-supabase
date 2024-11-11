import { defineStore, skipHydrate } from 'pinia';
import { computedAsync } from '@vueuse/core';

export const useAuthStore = defineStore('profile', () => {
  const supabase = useSupabaseClient();

  const loginState = reactive({
    loading: false,
    username: '',
    password: '',
  });

  const registrationState = reactive({
    loading: false,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordRepeat: '',
  });

  const user = computedAsync(async () => {
    const { data } = await supabase.auth.getUser();
    
    return {
      email: data?.user?.email,
      displayName: `${data.user?.user_metadata?.firstName} ${data.user?.user_metadata?.lastName}`,
    }
  }, null);

  // TODO: Explore standard validation
  // const isValidLogin = computed(() => state.username.length < 5 && state.password.length < 5);

  const triggerLogin = async () => {
    loginState.loading = true;
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginState.username,
        password: loginState.password,
      })

      if (error) throw error;
      loginState.loading = false;
      navigateTo('/auth/confirm');
    } catch (error) {
      console.log(error);
    }
  }

  const triggerRegistration = async () => {
    registrationState.loading = true;
    const { firstName, lastName, email, password, passwordRepeat } = registrationState;
    if (password !== passwordRepeat) {
      console.log('Password error!')
      return;
    }

    try {
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            firstName,
            lastName,
            email,
            customer: false,
          },
        },
      });
      if (error) throw error;
      registrationState.loading = false;
      navigateTo('/');
    } catch (error) {
      console.log(error);
    }
  }

  const triggerSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    } else {
      navigateTo('/auth/login');
    }
  }

  return {
    user: skipHydrate(user),
    loginState: skipHydrate(loginState),
    registrationState: skipHydrate(registrationState),
    triggerLogin,
    triggerRegistration,
    triggerSignOut,
  }
});
