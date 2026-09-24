<template>
  <FullPageLayout>
    <div v-if="favoriteRecipe.length > 0">
      <nav class="flex justify-between items-center mb-5">
        <div class="flex items-center gap-2">
          <h2 class="text-xl font-semibold text-gray-900">
            {{ hasSearch ? 'Search results' : 'Favorite recipes' }}
          </h2>
          <span
            class="text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-full"
          >
            {{ filteredFavorites.length }} {{ filteredFavorites.length === 1 ? 'item' : 'items' }}
          </span>
        </div>
        <button
          v-if="hasSearch"
          @click="clearSearch"
          class="text-xs text-emerald-700 hover:text-emerald-800 font-medium underline underline-offset-2"
        >
          Clear search
        </button>
      </nav>

      <!-- Grid of favorite recipe cards -->
      <div
        v-if="filteredFavorites.length > 0"
        class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
      >
        <FavoriteItem :foodItems="filteredFavorites" />
      </div>

      <!-- Search empty state (when favorites exist but none match search) -->
      <div
        v-else
        class="text-center py-16 px-4 bg-gray-50/70 border border-dashed border-gray-200 rounded-3xl space-y-3"
      >
        <div class="w-12 h-12 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl">
          <i class="fi fi-rr-search"></i>
        </div>
        <h3 class="text-lg font-bold text-gray-900">
          No favorites match "{{ searchQuery }}"
        </h3>
        <p class="text-sm text-gray-500 max-w-sm mx-auto">
          None of your saved favorite recipes match this search term. Try another term or clear the filter.
        </p>
        <button
          type="button"
          @click="clearSearch"
          class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-sm transition-colors"
        >
          Clear search filter
        </button>
      </div>
    </div>

    <!-- Empty favorites state (no favorites saved at all) -->
    <div v-else class="m-auto text-center flex-1 space-y-3 py-12">
      <img class="w-1/5 m-auto max-w-[180px]" src="/src/images/no-favorite.png" alt="" />
      <h1 class="text-3xl font-bold text-gray-900">No Favorite Recipe</h1>
      <p class="w-5/6 max-w-lg m-auto text-gray-500 text-sm leading-relaxed">
        Looks like you haven't added any favorite recipe yet. Go ahead and
        explore our menu to find your new favorite dish! Once you find something
        you love, click the heart icon to add it to your favorites and easily
        access it later.
      </p>
      <router-link
        to="/"
        class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold shadow-sm transition-colors mt-2"
      >
        Explore Recipes
      </router-link>
    </div>
  </FullPageLayout>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import FavoriteItem from "./FavoriteItem.vue";
import { useSearch } from "../../composables/useSearch";

const store = useStore();
const { searchQuery, clearSearch, hasSearch } = useSearch();

const favoriteRecipe = computed(() => {
  return store.getters["FoodRecipeModule/favoriteRecipe"] || [];
});

// Live filter favorite items by searchQuery
const filteredFavorites = computed(() => {
  const list = favoriteRecipe.value || [];
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return list;

  return list.filter((item) => {
    const label = (item?.label || "").toLowerCase();
    const diet = (item?.dietLabels || []).join(" ").toLowerCase();
    const ingredients = (
      item?.ingredientLines ||
      item?.ingredients?.map((i) => (typeof i === "string" ? i : i.text || i.food)) ||
      []
    )
      .join(" ")
      .toLowerCase();

    return label.includes(q) || diet.includes(q) || ingredients.includes(q);
  });
});
</script>
