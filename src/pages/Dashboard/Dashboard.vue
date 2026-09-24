<template>
  <FullPageLayout @search-recipe="searchRecipe">
    <div class="space-y-3">
      <main class="space-y-4">
        <div class="lg:flex gap-4 space-y-4 lg:space-y-0">
          <div class="lg:w-3/4 space-y-5">
            <FoodCategory @food-category="getFoodByCategory" />
            <div>
              <nav class="flex justify-between my-4">
                <div class="flex items-center gap-2">
                  <h2 class="text-xl font-semibold">All items</h2>
                  <i class="fi fi-rr-settings-sliders mt-1.5"></i>
                </div>
              </nav>
              <p v-if="searchFoodRecipe" role="status" class="text-sm text-gray-500 mb-4">{{ filterItems(getRecipes?.data?.hits).length }} matching recipes</p>
              <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FoodItem :foodItems="filterItems(getRecipes?.data?.hits)" />
              </div>
            </div>
          </div>
          <FavoriteRecipe :query="searchFoodRecipe" />
        </div>
      </main>
    </div>
  </FullPageLayout>
</template>
<script setup>
import { usePageFilter } from '@/composables/usePageFilter';
const { searchFoodRecipe, searchRecipe, filterItems } = usePageFilter();
import { ref, onMounted, computed, watch } from "vue";
import FoodCategory from "./FoodCategory.vue";

import { useStore } from "vuex";
const store = useStore();
const FoodCategories = ref("Vegetarian");

const getFoodByCategory = (value) => {
  FoodCategories.value = value;
};
const getRecipe = (category) => {
  store.dispatch("FoodRecipeModule/getRecipe", category);
};
const getRecipes = computed(() => {
  return store.getters["FoodRecipeModule/getRecipe"];
});

onMounted(() => {
  // getRecipes;
  getRecipe(FoodCategories.value);
});

watch(FoodCategories, (newVal) => {
  getRecipe(newVal);
});

</script>
