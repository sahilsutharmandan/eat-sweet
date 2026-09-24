<template>
  <div class="recipe-card relative min-w-0" v-for="(item, index) in foodItems" :key="index">
    <img
      v-if="item.image"
      v-lazy="item.image"
      class="w-32 max-w-full aspect-square rounded-full object-center m-auto z-[1]"
      alt=""
    />
    <div
      v-else
      class="w-32 max-w-full aspect-square rounded-full bg-green-100 border border-green-200 flex items-center justify-center m-auto z-[1] text-green-700 font-bold text-2xl"
    >
      {{ item.label?.[0]?.toUpperCase() || '🥗' }}
    </div>
    <div class="recipe-card-body border rounded-3xl -mt-14 pt-16 pb-4 px-5 space-y-2">
      <router-link to="/recipe-details" @click="getRecipeDetails(item)">
        <h3 class="font-semibold line-clamp-1 text-center">{{ item.label }}</h3>
      </router-link>
      <div
        class="recipe-nutrition py-1 text-gray-500 text-sm"
      >
        <p>
          <span class="text-green-500 pr-1">{{
            item.calories ? Math.floor(item.calories) : 0
          }}</span
          ><span>CALORIES</span>
        </p>
        <p>
          <span class="text-green-500 pr-1">{{ item.ingredients?.length || 0 }}</span
          ><span>INGREDIENTS</span>
        </p>
      </div>

      <div class="flex justify-between items-center gap-2">
        <span class="font-semibold">{{ item.dietLabels?.[0] }}</span>
        <span class="mt-1.5 flex shrink-0 gap-2">
          <i
            @click="isFavoriteRecipe(item)"
            class="cursor-pointer"
            :class="{
              'fi fi-sr-heart text-red-500': isFavorite(item.label),
              'fi fi-rs-heart': !isFavorite(item.label),
            }"
          ></i>
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
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
}

/* Keep the divider only when both values fit comfortably on one line. */
.recipe-card {
  container-type: inline-size;
}

@container (min-width: 17rem) {
  .recipe-nutrition p + p {
    border-left: 1px solid #d1d5db;
    padding-left: 0.75rem;
  }
}
</style>
