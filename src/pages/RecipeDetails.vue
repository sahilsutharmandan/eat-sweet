<template>
  <FullPageLayout @search-recipe="searchRecipe" :searchPanelVisible="true">
    <p v-if="loading" role="status">Loading recipe…</p>
    <div v-else-if="error" role="alert">
      <p>{{ error }}</p>
      <button v-if="route.query.id" class="text-green-700 underline" @click="loadRecipe">Try again</button>
      <router-link class="block text-green-700 underline" to="/recipe">Search recipes</router-link>
    </div>
    <div v-else-if="recipeDetails" class="md:flex gap-4">
      <div class="md:w-3/4 lg:flex gap-6">
        <div class="lg:w-1/3 h-full">
          <img v-if="recipeDetails.image" class="h-96 object-cover" :src="recipeDetails.image" alt="" />
        </div>
        <div class="lg:w-2/3">
          <p>{{ recipeDetails.mealType?.[0] }}</p>
          <h2 class="text-3xl font-semibold">{{ recipeDetails.label }}</h2>
          <div class="space-y-1">
            <p
              class="inline-block mr-2"
              v-for="item in recipeDetails.healthLabels"
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
                {{ item }}
              </span>
            </p>
          </div>

          <p
            class="bg-green-200 text-green-800 font-semibold px-2 py-1.5 mb-2 mt-3"
          >
            Ingredient
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            <Ingredient :ingredients="recipeDetails.ingredients" />
          </div>
        </div>
      </div>
      <div class="flex-1 h-fit border rounded-2xl p-5 pt-4">
        <h3 class="text-xl font-semibold pb-1">Nutrients</h3>
        <ul class="pl-4 list-disc">
          <li
            class="flex gap-1 justify-between"
            v-for="item in recipeDetails.totalNutrients"
            :key="item"
          >
            <span>{{ item.label }}</span>
            <span>
              <span>{{ item.quantity.toFixed(1) }}</span>
              <span>{{ item.unit }}</span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </FullPageLayout>
</template>
<script setup>
import { ref, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { recipeId } from "@/utils/recipeLink";
import Ingredient from "./Recipe/Ingredient.vue";
const store = useStore();
const route = useRoute();
const recipeDetails = ref(null);
const loading = ref(false);
const error = ref("");
let request = 0;
async function loadRecipe() {
  const current = ++request;
  const id = route.query.id;
  recipeDetails.value = null;
  error.value = "";
  loading.value = false;
  if (typeof id !== 'string' || !/^[a-zA-Z0-9_-]+$/.test(id)) {
    error.value = "Choose a recipe to view its details.";
    return;
  }
  const selected = store.getters["FoodRecipeModule/recipeDetails"];
  if (recipeId(selected) === id) {
    recipeDetails.value = selected;
    return;
  }
  loading.value = true;
  try {
    const recipe = await store.dispatch("FoodRecipeModule/loadRecipeDetails", id);
    if (!recipe || recipeId(recipe) !== id) throw new Error('Recipe not found');
    if (current === request) recipeDetails.value = recipe;
  } catch {
    if (current === request) error.value = "This recipe could not be loaded. Please try again or search for another recipe.";
  } finally {
    if (current === request) loading.value = false;
  }
}
watch(() => route.query.id, loadRecipe, { immediate: true });
const searchRecipe = (value) => store.dispatch("FoodRecipeModule/getRecipe", value);
</script>
