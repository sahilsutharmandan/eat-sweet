<template>
  <FullPageLayout @search-recipe="searchRecipe" :searchPanelVisible="true">
    <div v-if="loading" class="flex justify-center items-center py-20">
      <Loader />
    </div>
    <div
      v-else-if="matchedRecipes.length > 0"
      class="md:flex gap-4 space-y-4 lg:space-y-0"
      v-for="(item, index) in matchedRecipes"
      :key="index"
    >
      <div class="md:w-3/4 lg:flex gap-6">
        <div class="lg:w-1/3 h-full">
          <img
            v-if="item.recipe.image"
            class="h-96 w-full object-cover rounded-2xl"
            v-lazy="item.recipe.image"
            alt=""
          />
          <div
            v-else
            class="h-96 w-full bg-green-100 rounded-2xl flex items-center justify-center text-green-800 text-2xl font-bold"
          >
            {{ item.recipe.label }}
          </div>
        </div>
        <div class="lg:w-2/3">
          <p class="text-sm text-gray-500 uppercase tracking-wide">{{ item.recipe.mealType?.[0] }}</p>
          <h2 class="text-3xl font-semibold">{{ item.recipe.label }}</h2>
          <div class="space-y-1">
            <p
              class="inline-block mr-2"
              v-for="label in item.recipe.healthLabels"
              :key="label"
            >
              <span
                class="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-600"
              >
                <svg
                  class="-ml-0.5 mr-1.5 h-2 w-2 text-green-400"
                  fill="currentColor"
                  viewBox="0 0 8 8"
                >
                  <circle cx="4" cy="4" r="3" />
                </svg>
                {{ label }}
              </span>
            </p>
          </div>

          <p
            class="bg-green-200 text-green-800 font-semibold px-2 py-1.5 mb-2 mt-3 rounded"
          >
            Ingredient
          </p>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <Ingredient :ingredients="item.recipe.ingredients" />
          </div>
        </div>
      </div>
      <div class="flex-1 h-fit border rounded-2xl p-5 pt-4 mt-5 md:mt-0">
        <h3 class="text-xl font-semibold pb-1">Nutrients</h3>
        <ul class="pl-4 list-disc space-y-1">
          <li
            class="flex gap-1 justify-between text-sm"
            v-for="nutrient in item.recipe.totalNutrients"
            :key="nutrient.label"
          >
            <span>{{ nutrient.label }}</span>
            <span>
              <span>{{ nutrient.quantity ? nutrient.quantity.toFixed(1) : 0 }}</span>
              <span class="ml-0.5">{{ nutrient.unit }}</span>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div v-else class="text-center py-20 text-gray-500">
      <p class="text-lg">No recipes found{{ searchFoodRecipe ? ` for "${searchFoodRecipe}"` : '' }}.</p>
      <p class="text-sm text-gray-400 mt-1">Try searching for something else like "pasta", "chicken", or "salad".</p>
    </div>
  </FullPageLayout>
</template>
<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useStore } from "vuex";
import Ingredient from "./Ingredient.vue";
import Loader from "../../components/Loader.vue";

const store = useStore();
const searchFoodRecipe = ref("");
const FoodCategories = ref("Vegetarian");

const getRecipe = (category) => {
  store.dispatch("FoodRecipeModule/getRecipe", category);
};

const getRecipes = computed(() => {
  return store.getters["FoodRecipeModule/getRecipe"];
});

const loading = computed(() => {
  return store.getters["FoodRecipeModule/loading"];
});

const matchedRecipes = computed(() => {
  const hits = getRecipes.value?.data?.hits;
  if (!hits || hits.length === 0) return [];
  // Return top matching recipe (index 0)
  return hits.slice(0, 1);
});

const searchRecipe = (value) => {
  searchFoodRecipe.value = value;
  if (value) {
    getRecipe(value);
  }
};

onMounted(() => {
  getRecipe(FoodCategories.value);
});

watch(searchFoodRecipe, (newVal) => {
  if (newVal) {
    getRecipe(newVal);
  }
});
</script>
