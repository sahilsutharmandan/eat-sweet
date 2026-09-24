<template>
  <div>
    <ThemedDropdown
      v-model="value"
      :options="filteredRecipes"
      optionLabel="recipe.label"
      dataKey="recipe.uri"
      placeholder="Select a Recipe"
      aria-label="Select a Recipe"
    >
      <template v-slot:value="{ value, placeholder }">
        <div v-if="value" class="flex gap-3 items-center">
          <img
            alt=""
            class="character-label-icon w-8 aspect-square rounded-full shrink-0 object-cover"
            :src="value.recipe.image"
          />
          <span class="line-clamp-1 font-medium text-sm">
            {{ value.recipe.label }}
          </span>
        </div>
        <span v-else class="text-sm text-gray-400">{{ placeholder }}</span>
      </template>

      <template v-slot:option="{ option }">
        <div class="flex gap-3 items-center py-0.5">
          <img
            alt=""
            class="character-option-icon w-8 aspect-square rounded-full shrink-0 object-cover"
            :src="option.recipe.image"
          />
          <span class="line-clamp-2 text-sm">
            {{ option.recipe.label }}
          </span>
        </div>
      </template>
    </ThemedDropdown>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import ThemedDropdown from "./ThemedDropdown.vue";
import { useStore } from "vuex";
import { useSearch } from "../composables/useSearch";

const store = useStore();
const { searchQuery } = useSearch();

const props = defineProps({ modelValue: { type: Object, default: null } });
const emit = defineEmits(["update:modelValue"]);
const value = computed({
  get: () => props.modelValue,
  set: (selection) => emit("update:modelValue", selection),
});

const FoodCategories = ref("Vegetarian");

const getRecipe = (category) => {
  store.dispatch("FoodRecipeModule/getRecipe", category);
};

const getRecipes = computed(() => {
  return store.getters["FoodRecipeModule/getRecipe"];
});

// Live filter options based on search query
const filteredRecipes = computed(() => {
  const hits = getRecipes.value?.data?.hits || [];
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return hits;
  return hits.filter((h) => (h.recipe?.label || "").toLowerCase().includes(q));
});

onMounted(() => {
  getRecipe(FoodCategories.value);
});
</script>
