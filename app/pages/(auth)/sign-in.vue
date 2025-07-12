<script setup lang="ts">
definePageMeta({
  layout: "auth-layout",
});

const authStore = useAuthStore();
const { loading } = storeToRefs(authStore);
const { signIn } = authStore;

const email = ref("");
const password = ref("");
const showPassword = ref(false);

function toggleShowPassword() {
  showPassword.value = !showPassword.value;
}

async function handleSignIn() {
  await signIn(email.value, password.value);
}
</script>

<template>
  <div class="container">
    <!-- IMAGE CONTAINER -->
    <div class="image-container">
      <img src="~/assets/images/i1.webp" class="image" alt="sign in chef" />
    </div>

    <h1 class="title">Welcome Back</h1>

    <!-- FORM CONTAINER -->
    <form class="form-container" @submit.prevent="handleSignIn">

      <!-- EMAIL INPUT -->
      <div class="input-container">
        <input type="email" class="text-input" placeholder="Enter email" v-model="email" />
      </div>

      <!-- PASSWORD INPUT -->
      <div class="input-container">
        <input :type="showPassword ? 'text' : 'password'" class="text-input" placeholder="Enter password"
          v-model="password" />
        <button type="button" class="eye-button" @click="toggleShowPassword">
          <Icon :name="showPassword ? 'ion:eye-outline' : 'ion:eye-off-outline'" :size="20" class="eye-icon" />
        </button>
      </div>

      <!-- SIGN IN BUTTON -->
      <button type="submit" class="auth-button button-text" :disabled="loading">
        <span v-if="loading">Signing In...</span>
        <span v-else>Sign In</span>
      </button>

      <!-- SIGN UP LINK -->
      <NuxtLink to="/sign-up" class="link-container link-text touch-opacity">
        <p>Don't have an account? <span class="link">Sign up</span></p>
      </NuxtLink>
    </form>

  </div>
</template>
