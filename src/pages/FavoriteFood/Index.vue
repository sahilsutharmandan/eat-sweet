<template>
  <FullPageLayout>
    <div class="space-y-3">
      <main class="space-y-4">
        <div class="lg:flex gap-4">
          <div class="lg:w-3/4 space-y-4">
            <FoodByCountry @get-food-by-country="getFood" />
            <div>
              <nav class="flex justify-between my-3">
                <div class="flex items-center gap-2">
                  <h2 class="text-xl font-semibold">All items</h2>
                  <i class="fi fi-rr-settings-sliders mt-1.5"></i>
                </div>
                <div class="flex items-center gap-2">
                  <span>See All</span>
                  <i class="fi fi-ss-arrow-right mt-1.5"></i>
                </div>
              </nav>
              <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FoodItems :foodItems="getRecipes?.data?.hits" />
              </div>
            </div>
          </div>
          <div class="flex-1 border rounded-2xl p-4 space-y-3">
            <nav class="flex justify-between mt-1">
              <div class="flex items-center gap-2">
                <h2 class="text-xl font-semibold">Favorite</h2>
              </div>
            </nav>
            <FavoriteFood />
            <div class="flex justify-end">
              <div class="flex items-center gap-2">
                <span>See All</span>
                <i class="fi fi-ss-arrow-right mt-1.5"></i>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </FullPageLayout>
</template>
<script setup>
import { ref, onMounted, computed, watch } from "vue";
import FoodByCountry from "./FoodByCountry.vue";
import FoodItems from "./FoodItems.vue";
import { useStore } from "vuex";
const store = useStore();
const country = ref("Indian");
const getFood = (value) => {
  country.value = value;
};
const getRecipe = (category) => {
  store.dispatch("FoodRecipeModule/getRecipe", category);
};
const getRecipes = computed(() => {
  return store.getters["FoodRecipeModule/getRecipe"];
});
onMounted(() => {
  getRecipes;
  getRecipe(country.value);
});

watch(country, (newVal) => {
  getRecipes;
  getRecipe(newVal);
});
</script>
