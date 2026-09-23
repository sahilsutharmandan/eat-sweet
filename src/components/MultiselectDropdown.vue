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

const props = defineProps({
  modelValue: {
    type: Object,
    default: undefined,
  },
});
const emit = defineEmits(["update:modelValue", "change"]);

const store = useStore();
const internalValue = ref(null);
const value = computed({
  get: () => (props.modelValue !== undefined ? props.modelValue : internalValue.value),
  set: (val) => {
    internalValue.value = val;
    emit("update:modelValue", val);
    emit("change", val);
  },
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
