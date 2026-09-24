<template>
  <div>
    <p v-if="query" role="status" class="text-sm text-gray-500 mb-2">{{ filteredRecipes.length }} matching recipes</p>
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
            class="character-label-icon w-8 aspect-square shrink-0"
            :src="value.recipe.image"
          />
          <span class="line-clamp-1">
            {{ value.recipe.label }}
          </span>
        </div>
        <span v-else>{{ placeholder }}</span>
      </template>

      <template v-slot:option="{ option }">
        <div class="flex gap-3 items-center">
          <img
            alt=""
            class="character-option-icon w-8 aspect-square shrink-0"
            :src="option.recipe.image"
          />
          <span class="line-clamp-2">
            {{ option.recipe.label }}
          </span>
        </div>
      </template>
    </ThemedDropdown>
  </div>
</template>
<script setup>
import { matchesSearch } from '@/composables/usePageFilter';
import { ref, computed, onMounted } from "vue";
import ThemedDropdown from "./ThemedDropdown.vue";
import { useStore } from "vuex";

const store = useStore();
const props = defineProps({ query: { type: String, default: '' }, modelValue: { type: Object, default: null } });
const filteredRecipes = computed(() => (getRecipes.value?.data?.hits || []).filter(item => matchesSearch(item.recipe, props.query)));
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
onMounted(() => {
  // getRecipes;
  getRecipe(FoodCategories.value);
});
</script>
