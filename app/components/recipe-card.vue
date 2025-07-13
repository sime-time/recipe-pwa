<script setup lang="ts">
import "~/assets/styles/home.css";

const router = useRouter();

defineProps<{
  recipe: any;
}>();
</script>

<template>
  <button class="recipe-card-container touch-opacity flex flex-col">
    <div class="recipe-card-image-container">
      <img :src="recipe.image" class="recipe-card-image" />
    </div>

    <div class="recipe-card-content">
      <h3 class="recipe-card-title line-clamp-2">{{ recipe.title }}</h3>

      <p v-if="recipe.description" class="recipe-card-description line-clamp-2">
        {{ recipe.description }}
      </p>
      <div class="recipe-card-footer">
        <div v-if="recipe.cookTime" class="time-container">
          <Icon name="ion:time-outline" size="14" class="time-text" />
          <p class="time-text">{{ recipe.cookTime }}</p>
        </div>

        <div v-if="recipe.servings" class="servings-container">
          <Icon name="ion:people-outline" size="14" class="time-text" />
          <p class="servings-text">{{ recipe.servings }}</p>
        </div>
      </div>


    </div>

  </button>
</template>
