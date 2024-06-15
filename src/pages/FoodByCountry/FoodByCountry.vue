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
import Indian from "@/assets/images/india.png";
import Russian from "@/assets/images/russia.png";
import Chinese from "@/assets/images/china.png";
import American from "@/assets/images/abc.png";
import Italian from "@/assets/images/italy.png";
import Japanese from "@/assets/images/japan.png";
import Canadian from "@/assets/images/canada.png";
const category = ref([
  { label: "Indian", src: Indian, active: true },
  { label: "Russian", src: Russian, active: false },
  { label: "Chinese", src: Chinese, active: false },
  { label: "American", src: American, active: false },
  { label: "Italian", src: Italian, active: false },
  { label: "Japanese", src: Japanese, active: false },
  { label: "Canadian", src: Canadian, active: false },
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
