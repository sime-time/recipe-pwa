<script setup lang="ts">
definePageMeta({
  layout: "auth-layout",
});

const router = useRouter();
const toast = useToast();

const name = ref("");
const email = ref("");
const password = ref("");
const showPassword = ref(false);
const loading = ref(false);

function toggleShowPassword() {
  showPassword.value = !showPassword.value;
};

async function handleSignUp() {
  if (!email.value || !password.value) {
    return toast.error({
      title: "Sign-up failed",
      message: "Please fill in all fields",
      position: "topCenter",
    });
  }

  if (password.value.length < 8) {
    return toast.error({
      title: "Sign-up failed",
      message: "Password must be at least 8 characters",
      position: "topCenter",
    });
  }

  loading.value = true;

  try {
    // create new user
    const signUpAttempt = await authClient.signUp.email({
      name: name.value,
      email: email.value,
      password: password.value,
    });

    if (signUpAttempt.error) {
      console.error(JSON.stringify(signUpAttempt, null, 2));
      return toast.error({
        title: "Sign-up failed",
        message: signUpAttempt.error.message,
        position: "topCenter",
      });
    };

    router.push(`/verify-email/${signUpAttempt.data.user.email}`);

  } catch (error) {
    console.error("Error", error);

  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="container">
    <!-- IMAGE CONTAINER -->
    <div class="image-container">
      <img src="~/assets/images/i2.webp" class="image" alt="sign up chef" />
    </div>

    <h1 class="title">Create Account</h1>

    <!-- FORM CONTAINER -->
    <form class="form-container" @submit.prevent="handleSignUp">

      <!-- NAME INPUT -->
      <div class="input-container">
        <input type="text" class="text-input w-full" placeholder="Full name" v-model="name" />
      </div>

      <!-- EMAIL INPUT -->
      <div class="input-container">
        <input type="email" class="text-input w-full" placeholder="Enter email" v-model="email" />
      </div>

      <!-- PASSWORD INPUT -->
      <div class="input-container">
        <input :type="showPassword ? 'text' : 'password'" class="text-input w-full" placeholder="Enter password"
          v-model="password" />
        <button type="button" class="eye-button" @click="toggleShowPassword">
          <Icon :name="showPassword ? 'ion:eye-outline' : 'ion:eye-off-outline'" :size="20" class="eye-icon" />
        </button>
      </div>

      <!-- SIGN UP BUTTON -->
      <button type="submit" class="auth-button w-full button-text" :disabled="loading">
        <span v-if="loading">Signing Up...</span>
        <span v-else>Sign Up</span>
      </button>

      <!-- SIGN IN LINK -->
      <NuxtLink to="/sign-in" class="link-container link-text touch-opacity">
        <p>Already have an account? <span class="link">Sign in</span></p>
      </NuxtLink>
    </form>

  </div>
</template>
