<template>
  <FullPageLayout @search-recipe="searchRecipe" :searchPanelVisible="true">
    <div class="md:flex gap-4">
      <div class="md:w-3/4 lg:flex gap-6">
        <div class="lg:w-1/3 h-full">
          <img class="h-96 object-cover" v-lazy="recipeDetails.image" alt="" />
        </div>
        <div class="lg:w-2/3">
          <p>{{ recipeDetails.mealType[0] }}</p>
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
          <p class="grid grid-cols-3 gap-3">
            <Ingredient :ingredients="recipeDetails.ingredients" />
          </p>
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
import { ref, onMounted, computed, watch } from "vue";
import { useStore } from "vuex";
import Ingredient from "./Recipe/Ingredient.vue";
const store = useStore();
const searchFoodRecipe = ref();
const recipeDetails = computed(() => {
  return store.getters["FoodRecipeModule/recipeDetails"];
});
const searchRecipe = (value) => {
  searchFoodRecipe.value = value;
};
watch(searchFoodRecipe, (newVal) => {
  getRecipe(newVal);
});
</script>
