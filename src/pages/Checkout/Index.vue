<template>
  <FullPageLayout>
    <div class="flex flex-col min-h-full">
      <!-- Top Toolbar with Recipe Selector -->
      <div class="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-100">
        <div class="flex items-center gap-3">
          <MultiselectDropdown v-model="selectedItem" class="w-72 sm:w-80" />
          <button
            v-if="recipe"
            @click="selectedItem = null"
            class="text-sm font-medium text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5"
            title="Clear recipe selection"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear Selection
          </button>
        </div>
        <div v-if="recipe" class="hidden sm:flex items-center gap-2">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Checkout Order Preview
          </span>
        </div>
      </div>

      <!-- Empty State: Centered Coming Soon with Improved Copy -->
      <div v-if="!recipe" class="flex-1 flex flex-col items-center justify-center text-center py-16 px-4">
        <div class="max-w-xl mx-auto space-y-5">
          <img
            class="w-44 sm:w-52 mx-auto object-contain drop-shadow-sm"
            :src="chefImage"
            alt="Chef preparing fresh recipe"
          />
          <div class="space-y-2">
            <h1 class="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Ordering &amp; Checkout Coming Soon
            </h1>
            <p class="text-gray-600 text-base sm:text-lg leading-relaxed max-w-lg mx-auto">
              We're crafting a seamless online ordering experience for EatSweet. Soon, you'll be able to order fresh ingredient kits and chef-prepared meals for your favorite recipes directly to your doorstep.
            </p>
          </div>
          <div class="pt-2">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-medium">
              <svg class="w-4 h-4 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Select any recipe from the dropdown above to preview its ingredients and nutrition
            </div>
          </div>
        </div>
      </div>

      <!-- Selected Recipe State: Dedicated Checkout UI/UX -->
      <div v-else class="py-5">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <!-- Main Content Column: Recipe Showcase & Details -->
          <div class="md:col-span-7 lg:col-span-8 space-y-5">
            <!-- Hero Recipe Overview Card -->
            <div class="bg-white rounded-2xl border border-emerald-100/90 shadow-sm p-5 overflow-hidden">
              <div class="flex flex-col sm:flex-row gap-5">
                <!-- Recipe Image Thumbnail -->
                <div class="sm:w-52 sm:h-48 w-full h-52 shrink-0 rounded-xl overflow-hidden bg-emerald-50 border border-emerald-100 relative shadow-sm">
                  <img
                    v-if="recipe.image && !imageFailed"
                    :src="recipe.image"
                    :alt="recipe.label"
                    class="w-full h-full object-cover"
                    @error="imageFailed = true"
                  />
                  <div v-else class="w-full h-full flex items-center justify-center text-emerald-700 bg-emerald-50 text-xs">
                    Image preview
                  </div>
                </div>

                <!-- Recipe Header Details -->
                <div class="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <!-- Category & Cuisine Badges -->
                    <div class="flex flex-wrap gap-1.5 mb-2">
                      <span
                        v-for="tag in tags.slice(0, 3)"
                        :key="tag"
                        class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200"
                      >
                        {{ tag }}
                      </span>
                    </div>

                    <!-- Recipe Title -->
                    <h1 class="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
                      {{ recipe.label }}
                    </h1>

                    <!-- Source Attribution -->
                    <p v-if="recipe.source" class="text-xs text-gray-500 mt-1">
                      Curated recipe from <span class="font-medium text-emerald-700">{{ recipe.source }}</span>
                    </p>
                  </div>

                  <!-- Quick Stat Metric Pills -->
                  <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 sm:pt-2 border-t border-emerald-50 mt-3">
                    <div class="bg-emerald-50/60 rounded-lg p-2 text-center border border-emerald-100/60">
                      <span class="block text-[10px] font-semibold text-emerald-800 uppercase">Calories</span>
                      <span class="text-sm sm:text-base font-bold text-gray-900">
                        {{ caloriesPerServing || '—' }}
                      </span>
                      <span class="block text-[9px] text-gray-500">kcal/serv</span>
                    </div>

                    <div class="bg-emerald-50/60 rounded-lg p-2 text-center border border-emerald-100/60">
                      <span class="block text-[10px] font-semibold text-emerald-800 uppercase">Prep</span>
                      <span class="text-sm sm:text-base font-bold text-gray-900">
                        {{ recipe.totalTime > 0 ? recipe.totalTime + 'm' : '25m' }}
                      </span>
                      <span class="block text-[9px] text-gray-500">time</span>
                    </div>

                    <div class="bg-emerald-50/60 rounded-lg p-2 text-center border border-emerald-100/60">
                      <span class="block text-[10px] font-semibold text-emerald-800 uppercase">Yield</span>
                      <span class="text-sm sm:text-base font-bold text-gray-900">
                        {{ servings }}
                      </span>
                      <span class="block text-[9px] text-gray-500">portions</span>
                    </div>

                    <div class="bg-emerald-50/60 rounded-lg p-2 text-center border border-emerald-100/60">
                      <span class="block text-[10px] font-semibold text-emerald-800 uppercase">Diet</span>
                      <span class="text-sm sm:text-base font-bold text-gray-900 truncate block">
                        {{ recipe.dietLabels?.[0] || 'Balanced' }}
                      </span>
                      <span class="block text-[9px] text-gray-500">fit</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Dietary & Health Attributes Card -->
            <div class="bg-white rounded-2xl border border-emerald-100/90 p-5 shadow-sm space-y-3.5">
              <div class="flex items-center justify-between">
                <h2 class="text-base font-bold text-gray-900 flex items-center gap-2">
                  <span class="w-2 h-4 rounded-full bg-emerald-500 inline-block"></span>
                  Dietary &amp; Health Highlights
                </h2>
                <span class="text-xs text-emerald-700 font-medium bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {{ (recipe.healthLabels?.length || 0) + (recipe.dietLabels?.length || 0) }} tags
                </span>
              </div>

              <!-- Diet Labels -->
              <div v-if="recipe.dietLabels?.length" class="space-y-1">
                <span class="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block">Dietary Profile</span>
                <div class="flex flex-wrap gap-1.5">
                  <span
                    v-for="diet in recipe.dietLabels"
                    :key="diet"
                    class="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200"
                  >
                    ✓ {{ diet }}
                  </span>
                </div>
              </div>

              <!-- Health Labels -->
              <div v-if="recipe.healthLabels?.length" class="space-y-1">
                <span class="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block">Health &amp; Lifestyle Badges</span>
                <div class="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pt-0.5">
                  <span
                    v-for="health in recipe.healthLabels"
                    :key="health"
                    class="px-2 py-0.5 rounded-md text-xs font-medium bg-gray-50 text-gray-700 border border-gray-200 hover:border-emerald-300 transition-colors"
                  >
                    {{ health }}
                  </span>
                </div>
              </div>

              <!-- Cautions / Allergens -->
              <div v-if="recipe.cautions?.length" class="pt-1">
                <div class="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 flex items-start gap-2 text-xs">
                  <svg class="w-4 h-4 text-amber-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <span class="font-semibold">Allergen Notice:</span> Contains {{ recipe.cautions.join(', ') }}.
                  </div>
                </div>
              </div>
            </div>

            <!-- Fresh Ingredients Kit Checklist -->
            <div class="bg-white rounded-2xl border border-emerald-100/90 p-5 shadow-sm space-y-3.5">
              <div class="flex items-center justify-between">
                <div>
                  <h2 class="text-base font-bold text-gray-900 flex items-center gap-2">
                    <span class="w-2 h-4 rounded-full bg-emerald-500 inline-block"></span>
                    Meal Kit Ingredients Checklist
                  </h2>
                  <p class="text-xs text-gray-500 mt-0.5">
                    Pre-measured fresh portions for {{ servings }} {{ servings === 1 ? 'serving' : 'servings' }}
                  </p>
                </div>
                <span class="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  {{ formattedIngredients.length }} items
                </span>
              </div>

              <!-- Itemized Ingredients Grid -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <div
                  v-for="(ing, idx) in formattedIngredients"
                  :key="idx"
                  class="flex items-center gap-3 p-2.5 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-emerald-50/40 hover:border-emerald-200 transition-all"
                >
                  <div class="w-10 h-10 rounded-lg bg-emerald-100/50 overflow-hidden shrink-0 flex items-center justify-center border border-emerald-200/50">
                    <img
                      v-if="ing.image"
                      :src="ing.image"
                      :alt="ing.food"
                      class="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <span v-else class="text-base">🌿</span>
                  </div>
                  <div class="min-w-0 flex-1">
                    <h3 class="text-xs sm:text-sm font-semibold text-gray-800 capitalize truncate">
                      {{ ing.food || ing.text }}
                    </h3>
                    <p class="text-[11px] text-gray-500 truncate mt-0.5">
                      {{ ing.measure ? `${ing.quantity || ''} ${ing.measure}` : (ing.text || 'Measured portion') }}
                      <span v-if="ing.weight" class="text-gray-400"> · {{ Math.round(ing.weight) }}g</span>
                    </p>
                  </div>
                  <div class="shrink-0 text-emerald-600">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Checkout & Order Summary Sidebar -->
          <div class="md:col-span-5 lg:col-span-4 space-y-5">
            <div class="bg-white rounded-2xl border border-emerald-200/90 p-5 shadow-sm sticky top-6 space-y-4">
              <!-- Summary Header -->
              <div class="flex items-center justify-between pb-3.5 border-b border-gray-100">
                <div class="flex items-center gap-2">
                  <div class="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <h2 class="text-base font-bold text-gray-900">Order Summary</h2>
                </div>
                <span class="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Preview
                </span>
              </div>

              <!-- Selected Item Mini Card -->
              <div class="flex items-center gap-3 p-2.5 rounded-xl bg-emerald-50/50 border border-emerald-100">
                <img
                  v-if="recipe.image && !imageFailed"
                  :src="recipe.image"
                  :alt="recipe.label"
                  class="w-12 h-12 rounded-lg object-cover shrink-0 border border-emerald-200"
                />
                <div class="min-w-0 flex-1">
                  <h3 class="text-xs sm:text-sm font-bold text-gray-900 line-clamp-1">
                    {{ recipe.label }}
                  </h3>
                  <p class="text-[11px] text-emerald-700 font-medium mt-0.5">
                    {{ servings }} {{ servings === 1 ? 'portion' : 'portions' }} · {{ caloriesPerServing }} kcal/ea
                  </p>
                </div>
              </div>

              <!-- Kit Inclusions Checklist -->
              <div class="space-y-2 pt-1">
                <span class="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block">Kit Inclusions</span>
                <ul class="space-y-1.5 text-xs text-gray-600">
                  <li class="flex items-center gap-2">
                    <span class="w-3.5 h-3.5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[9px] font-bold">✓</span>
                    <span>All {{ formattedIngredients.length }} pre-measured recipe ingredients</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="w-3.5 h-3.5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[9px] font-bold">✓</span>
                    <span>Step-by-step chef cooking guide</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="w-3.5 h-3.5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[9px] font-bold">✓</span>
                    <span>Eco-friendly insulated thermal kit</span>
                  </li>
                </ul>
              </div>

              <!-- Macro Nutritional Breakdown -->
              <div v-if="keyNutrients.length" class="pt-3 border-t border-gray-100 space-y-2">
                <span class="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block">Nutrition per Serving</span>
                <div class="grid grid-cols-2 gap-2">
                  <div
                    v-for="nut in keyNutrients"
                    :key="nut.label"
                    class="p-2 rounded-lg bg-gray-50 border border-gray-100 text-center"
                  >
                    <span class="text-[10px] text-gray-500 block">{{ nut.label }}</span>
                    <span class="text-xs sm:text-sm font-bold text-gray-800 block">
                      {{ nut.qty }} {{ nut.unit }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Pricing & Checkout CTA -->
              <div class="pt-3 border-t border-gray-100 space-y-2.5">
                <div class="p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-center space-y-1">
                  <div class="flex items-center justify-between text-xs text-gray-600">
                    <span>Recipe Kit Preview</span>
                    <span class="font-semibold text-emerald-700">Free Preview</span>
                  </div>
                  <div class="flex items-center justify-between text-xs text-gray-600">
                    <span>Delivery Fee</span>
                    <span class="font-semibold text-gray-500">Coming Soon</span>
                  </div>
                </div>

                <button
                  type="button"
                  disabled
                  class="w-full py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm text-white bg-emerald-600 hover:bg-emerald-700 transition shadow-sm flex items-center justify-center gap-2 cursor-not-allowed opacity-90"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Place Order (Coming Soon)
                </button>

                <p class="text-[10px] text-center text-gray-500 leading-tight">
                  Online ordering and ingredient kit dispatch is currently in preview mode. Live checkout will be available shortly!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </FullPageLayout>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import FullPageLayout from "../../components/FullPageLayout.vue";
import MultiselectDropdown from "../../components/MultiselectDropdown.vue";
import chefImage from "../../images/chef.png";

const selectedItem = ref(null);
const imageFailed = ref(false);

const recipe = computed(() => selectedItem.value?.recipe || null);

watch(recipe, () => {
  imageFailed.value = false;
});

const servings = computed(() => {
  const y = Number(recipe.value?.yield);
  return y > 0 ? y : 1;
});

const caloriesPerServing = computed(() => {
  if (!recipe.value?.calories) return null;
  return Math.round(recipe.value.calories / servings.value);
});

const tags = computed(() => {
  const list = [];
  if (recipe.value?.cuisineType?.length) list.push(...recipe.value.cuisineType);
  if (recipe.value?.mealType?.length) list.push(...recipe.value.mealType);
  if (recipe.value?.dishType?.length) list.push(...recipe.value.dishType);
  return list.map((t) => t.charAt(0).toUpperCase() + t.slice(1));
});

const formattedIngredients = computed(() => {
  if (Array.isArray(recipe.value?.ingredients) && recipe.value.ingredients.length > 0) {
    return recipe.value.ingredients.map((item) => ({
      food: item.food || item.text,
      text: item.text,
      quantity: item.quantity ? Math.round(item.quantity * 10) / 10 : "",
      measure: item.measure && item.measure !== "<unit>" ? item.measure : "",
      weight: item.weight,
      image: item.image,
    }));
  }
  if (Array.isArray(recipe.value?.ingredientLines)) {
    return recipe.value.ingredientLines.map((line) => ({
      food: line,
      text: line,
      quantity: "",
      measure: "",
      weight: 0,
      image: null,
    }));
  }
  return [];
});

const keyNutrients = computed(() => {
  if (!recipe.value?.totalNutrients) return [];
  const tn = recipe.value.totalNutrients;
  const items = [];
  if (tn.PROCNT) items.push({ label: "Protein", qty: Math.round(tn.PROCNT.quantity / servings.value), unit: tn.PROCNT.unit });
  if (tn.CHOCDF) items.push({ label: "Carbs", qty: Math.round(tn.CHOCDF.quantity / servings.value), unit: tn.CHOCDF.unit });
  if (tn.FAT) items.push({ label: "Fat", qty: Math.round(tn.FAT.quantity / servings.value), unit: tn.FAT.unit });
  if (tn.FIBTG) items.push({ label: "Fiber", qty: Math.round(tn.FIBTG.quantity / servings.value), unit: tn.FIBTG.unit });
  return items;
});
</script>
