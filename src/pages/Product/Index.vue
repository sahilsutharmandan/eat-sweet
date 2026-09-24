<template>
  <FullPageLayout>
    <div class="mb-4">
      <div class="md:flex space-y-4 md:space-y-0 gap-4 items-center">
        <!-- Meal Type Category Dropdown -->
        <div class="w-full sm:w-64">
          <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Category</label>
          <Dropdown
            v-model="selectedMealType"
            :options="mealsType"
            optionLabel="strCategory"
            aria-label="Select a Meal Type"
            placeholder="Select a Category"
            class="w-full"
          >
            <template #value="slotProps">
              <div v-if="slotProps.value" class="flex items-center">
                <img
                  :alt="slotProps.value.strCategory"
                  :src="slotProps.value.strCategoryThumb"
                  class="mr-2 w-6 aspect-square rounded-md shrink-0 object-cover"
                />
                <div class="font-medium text-sm">{{ slotProps.value.strCategory }}</div>
              </div>
              <span v-else class="text-sm text-gray-400">{{ slotProps.placeholder }}</span>
            </template>
            <template #option="slotProps">
              <div class="flex items-center">
                <img
                  :alt="slotProps.option.strCategory"
                  :src="slotProps.option.strCategoryThumb"
                  class="mr-2 w-6 aspect-square rounded-md shrink-0 object-cover"
                />
                <div class="text-sm font-medium">{{ slotProps.option.strCategory }}</div>
              </div>
            </template>
          </Dropdown>
        </div>

        <!-- Meal Selection Dropdown (filtered live by search) -->
        <div class="w-full sm:w-80">
          <div class="flex justify-between items-center mb-1.5">
            <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Meal</label>
            <span v-if="hasSearch" class="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              {{ filteredMealsByCategory.length }} matching
            </span>
          </div>
          <Dropdown
            v-model="selectedMeal"
            :options="filteredMealsByCategory"
            optionLabel="strMeal"
            aria-label="Select a Meal"
            placeholder="Select a Meal"
            class="w-full"
          >
            <template #value="slotProps">
              <div v-if="slotProps.value" class="flex items-center">
                <img
                  :alt="slotProps.value.strMeal"
                  :src="slotProps.value.strMealThumb"
                  class="mr-2 w-6 aspect-square rounded-md shrink-0 object-cover"
                />
                <div class="font-medium text-sm line-clamp-1">{{ slotProps.value.strMeal }}</div>
              </div>
              <span v-else class="text-sm text-gray-400">{{ slotProps.placeholder }}</span>
            </template>
            <template #option="slotProps">
              <div class="flex items-center max-w-sm">
                <img
                  :alt="slotProps.option.strMeal"
                  :src="slotProps.option.strMealThumb"
                  class="mr-2 w-6 aspect-square rounded-md shrink-0 object-cover"
                />
                <div class="line-clamp-1 text-sm">{{ slotProps.option.strMeal }}</div>
              </div>
            </template>
          </Dropdown>
        </div>
      </div>

      <!-- Live Search Results Strip (When Search is Active) -->
      <div
        v-if="hasSearch"
        class="mt-4 p-4 bg-emerald-50/70 border border-emerald-100 rounded-2xl"
      >
        <div class="flex items-center justify-between text-xs font-semibold text-emerald-900 mb-2.5">
          <span>
            Matching meals for "{{ searchQuery }}" ({{ filteredMealsByCategory.length }})
          </span>
          <button
            type="button"
            @click="clearSearch"
            class="text-emerald-700 hover:text-emerald-900 underline underline-offset-2"
          >
            Clear filter
          </button>
        </div>

        <div
          v-if="filteredMealsByCategory.length > 0"
          class="flex flex-wrap gap-2 max-h-36 overflow-y-auto"
        >
          <button
            v-for="m in filteredMealsByCategory"
            :key="m.idMeal"
            type="button"
            @click="selectSpecificMeal(m)"
            class="px-3 py-1.5 rounded-xl text-xs font-medium border transition-all flex items-center gap-2 shadow-xs"
            :class="
              selectedMeal?.idMeal === m.idMeal
                ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                : 'bg-white text-gray-700 border-gray-200 hover:border-emerald-600 hover:bg-emerald-50/50'
            "
          >
            <img :src="m.strMealThumb" class="w-4 h-4 rounded-full object-cover shrink-0" alt="" />
            <span class="truncate max-w-[200px]">{{ m.strMeal }}</span>
          </button>
        </div>
        <p v-else class="text-xs text-gray-500 py-1">
          No meals found in this category matching "{{ searchQuery }}". Try another keyword or category.
        </p>
      </div>
    </div>

    <!-- Meal Details View -->
    <div class="md:flex gap-6" v-for="(item, index) in meals" :key="index">
      <div class="md:w-2/3 lg:w-3/4 flex flex-col md:flex-row gap-6">
        <div class="md:w-1/2 lg:w-5/12">
          <img
            :src="item.strMealThumb"
            class="w-full aspect-square rounded-3xl object-cover shadow-md ring-1 ring-gray-100"
            :alt="item.strMeal"
          />
        </div>
        <div class="md:w-1/2 lg:w-7/12 space-y-3">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
            {{ item.strCategory }}
          </span>
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            {{ item.strMeal }}
          </h2>
          <div class="flex items-center gap-3 text-sm text-gray-500">
            <span class="font-semibold text-gray-900">★ 4.8</span>
            <span>432 Reviews</span>
            <span class="text-gray-300">•</span>
            <span class="text-xs uppercase tracking-wider font-semibold text-emerald-700">In Stock</span>
          </div>
          <div class="text-2xl font-bold text-gray-900">
            $459.44
          </div>

          <div class="pt-2">
            <div class="bg-emerald-100/70 text-emerald-900 font-semibold px-3 py-1.5 rounded-xl text-xs uppercase tracking-wider mb-2">
              Instructions
            </div>
            <p class="text-sm text-gray-600 leading-relaxed max-h-60 overflow-y-auto pr-2">
              {{ item.strInstructions }}
            </p>
          </div>
        </div>
      </div>

      <!-- Ingredient Section with live search filtering -->
      <div class="flex-1 h-fit border border-gray-100 bg-white rounded-3xl p-5 shadow-sm mt-6 md:mt-0">
        <div class="flex justify-between items-center pb-3 border-b border-gray-100">
          <h3 class="text-lg font-bold text-gray-900">Ingredients</h3>
          <span class="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
            {{ filteredIngredients.length }} items
          </span>
        </div>

        <ul v-if="filteredIngredients.length > 0" class="divide-y divide-gray-100 max-h-96 overflow-y-auto">
          <li
            v-for="(ing, idx) in filteredIngredients"
            :key="idx"
            class="py-2.5 text-xs flex justify-between items-center transition-colors"
            :class="hasSearch && ing.name.toLowerCase().includes(searchQuery.toLowerCase()) ? 'bg-emerald-50/80 px-2 rounded-lg' : ''"
          >
            <div class="flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
              <span
                class="font-medium text-gray-800"
                :class="hasSearch && ing.name.toLowerCase().includes(searchQuery.toLowerCase()) ? 'font-bold text-emerald-800' : ''"
              >
                {{ ing.name }}
              </span>
            </div>
            <span class="text-gray-400 font-mono text-[11px]">{{ ing.measure }}</span>
          </li>
        </ul>
        <div v-else-if="hasSearch" class="py-8 text-center text-xs text-gray-400 space-y-1">
          <p>No ingredients match "{{ searchQuery }}"</p>
          <button @click="clearSearch" class="text-emerald-700 underline font-medium">Clear search</button>
        </div>
      </div>
    </div>
  </FullPageLayout>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useStore } from "vuex";
import Dropdown from "../../components/ThemedDropdown.vue";
import { useSearch } from "../../composables/useSearch";

const store = useStore();
const { searchQuery, clearSearch, hasSearch } = useSearch();

const selectedMeal = ref();
const selectedMealType = ref();
const mealId = ref("52772");
const mealsCategory = ref("SeaFood");

const getMealsById = (id) => {
  store.dispatch("MealsModule/getMealsById", id);
};
const meals = computed(() => {
  return store.getters["MealsModule/meals"] || [];
});

const getMealsByCategory = (category) => {
  store.dispatch("MealsModule/getMealsByCategory", category);
};
const mealsByCategory = computed(() => {
  return store.getters["MealsModule/mealsByCategory"] || [];
});

const getMealsType = () => {
  store.dispatch("MealsModule/getMealsType");
};
const mealsType = computed(() => {
  return store.getters["MealsModule/mealsType"] || [];
});

// Live filter the available meals in category based on search query
const filteredMealsByCategory = computed(() => {
  const list = mealsByCategory.value || [];
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return list;
  return list.filter((m) => (m.strMeal || "").toLowerCase().includes(q));
});

// Select a meal directly from matching chips
const selectSpecificMeal = (meal) => {
  selectedMeal.value = meal;
  if (meal?.idMeal) {
    getMealsById(meal.idMeal);
  }
};

// Auto-select first matching meal when user types in search if current doesn't match
watch(searchQuery, (newQuery) => {
  const q = newQuery.trim().toLowerCase();
  if (!q) return;

  const matches = filteredMealsByCategory.value;
  if (matches.length > 0) {
    const currentName = (selectedMeal.value?.strMeal || "").toLowerCase();
    if (!currentName.includes(q)) {
      selectSpecificMeal(matches[0]);
    }
  }
});

// Extracted ingredients list for currently displayed meal
const currentIngredients = computed(() => {
  const m = meals.value?.[0];
  if (!m) return [];

  const ingList = [];
  for (let i = 1; i <= 20; i++) {
    const ing = m[`strIngredient${i}`];
    const measure = m[`strMeasure${i}`];
    if (ing && ing.trim()) {
      ingList.push({
        name: ing.trim(),
        measure: measure ? measure.trim() : "",
      });
    }
  }
  return ingList;
});

// Live filter ingredients based on searchQuery
const filteredIngredients = computed(() => {
  const list = currentIngredients.value;
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return list;

  // If the search matches meal name, show all ingredients, otherwise filter ingredients by query
  const matchesMealName = (selectedMeal.value?.strMeal || "").toLowerCase().includes(q);
  const matchingIngs = list.filter((ing) => ing.name.toLowerCase().includes(q));

  if (matchingIngs.length > 0) {
    return matchingIngs;
  }
  return matchesMealName ? list : [];
});

onMounted(() => {
  getMealsById(mealId.value);
  getMealsByCategory(mealsCategory.value);
  getMealsType();
});

watch(selectedMeal, (newValue) => {
  if (newValue?.idMeal) {
    getMealsById(newValue.idMeal);
  }
});

watch(selectedMealType, (newValue) => {
  if (newValue?.strCategory) {
    getMealsByCategory(newValue.strCategory);
    selectedMeal.value = null;
  }
});
</script>
