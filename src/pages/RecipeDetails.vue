<template>
  <FullPageLayout>
    <div class="md:flex gap-6 space-y-4 lg:space-y-0" v-if="recipeDetails?.label">
      <div class="md:w-3/4 lg:flex gap-6">
        <div class="lg:w-1/3 h-full">
          <img
            class="h-96 w-full object-cover rounded-3xl shadow-md"
            :src="recipeDetails.image"
            :alt="recipeDetails.label"
          />
        </div>
        <div class="lg:w-2/3">
          <p class="text-sm font-semibold uppercase tracking-wider text-emerald-700">
            {{ recipeDetails.mealType?.[0] || 'Recipe' }}
          </p>
          <h2 class="text-3xl font-bold text-gray-900 tracking-tight my-1">
            {{ recipeDetails.label }}
          </h2>
          <div class="flex flex-wrap gap-1.5 my-2">
            <span
              v-for="item in recipeDetails.healthLabels"
              :key="item"
              class="inline-flex items-center rounded-full bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700"
            >
              {{ item }}
            </span>
          </div>

          <div class="flex justify-between items-center bg-emerald-100/70 text-emerald-900 font-semibold px-3 py-2 rounded-xl mb-3 mt-4">
            <span class="text-xs uppercase tracking-wider">
              Ingredients
            </span>
            <span v-if="hasSearch" class="text-xs font-normal">
              Showing {{ filteredIngredients.length }} of {{ recipeDetails.ingredients?.length || 0 }}
            </span>
          </div>

          <div
            v-if="filteredIngredients.length > 0"
            class="grid grid-cols-2 sm:grid-cols-3 gap-3"
          >
            <Ingredient :ingredients="filteredIngredients" />
          </div>
          <div
            v-else
            class="py-8 text-center text-xs text-gray-400 bg-gray-50 rounded-2xl"
          >
            No ingredients match "{{ searchQuery }}"
          </div>
        </div>
      </div>

      <!-- Nutrients List with live search filter -->
      <div class="flex-1 h-fit border border-gray-100 bg-white shadow-sm rounded-3xl p-5 pt-4 mt-5 md:mt-0">
        <div class="flex justify-between items-center pb-2 border-b border-gray-100">
          <h3 class="text-lg font-bold text-gray-900">Nutrients</h3>
          <span v-if="hasSearch" class="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
            {{ filteredNutrients.length }}
          </span>
        </div>
        <ul class="pl-2 divide-y divide-gray-100 mt-2 max-h-96 overflow-y-auto">
          <li
            class="flex gap-1 justify-between py-2 text-xs"
            v-for="nutrient in filteredNutrients"
            :key="nutrient.label"
            :class="hasSearch && nutrient.label.toLowerCase().includes(searchQuery.toLowerCase()) ? 'bg-emerald-50 px-2 rounded-md font-semibold text-emerald-800' : 'text-gray-600'"
          >
            <span>{{ nutrient.label }}</span>
            <span class="font-mono text-gray-800">
              <span>{{ nutrient.quantity.toFixed(1) }}</span>
              <span class="text-gray-400 ml-0.5">{{ nutrient.unit }}</span>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div v-else class="text-center py-20 text-gray-400 text-sm">
      No recipe selected. Please select a recipe from the dashboard or favorites.
    </div>
  </FullPageLayout>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import Ingredient from "./Recipe/Ingredient.vue";
import { useSearch } from "../composables/useSearch";

const store = useStore();
const { searchQuery, hasSearch } = useSearch();

const recipeDetails = computed(() => {
  return store.getters["FoodRecipeModule/recipeDetails"] || {};
});

const filteredIngredients = computed(() => {
  const list = recipeDetails.value?.ingredients || [];
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return list;
  return list.filter((item) =>
    (item.food || "").toLowerCase().includes(q)
  );
});

const filteredNutrients = computed(() => {
  const nutrientsObj = recipeDetails.value?.totalNutrients;
  if (!nutrientsObj) return [];
  const list = Object.values(nutrientsObj);
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return list;
  return list.filter((item) =>
    (item.label || "").toLowerCase().includes(q)
  );
});
</script>
