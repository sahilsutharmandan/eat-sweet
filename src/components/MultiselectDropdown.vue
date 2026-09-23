<template>
  <div>
    <Multiselect
      v-model="value"
      :options="recipeOptions"
      :object="true"
      valueProp="value"
      label="label"
      trackBy="label"
      placeholder="Select a Recipe"
    >
      <template v-slot:singlelabel="{ value }">
        <div class="flex gap-3 items-center">
          <img
            class="character-label-icon w-8 aspect-square"
            v-lazy="value.recipe.image"
          />
          <span class="line-clamp-1">
            {{ value.recipe.label }}
          </span>
        </div>
      </template>

      <template v-slot:option="{ option }">
        <div class="flex gap-3 items-center">
          <img
            class="character-option-icon w-8 aspect-square"
            v-lazy="option.recipe.image"
          />
          <span class="line-clamp-2">
            {{ option.recipe.label }}
          </span>
        </div>
      </template>
    </Multiselect>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/tailwind.css";
import { useStore } from "vuex";

const store = useStore();
const value = ref(null);
const FoodCategories = ref("Vegetarian");
const getRecipe = (category) => {
  store.dispatch("FoodRecipeModule/getRecipe", category);
};
const getRecipes = computed(() => {
  return store.getters["FoodRecipeModule/getRecipe"];
});
const recipeOptions = computed(() => {
  const hits = getRecipes.value?.data?.hits || [];
  return hits.map((hit, index) => ({
    ...hit,
    value: hit.recipe.uri || `${hit.recipe.label}_${index}`,
    label: hit.recipe.label,
  }));
});
onMounted(() => {
  // getRecipes;
  getRecipe(FoodCategories.value);
});
</script>
