<script setup lang="ts">
const authStore = useAuthStore();

const { authenticated } = storeToRefs(authStore);

console.log("auth", authenticated.value);

if (!authenticated.value) {
  console.log("not logged in")
}
</script>

<template>
  <slot />
</template>
