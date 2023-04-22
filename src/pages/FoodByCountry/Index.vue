<template>
  <FullPageLayout @search-recipe="searchRecipe">
    <div class="space-y-3">
      <main class="space-y-4">
        <div class="lg:flex gap-4 spacy-y-4 lg:space-y-0">
          <div class="lg:w-3/4 space-y-5">
            <FoodByCountry @get-food-by-country="getFood" />
            <div>
              <nav class="flex justify-between my-4">
                <div class="flex items-center gap-2">
                  <h2 class="text-xl font-semibold">All items</h2>
                  <i class="fi fi-rr-settings-sliders mt-1.5"></i>
                </div>
              </nav>
              <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FoodItem :foodItems="getRecipes?.data?.hits" />
              </div>
            </div>
          </div>
          <FavoriteRecipe />
        </div>
      </main>
    </div>
  </FullPageLayout>
</template>
<script setup>
import { ref, onMounted, computed, watch } from "vue";
import FoodByCountry from "./FoodByCountry.vue";

import { useStore } from "vuex";
const store = useStore();
const country = ref("Indian");
const searchFoodRecipe = ref();
const getFood = (value) => {
  country.value = value;
};
const getRecipe = (category) => {
  store.dispatch("FoodRecipeModule/getRecipe", category);
};
const getRecipes = computed(() => {
  return store.getters["FoodRecipeModule/getRecipe"];
});
const searchRecipe = (value) => {
  searchFoodRecipe.value = value;
};
onMounted(() => {
  getRecipes;
  getRecipe(country.value);
});

watch(country, (newVal) => {
  getRecipes;
  getRecipe(newVal);
});
watch(searchFoodRecipe, (newVal) => {
  getRecipe(newVal);
});
</script>
