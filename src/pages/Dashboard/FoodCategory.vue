<template>
  <div class="grid grid-cols-3 md:grid-cols-7 gap-4">
    <div
      class="p-5 rounded-3xl hover:bg-white box-shadow duration-200 ease-linear"
      :class="item.active ? 'shadows bg-white' : 'bg-green-50'"
      v-for="(item, index) in category"
      :key="index"
    >
      <img class="w-14 m-auto" :src="item.src" alt="" />
      <p class="mt-2 text-center">{{ item.label }}</p>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
const category = ref([
  { label: "All Food", src: "src/images/all.png", active: true },
  { label: "Burgers", src: "src/images/burger.png", active: false },
  { label: "Pizza", src: "src/images/pizza.png", active: false },
  { label: "Fruits", src: "src/images/fruits.png", active: false },
  { label: "Cakes", src: "src/images/cupcake.png", active: false },
  { label: "IceCreams", src: "src/images/icecream.png", active: false },
  { label: "Drinks", src: "src/images/drinks.png", active: false },
]);
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
