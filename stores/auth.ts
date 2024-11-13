import { defineStore, skipHydrate } from 'pinia';

export const useAuthStore = defineStore('profile', () => {
  const supabase = useSupabaseClient();

  const user = reactive<{
    email: string,
    displayName: string,
  }>({
    email: '..',
    displayName: '..',
  })
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

  const loadUserProfile = async () => {
    const { data } = await supabase.auth.getUser();
    user.email = `${data?.user?.email}`;
    user.displayName = `${data.user?.user_metadata?.firstName} ${data.user?.user_metadata?.lastName}`;
  }

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
      loadUserProfile();
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

  onMounted(() => {
    loadUserProfile();
  })

  return {
    user: skipHydrate(user),
    loginState: skipHydrate(loginState),
    registrationState: skipHydrate(registrationState),
    triggerLogin,
    triggerRegistration,
    triggerSignOut,
  }
});
