<template>
  <div class="grid grid-cols-3 md:grid-cols-7 gap-4">
    <div
      class="p-5 rounded-3xl hover:bg-white box-shadow duration-200 ease-linear"
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
const category = ref([
  { label: "Vegetarian", src: "src/assets/images/all.png" },
  { label: "Burgers", src: "src/assets/images/burger.png" },
  { label: "Pizza", src: "src/assets/images/pizza.png" },
  { label: "Fruits", src: "src/assets/images/fruits.png" },
  { label: "Cakes", src: "src/assets/images/cupcake.png" },
  { label: "IceCreams", src: "src/assets/images/icecream.png" },
  { label: "Drinks", src: "src/assets/images/drinks.png" },
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
