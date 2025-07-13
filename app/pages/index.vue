<script setup lang="ts">
import { MealAPI } from "~/utils/meal-api";
import "~/assets/styles/home.css";

const router = useRouter();
const recipes = ref<any[]>([]);
const categories = ref([]);
const selectedCategory = ref("");
const featuredRecipe = ref<any>(null);
const loading = ref(false);
const refreshing = ref(false);

// This function will be responsible for fetching the core data of the screen.
const loadCoreData = async () => {
  loading.value = true;
  try {
    const [apiCategories, featuredMeal] = await Promise.all([
      MealAPI.getCategories(),
      MealAPI.getRandomMeal(),
    ]);

    const transformedCategories = apiCategories.map((cat: any, index: number) => ({
      id: index + 1,
      name: cat.strCategory,
      image: cat.strCategoryThumb,
      description: cat.strCategoryDescription,
    }));

    categories.value = transformedCategories;
    featuredRecipe.value = MealAPI.transformMealData(featuredMeal)

    // If no category is selected, default to the first one.
    // This will trigger the useEffect below to load the recipes.
    if (!selectedCategory.value && transformedCategories.length > 0) {
      selectedCategory.value = transformedCategories[0].name
    }
  } catch (error) {
    console.log("Error loading core data", error);
  } finally {
    loading.value = false;
  }
};

async function onRefresh() {
  refreshing.value = true;
  // On refresh, we want to get a new featured meal and reload the current category recipes.
  try {
    await Promise.all([
      MealAPI.getRandomMeal().then(meal => featuredRecipe.value = MealAPI.transformMealData(meal)),
      selectedCategory ? loadCategoryData(selectedCategory.value) : Promise.resolve(),
    ]);
  } catch (error) {
    console.log("Error refreshing data", error);
  }
  refreshing.value = false;
};

const loadCategoryData = async (category: string) => {
  // Set recipes to empty to show the empty state component while loading
  recipes.value = [];
  try {
    const meals = await MealAPI.filterByCategory(category);
    const transformedMeals = meals
      .map((meal: any) => MealAPI.transformMealData(meal))
      .filter((meal: any) => meal !== null);
    recipes.value = transformedMeals;

  } catch (error) {
    console.error("Error loading category data:", error);
    recipes.value = [];
  }
};

function handleCategorySelect(category: string) {
  selectedCategory.value = category;
};

// Effect for the initial data load
onMounted(() => {
  loadCoreData();
});

// load recipes when the selected category changes
watch(selectedCategory, () => {
  loadCategoryData(selectedCategory.value);
});

</script>

<template>
  <div class="container">
    <!-- ANIMAL ICONS -->
    <section class="animal-section">
      <img src="~/assets/images/lamb.webp" width="100" height="100" />
      <img src="~/assets/images/chicken.webp" width="100" height="100" />
      <img src="~/assets/images/pork.webp" width="100" height="100" />
    </section>

    <!-- FEATURED SECTION -->
    <section v-if="featuredRecipe" class="featured-section">
      <button class="featured-card w-full" @click="() => router.push(`/recipe/${featuredRecipe.id}`)">
        <div class="featured-image-container">
          <img :src="featuredRecipe.image" class="featured-image" />
          <div class="featured-overlay">
            <div class="featured-badge featured-badge-text">
              Featured
            </div>

            <div class="featured-content">
              <h1 class="featured-title line-clamp-2">
                {{ featuredRecipe.title }}
              </h1>

              <div class="featured-meta">
                <div class="meta-item">
                  <Icon name="ion:time-outline" size="16" class="meta-text" />
                  <p class="meta-text">{{ featuredRecipe.cookTime }}</p>
                </div>

                <div class="meta-item">
                  <Icon name="ion:people-outline" size="16" class="meta-text" />
                  <p class="meta-text">{{ featuredRecipe.servings }}</p>
                </div>

                <div v-if="featuredRecipe.area" class="meta-item">
                  <Icon name="ion:location-outline" size="16" class="meta-text" />
                  <p class="meta-text">{{ featuredRecipe.area }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </button>
    </section>

    <section v-if="categories.length > 0">
      <div>cat filter</div>
    </section>

    <!-- SELECTED CATEGORY RECIPE LIST -->
    <section class="recipes-section">
      <div class="section-header">
        <h1 class="section-title">{{ selectedCategory }}</h1>
      </div>

      <div v-if="recipes.length > 0" class="recipes-grid grid grid-cols-2 justify-between gap-16">
        <div v-for="recipe in recipes" :key="recipe.id.toString()">
          <RecipeCard :recipe="recipe" />
        </div>
      </div>
      <div v-else class="empty-state">
        <Icon name="ion:restaurant-outline" size="64" class="meta-text" />
        <h2 class="empty-title">No recipes found</h2>
        <p class="empty-description">Try a different category</p>
      </div>
    </section>
  </div>
</template>
