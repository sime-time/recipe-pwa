<script setup lang="ts">
import "~/assets/styles/auth.css"

const router = useRouter();

const name = ref("");
const email = ref("");
const password = ref("");
const showPassword = ref("");
const loading = ref(false);

async function handleSignUp() {
  if (!email.value || !password.value) {
    return alert("Error. Please fill in all fields");
  }

  if (password.value.length < 8) {
    return alert("Error. Password must be at least 8 characters");
  }

  loading.value = true;
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
    <form class="form-container">
      <!-- NAME INPUT -->
      <div class="input-container">
        <input type="text" class="text-input w-full" placeholder="Full name" />
      </div>

      <!-- EMAIL INPUT -->
      <div class="input-container">
        <input type="email" class="text-input w-full" placeholder="Enter email" />
      </div>

      <!-- PASSWORD INPUT -->
      <div class="input-container">
        <input type="password" class="text-input w-full" placeholder="Enter password" />
        <button type="button" class="eye-button">
          <Icon name="lucide:eye" :size="20" class="eye-icon" />
        </button>
      </div>

      <!-- SIGN UP BUTTON -->
      <button type="submit" class="auth-button w-full">
        <span class="button-text">Sign Up</span>
      </button>

      <!-- SIGN IN LINK -->
      <NuxtLink to="/sign-in" class="link-container link-text touch-opacity">
        <p>Already have an account? <span class="link">Sign in</span></p>
      </NuxtLink>
    </form>

  </div>
</template>
