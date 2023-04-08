<template>
  <div class="aspect-square" v-for="(item, index) in foodItems" :key="index">
    <img
      v-lazy="item.recipe.image"
      class="w-32 aspect-square rounded-full object-center m-auto z-[1]"
      alt=""
    />
    <div class="border rounded-3xl -mt-14 pt-16 pb-4 px-5 space-y-2">
      <h3 class="font-semibold line-clamp-1">{{ item.recipe.label }}</h3>
      <div
        class="flex justify-between border- py-1 border-green-100 text-gray-500 text-sm"
      >
        <p>
          <span class="text-green-500 pr-1">{{
            Math.floor(item.recipe.calories)
          }}</span
          ><span>CALORIES</span>
        </p>
        |
        <p>
          <span class="text-green-500 pr-1">{{
            item.recipe.ingredients.length
          }}</span
          ><span>INGREDIENTS</span>
        </p>
      </div>

      <div class="flex justify-between items-center">
        <span class="font-semibold">{{ item.recipe.dietLabels[0] }}</span>
        <span class="mt-1.5 flex gap-2">
          <i
            @click="isFavoriteRecipe(item.recipe)"
            class="cursor-pointer"
            :class="{
              'fi fi-sr-heart': isFavorite(item.recipe.label),
              'fi fi-rs-heart': !isFavorite(item.recipe.label),
            }"
          ></i>
          <i class="fi fi-rr-shopping-cart cursor-pointer"></i>
        </span>
      </div>
    </div>
  </div>
</template>
<script setup>
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
</script>
