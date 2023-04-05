<template>
  <div
    class="flex items-center gap-2"
    v-for="(item, index) in indainMeals.slice(0, 5)"
    :key="index"
  >
    <div class="shrink-0">
      <img class="w-12 rounded-2xl" :src="item.strMealThumb" alt="" />
    </div>
    <div>
      <h3 class="text-sm font-semibold line-clamp-1">{{ item.strMeal }}</h3>
      <small class="line-clamp-2 text-gray-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda,
        saepe.
      </small>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
const country = "Indian";
const store = useStore();
const getIndianMeals = (country) => {
  store.dispatch("MealsModule/getIndianMeals", country);
};
const indainMeals = computed(() => {
  return store.getters["MealsModule/indainMeals"];
});
onMounted(() => {
  getIndianMeals(country);
});
// const favoriteFood = ref([
//   { name: "'Snacks 'Wanted", src: "/src/images/snacks.png", desc: "" },
//   { name: "'Burger 'Wanted", src: "/src/images/burger.png", desc: "" },
//   { name: "'Donut 'Wanted", src: "/src/images/donut.png", desc: "" },
//   { name: "'Vegetables 'Wanted", src: "/src/images/vegetable.png", desc: "" },
//   { name: "'Beverage 'Wanted", src: "/src/images/beverage.png", desc: "" },
// ]);
</script>
