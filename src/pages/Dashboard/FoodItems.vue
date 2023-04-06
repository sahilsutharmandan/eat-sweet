<template>
  <div class="aspect-square" v-for="(item, index) in meals" :key="index">
    <img
      :src="item.strMealThumb"
      class="w-32 aspect-square rounded-full object-center m-auto z-[1]"
      alt=""
    />
    <div class="border rounded-3xl -mt-14 pt-16 pb-4 px-5">
      <h3 class="font-semibold">{{ item.strMeal }}</h3>
      <p class="line-clamp-3 text-gray-500">
        {{ item.strInstructions }}
      </p>
      <div class="flex justify-between items-center mt-2">
        <span class="font-bold">$23</span>
        <span class="mt-1.5 flex gap-2">
          <i class="fi fi-rs-heart"></i>
          <i class="fi fi-rr-shopping-cart"></i>
        </span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const getMeals = () => {
  store.dispatch("MealsModule/getMeals");
};
const meals = computed(() => {
  return store.getters["MealsModule/meals"];
});
onMounted(() => {
  getMeals();
});
// const meals = ref([
//   { label: "'Burger 'Wanted'", desc: "", src: "/src/images/burgers.png" },
//   { label: "'Pizza 'Wanted'", desc: "", src: "/src/images/pizzas.png" },
//   {
//     label: "'Watermelon 'Wanted'",
//     desc: "",
//     src: "/src/images/watermelon.png",
//   },
// ]);
</script>
