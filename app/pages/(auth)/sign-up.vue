<script setup lang="ts">
import { storeToRefs } from "pinia";

definePageMeta({
  layout: "auth-layout",
});

const authStore = useAuthStore();
const { loading } = storeToRefs(authStore);
const { signUp } = authStore;

const name = ref("");
const email = ref("");
const password = ref("");
const showPassword = ref(false);

function toggleShowPassword() {
  showPassword.value = !showPassword.value;
}

async function handleSignUp() {
  await signUp(name.value, email.value, password.value);
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
