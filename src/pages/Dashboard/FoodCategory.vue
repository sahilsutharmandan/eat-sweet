<template>
  <div class="grid grid-cols-3 md:grid-cols-7 gap-4">
    <div
      class="p-5 rounded-3xl hover:bg-white box-shadow duration-200 ease-linear relative"
      :class="index === categoryIndx ? 'shadows bg-white' : 'bg-green-50'"
      v-for="(item, index) in category"
      :key="index"
      @click="$emit('food-category', item.label), categoryIndex(index)"
    >
      <img class="w-14 m-auto" :src="item.src" alt="" />
      <p class="mt-2 text-center line-clamp-1">{{ item.label }}</p>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import allImg from "@/assets/images/all.png";
import burgerImg from "@/assets/images/burger.png";
import pizzaImg from "@/assets/images/pizza.png";
import fruitsImg from "@/assets/images/fruits.png";
import cupcakeImg from "@/assets/images/cupcake.png";
import icecreamImg from "@/assets/images/icecream.png";
import drinksImg from "@/assets/images/drinks.png";
const category = ref([
  { label: "Vegetarian", src: allImg },
  { label: "Burgers", src: burgerImg },
  { label: "Pizza", src: pizzaImg },
  { label: "Fruits", src: fruitsImg },
  { label: "Cakes", src: cupcakeImg },
  { label: "IceCreams", src: icecreamImg },
  { label: "Drinks", src: drinksImg },
]);
const categoryIndx = ref(0);
const categoryIndex = (index) => {
  categoryIndx.value = index;
};
</script>
<style scoped>
.shadows {
  box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em,
    rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
}
.box-shadow:hover {
  box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em,
    rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
}
</style>
