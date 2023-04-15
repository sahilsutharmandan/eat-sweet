<template>
  <div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
    <div
      class="p-5 rounded-3xl hover:bg-white box-shadow duration-200 ease-linear"
      :class="mealIndex === index ? 'shadows bg-white' : 'bg-green-50'"
      v-for="(item, index) in category"
      :key="index"
      @click="$emit('get-food-by-country', item.label), itemIndex(index)"
    >
      <img class="w-14 m-auto" :src="item.src" alt="" />
      <p class="mt-2 text-center">{{ item.label }}</p>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
const category = ref([
  { label: "Indian", src: "/src/images/india.png", active: true },
  { label: "Russian", src: "/src/images/russia.png", active: false },
  { label: "Chinese", src: "/src/images/china.png", active: false },
  { label: "American", src: "/src/images/abc.png", active: false },
  { label: "Italian", src: "/src/images/italy.png", active: false },
  { label: "Japanese", src: "/src/images/japan.png", active: false },
  { label: "Canadian", src: "/src/images/canada.png", active: false },
]);
const mealIndex = ref(0);
const itemIndex = (index) => {
  mealIndex.value = index;
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
