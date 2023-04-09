<template>
  <FullPageLayout>
    <div v-if="favoriteRecipe.length > 0">
      <nav class="flex justify-between mb-4">
        <div class="flex items-center gap-2">
          <h2 class="text-xl font-semibold">All items</h2>
          <i class="fi fi-rr-settings-sliders mt-1.5"></i>
        </div>
      </nav>
      <div class="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
        <favoriteItem :foodItems="favoriteRecipe" />
      </div>
    </div>
    <div v-else class="m-auto text-center flex-1 space-y-3">
      <img class="w-1/5 m-auto" src="src\images\no-favorite.png" alt="" />
      <h1 class="text-4xl font-bold">No Favorite Recipe</h1>
      <p class="w-5/6 m-auto">
        Looks like you haven't added any favorite recipe yet. Go ahead and
        explore our menu to find your new favorite dish! Once you find something
        you love, click the heart icon to add it to your favorites and easily
        access it later. Don't miss out on the chance to discover delicious
        meals and save them for future.
      </p>
    </div>
  </FullPageLayout>
</template>
<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useStore } from "vuex";
import FavoriteItem from "./FavoriteItem.vue";
const store = useStore();
const favoriteRecipe = computed(() => {
  return store.getters["FoodRecipeModule/favoriteRecipe"];
});
</script>
