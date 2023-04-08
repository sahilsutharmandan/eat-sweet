<template>
  <div class="flex-1 min-h-min border rounded-2xl p-4 space-y-3">
    <nav class="flex justify-between mt-1">
      <div class="flex items-center gap-2">
        <h2 class="text-xl font-semibold">Favorite</h2>
      </div>
    </nav>
    <div v-for="item in favoriteRecipe" :key="item">
      <div class="flex gap-2 items-center">
        <img class="w-12 rounded-xl" v-lazy="item.image" alt="" />
        <p class="line-clamp-2">{{ item.label }}</p>
      </div>
    </div>
    <div class="flex justify-end">
      <div class="flex items-center gap-2">
        <span>See All</span>
        <i class="fi fi-ss-arrow-right mt-1.5"></i>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch, computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const favoriteRecipe = computed(() => {
  return store.getters["FoodRecipeModule/favoriteRecipe"];
});
</script>
