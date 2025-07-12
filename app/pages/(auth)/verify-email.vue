<script setup lang="ts">
import { storeToRefs } from "pinia";

definePageMeta({
  layout: "auth-layout",
});

const authStore = useAuthStore();
const { loading } = storeToRefs(authStore);
const { verifyEmailCode, sendCodeToEmail } = authStore;

const route = useRoute();
const email = route.query.address as string;
const code = ref("");

async function handleVerification() {
  await verifyEmailCode(email, code.value);
}

onMounted(async () => await sendCodeToEmail(email));

</script>

<template>
  <div class="container">
    <!-- IMAGE CONTAINER -->
    <div class="image-container">
      <img src="~/assets/images/i3.webp" class="image" alt="verify email chef" />
    </div>

    <h1 class="title">Verify Your Email</h1>
    <p class="subtitle link-text">We've sent a verification code to {{ email }}</p>

    <!-- FORM CONTAINER -->
    <form class="form-container" @submit.prevent="handleVerification">

      <!-- VERIFICATION CODE INPUT -->
      <div class="input-container">
        <input type="text" class="text-input" placeholder="Enter verification code" v-model="code"
          inputmode="numeric" />
      </div>

      <!-- VERIFY BUTTON -->
      <button type="submit" class="auth-button button-text" :disabled="loading">
        <span v-if="loading">Verifying...</span>
        <span v-else>Verify Email</span>
      </button>

      <!-- RESEND EMAIL -->
      <div class="link-container link-text touch-opacity" @click="() => sendCodeToEmail(email, true)">
        <p>Didn't get an email? <span class="link">Resend code to email</span></p>
      </div>
    </form>
  </div>
</template>
