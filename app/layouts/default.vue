<script setup lang="ts">
const authStore = useAuthStore();

if (!authStore.authenticated) {
  await navigateTo("/sign-in");
}
</script>

<template>
  <slot />
</template>
