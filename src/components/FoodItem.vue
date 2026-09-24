<template>
  <div
    class="recipe-card group relative min-w-0 flex flex-col"
    v-for="(item, index) in foodItems"
    :key="index"
  >
    <!-- Dish Image with circular elevation and subtle hover scale -->
    <div class="relative z-10 mx-auto w-32 aspect-square">
      <img
        :src="getRecipe(item).image"
        class="w-full h-full aspect-square rounded-full object-cover object-center shadow-md ring-4 ring-white group-hover:scale-105 transition-transform duration-300 bg-gray-100"
        :alt="getRecipe(item).label"
        loading="lazy"
      />
    </div>

    <!-- Card Body -->
    <div
      class="recipe-card-body flex-1 border border-gray-100 bg-white shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 rounded-3xl -mt-14 pt-16 pb-4 px-4 sm:px-5 flex flex-col justify-between space-y-3"
    >
      <!-- Title: Bigger, bolder, polished typography -->
      <router-link
        to="/recipe-details"
        @click="getRecipeDetails(getRecipe(item))"
        class="block group/link"
      >
        <h3
          class="text-base sm:text-lg font-bold text-gray-900 tracking-tight text-center line-clamp-1 group-hover/link:text-emerald-700 transition-colors"
          :title="getRecipe(item).label"
        >
          {{ getRecipe(item).label }}
        </h3>
      </router-link>

      <!-- Nutrition & Ingredients: Polished with icons, bold numbers, lightened descriptions -->
      <div
        class="recipe-nutrition flex items-center justify-between px-2.5 py-1.5 bg-gray-50/90 rounded-2xl border border-gray-100 text-xs overflow-hidden"
      >
        <!-- Calories Stat -->
        <div class="flex items-center gap-1 min-w-0 shrink-0">
          <!-- Flame icon -->
          <svg
            class="w-3.5 h-3.5 text-amber-500 shrink-0"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M13.5 4.938a7 7 0 11-9.006 1.737c.2-.265.57-.315.83-.11.26.204.31.57.106.83A5.5 5.5 0 0013 13.5a.75.75 0 011.5 0 7 7 0 01-1-8.562z"
              clip-rule="evenodd"
            />
            <path
              d="M12.354 10.146a.75.75 0 010 1.061A3.5 3.5 0 018.5 13a.75.75 0 010-1.5 2 2 0 001.995-1.854.75.75 0 01.859-.496.75.75 0 011 .996z"
            />
          </svg>
          <span class="font-bold text-gray-900 text-xs sm:text-sm whitespace-nowrap tabular-nums">
            {{ Math.floor(getRecipe(item).calories) }}
          </span>
          <span class="text-[9px] sm:text-[10px] font-medium text-gray-400 tracking-wider uppercase whitespace-nowrap">
            CALORIES
          </span>
        </div>

        <!-- Vertical divider -->
        <span class="h-3 w-px bg-gray-200 shrink-0 mx-1" aria-hidden="true"></span>

        <!-- Ingredients Stat -->
        <div class="flex items-center gap-1 min-w-0 shrink-0">
          <!-- Utensils / Ingredients icon -->
          <svg
            class="w-3.5 h-3.5 text-emerald-600 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M18 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2" />
            <path d="M15 11v11" />
            <path d="M5 2v10a2 2 0 0 0 2 2h2" />
            <path d="M9 22V9" />
          </svg>
          <span class="font-bold text-gray-900 text-xs sm:text-sm whitespace-nowrap tabular-nums">
            {{ getRecipe(item).ingredients?.length || getRecipe(item).ingredientLines?.length || 0 }}
          </span>
          <span class="text-[9px] sm:text-[10px] font-medium text-gray-400 tracking-wider uppercase whitespace-nowrap">
            INGREDIENTS
          </span>
        </div>
      </div>

      <!-- Footer: Polished badge + action icons -->
      <div class="flex justify-between items-center gap-2 pt-1 border-t border-gray-100">
        <!-- Diet label badge -->
        <div class="min-w-0">
          <span
            v-if="getRecipe(item).dietLabels && getRecipe(item).dietLabels.length"
            class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100 line-clamp-1"
          >
            {{ getRecipe(item).dietLabels[0] }}
          </span>
          <span
            v-else
            class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-gray-50 text-gray-500 border border-gray-200"
          >
            Recipe
          </span>
        </div>

        <!-- Action buttons -->
        <div class="flex items-center gap-1 shrink-0">
          <button
            type="button"
            @click.stop="isFavoriteRecipe(getRecipe(item))"
            class="p-1 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all active:scale-90 focus:outline-none"
            :title="isFavorite(getRecipe(item).label) ? 'Remove from favorites' : 'Add to favorites'"
          >
            <i
              class="text-base leading-none transition-transform"
              :class="{
                'fi fi-sr-heart text-red-500 scale-110': isFavorite(getRecipe(item).label),
                'fi fi-rs-heart text-gray-300 hover:text-red-500': !isFavorite(getRecipe(item).label),
              }"
            ></i>
          </button>
        </div>
      </div>
    </div>
    <Loader v-if="showLoader && loading" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  foodItems: [Array, Object],
  showLoader: {
    type: Boolean,
    default: false,
  },
});

const store = useStore();

const getRecipe = (item) => {
  return item?.recipe || item || {};
};

const isFavoriteRecipe = (favRecipe) => {
  store.dispatch("FoodRecipeModule/isFavoriteRecipe", favRecipe);
};

const favoriteRecipe = computed(() => {
  return store.getters["FoodRecipeModule/favoriteRecipe"] || [];
});

const loading = computed(() => {
  return store.getters["FoodRecipeModule/loading"];
});

function isFavorite(label) {
  if (!label) return false;
  return favoriteRecipe.value.some((fav) => fav?.label === label);
}

const getRecipeDetails = (recipe) => {
  store.dispatch("FoodRecipeModule/getRecipeDetails", recipe);
};
</script>

<style scoped>
.recipe-card-body {
  overflow-wrap: anywhere;
}
</style>
