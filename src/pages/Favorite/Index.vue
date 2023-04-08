<template>
  <FullPageLayout>
    <div>
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
