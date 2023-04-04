<template>
  <div
    class="flex items-center gap-2"
    v-for="(item, index) in favoriteFood"
    :key="index"
  >
    <div class="shrink-0">
      <img class="w-12" :src="item.src" alt="" />
    </div>
    <div>
      <h3 class="text-sm font-semibold line-clamp-1">{{ item.name }}</h3>
      <small class="line-clamp-2 text-gray-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda,
        saepe.
      </small>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
const favoriteFood = ref([
  { name: "'Snacks 'Wanted", src: "/src/images/snacks.png", desc: "" },
  { name: "'Burger 'Wanted", src: "/src/images/burger.png", desc: "" },
  { name: "'Donut 'Wanted", src: "/src/images/donut.png", desc: "" },
  { name: "'Vegetables 'Wanted", src: "/src/images/vegetable.png", desc: "" },
  { name: "'Beverage 'Wanted", src: "/src/images/beverage.png", desc: "" },
]);
</script>
