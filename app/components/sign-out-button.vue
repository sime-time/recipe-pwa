<script setup>
import "~/assets/styles/auth.css";

const authStore = useAuthStore();
const { loading } = storeToRefs(authStore);

async function handleSignOut() {
  await authStore.signOut();
}
</script>

<template>
  <button class="auth-button button-text" @click="handleSignOut">
    <span v-if="loading">Signing Out...</span>
    <span v-else>Sign Out</span>
  </button>
</template>
