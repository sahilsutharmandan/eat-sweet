<template>
  <div class="min-w-0" v-for="(item, index) in foodItems" :key="index">
    <img
      v-lazy="item.image"
      class="w-32 max-w-full aspect-square rounded-full object-center m-auto z-[1]"
      alt=""
    />
    <div class="border rounded-3xl -mt-14 pt-16 pb-4 px-5 space-y-2">
      <router-link :to="recipeLink(item)" @click="getRecipeDetails(item)">
        <h3 class="font-semibold line-clamp-1">{{ item.label }}</h3>
      </router-link>
      <div
        class="card-metadata py-1 text-gray-500 text-sm"
      >
        <p>
          <span class="text-green-500 pr-1">{{
            Math.floor(item.calories)
          }}</span
          ><span>CALORIES</span>
        </p>
        <p>
          <span class="text-green-500 pr-1">{{ item.ingredients.length }}</span
          ><span>INGREDIENTS</span>
        </p>
      </div>

      <div class="flex justify-between items-center">
        <span class="font-semibold">{{ item.dietLabels[0] }}</span>
        <span class="mt-1.5 flex gap-2">
          <i
            @click="isFavoriteRecipe(item)"
            class="cursor-pointer"
            :class="{
              'fi fi-sr-heart': isFavorite(item.label),
              'fi fi-rs-heart': !isFavorite(item.label),
            }"
          ></i>
          <i class="fi fi-rr-shopping-cart cursor-pointer"></i>
        </span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { recipeLink } from "@/utils/recipeLink";
import { ref, watch, computed } from "vue";
import { useStore } from "vuex";
const props = defineProps({
  foodItems: [Array, Object],
});
const store = useStore();
const isFavoriteRecipe = (favRecipe) => {
  store.dispatch("FoodRecipeModule/isFavoriteRecipe", favRecipe);
};
const favoriteRecipe = computed(() => {
  return store.getters["FoodRecipeModule/favoriteRecipe"];
});

function isFavorite(item) {
  return favoriteRecipe.value.some((fav) => fav.label === item);
}
const getRecipeDetails = (recipe) => {
  store.dispatch("FoodRecipeModule/getRecipeDetails", recipe);
};
</script>

<style scoped>
.card-metadata {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.25rem 0.75rem;
  overflow-wrap: anywhere;
}
.card-metadata p {
  min-width: 0;
  flex-wrap: wrap;
}
</style>
