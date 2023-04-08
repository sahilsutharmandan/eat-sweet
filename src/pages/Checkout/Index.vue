<template>
  <FullPageLayout>
    <div class="grid grid-cols-4 gap-4">
      <div
        v-for="(item, index) in getRecipes?.data?.hits.slice(0, 1)"
        :key="index"
      >
        <div>
          <!-- <img :src="item.recipe.image" alt="" /> -->
          {{ item }}
        </div>
      </div>
    </div>
  </FullPageLayout>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const getRecipe = () => {
  store.dispatch("FoodRecipeModule/getRecipe");
};
const getRecipes = computed(() => {
  return store.getters["FoodRecipeModule/getRecipe"];
});
onMounted(() => {
  getRecipe();
});
</script>
