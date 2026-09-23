<template>
  <div class="recipe-card relative min-w-0" v-for="(item, index) in foodItems" :key="index">
    <img
      v-lazy="item.recipe.image"
      class="w-32 max-w-full aspect-square rounded-full object-center m-auto z-[1]"
      alt=""
    />
    <div class="recipe-card-body border rounded-3xl -mt-14 pt-16 pb-4 px-5 space-y-2">
      <router-link to="/recipe-details" @click="getRecipeDetails(item.recipe)">
        <h3 class="font-semibold line-clamp-1 text-center">
          {{ item.recipe.label }}
        </h3>
      </router-link>
      <div
        class="recipe-nutrition py-1 text-gray-500 text-sm"
      >
        <p>
          <span class="text-green-500 pr-1">{{
            Math.floor(item.recipe.calories)
          }}</span
          ><span>CALORIES</span>
        </p>
        <p>
          <span class="text-green-500 pr-1">{{
            item.recipe.ingredients.length
          }}</span
          ><span>INGREDIENTS</span>
        </p>
      </div>

      <div class="flex justify-between items-center gap-2">
        <span class="font-semibold">{{ item.recipe.dietLabels[0] }}</span>
        <span class="mt-1.5 flex shrink-0 gap-2">
          <i
            @click="isFavoriteRecipe(item.recipe)"
            class="cursor-pointer"
            :class="{
              'fi fi-sr-heart text-red-500': isFavorite(item.recipe.label),
              'fi fi-rs-heart ': !isFavorite(item.recipe.label),
            }"
          ></i>
          <!-- <i class="fi fi-rr-shopping-cart cursor-pointer"></i> -->
        </span>
      </div>
    </div>
    <Loader v-if="loading" />
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
const loading = computed(() => {
  return store.getters["FoodRecipeModule/loading"];
});

function isFavorite(item) {
  return favoriteRecipe.value.some((fav) => fav.label === item);
}

const getRecipeDetails = (recipe) => {
  store.dispatch("FoodRecipeModule/getRecipeDetails", recipe);
};
</script>
<style scoped>
.recipe-card-body {
  overflow-wrap: anywhere;
}

.recipe-nutrition {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.25rem 0.75rem;
}

.recipe-nutrition p {
  min-width: 0;
}

/* Keep the divider only when both values fit comfortably on one line. */
.recipe-card {
  container-type: inline-size;
}

@container (min-width: 19rem) {
  .recipe-nutrition p + p {
    border-left: 1px solid currentColor;
    padding-left: 1rem;
  }
}
</style>
