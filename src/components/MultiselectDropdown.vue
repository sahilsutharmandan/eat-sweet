<template>
  <div>
    <ThemedDropdown
      v-model="value"
      :options="getRecipes?.data?.hits"
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
import { ref, computed, onMounted } from "vue";
import ThemedDropdown from "./ThemedDropdown.vue";
import { useStore } from "vuex";

const store = useStore();
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
onMounted(() => {
  // getRecipes;
  getRecipe(FoodCategories.value);
});
</script>
