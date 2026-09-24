<template>
  <FullPageLayout>
    <div class="space-y-3">
      <main class="space-y-4">
        <div class="lg:flex gap-4 space-y-4 lg:space-y-0">
          <div class="lg:w-3/4 space-y-5">
            <FoodCategory @food-category="getFoodByCategory" />
            <div>
              <nav class="flex justify-between items-center my-4">
                <div class="flex items-center gap-2">
                  <h2 class="text-xl font-semibold text-gray-900">
                    {{ hasSearch ? 'Search results' : 'All items' }}
                  </h2>
                  <span
                    v-if="hasSearch"
                    class="text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-full"
                  >
                    {{ filteredFoodItems.length }} found
                  </span>
                  <i v-else class="fi fi-rr-settings-sliders mt-1.5 text-gray-500"></i>
                </div>
                <button
                  v-if="hasSearch"
                  @click="clearSearch"
                  class="text-xs text-emerald-700 hover:text-emerald-800 font-medium underline underline-offset-2"
                >
                  Clear search
                </button>
              </nav>

              <div
                v-if="filteredFoodItems.length > 0"
                class="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                <FoodItem :foodItems="filteredFoodItems" />
              </div>

              <!-- Empty Search Results State -->
              <div
                v-else-if="hasSearch"
                class="text-center py-16 px-4 bg-gray-50/70 border border-dashed border-gray-200 rounded-3xl space-y-3"
              >
                <div class="w-12 h-12 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl">
                  <i class="fi fi-rr-search"></i>
                </div>
                <h3 class="text-lg font-bold text-gray-900">
                  No recipes found for "{{ searchQuery }}"
                </h3>
                <p class="text-sm text-gray-500 max-w-sm mx-auto">
                  We couldn't find any recipes matching your search in this category. Try searching for a different ingredient or dish.
                </p>
                <button
                  type="button"
                  @click="clearSearch"
                  class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-sm transition-colors"
                >
                  Clear search filter
                </button>
              </div>

              <!-- Loading / Initial Empty State -->
              <div
                v-else-if="!getRecipes?.data?.hits?.length"
                class="text-center py-12 text-gray-400 text-sm"
              >
                Loading delicious recipes...
              </div>
            </div>
          </div>
          <FavoriteRecipe />
        </div>
      </main>
    </div>
  </FullPageLayout>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import FoodCategory from "./FoodCategory.vue";
import { useStore } from "vuex";
import { useSearch } from "../../composables/useSearch";

const store = useStore();
const { searchQuery, clearSearch, hasSearch } = useSearch();

const FoodCategories = ref("Vegetarian");

const getFoodByCategory = (value) => {
  FoodCategories.value = value;
};

const getRecipe = (category) => {
  store.dispatch("FoodRecipeModule/getRecipe", category);
};

const getRecipes = computed(() => {
  return store.getters["FoodRecipeModule/getRecipe"];
});

// Live filter based on the current searchQuery
const filteredFoodItems = computed(() => {
  const hits = getRecipes.value?.data?.hits || [];
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return hits;

  return hits.filter((item) => {
    const r = item.recipe || item;
    const label = (r.label || "").toLowerCase();
    const diet = (r.dietLabels || []).join(" ").toLowerCase();
    const meal = (r.mealType || []).join(" ").toLowerCase();
    const cuisine = (r.cuisineType || []).join(" ").toLowerCase();
    const ingredients = (r.ingredientLines || []).join(" ").toLowerCase();

    return (
      label.includes(q) ||
      diet.includes(q) ||
      meal.includes(q) ||
      cuisine.includes(q) ||
      ingredients.includes(q)
    );
  });
});

onMounted(() => {
  getRecipe(FoodCategories.value);
});

watch(FoodCategories, (newVal) => {
  getRecipe(newVal);
});
</script>
