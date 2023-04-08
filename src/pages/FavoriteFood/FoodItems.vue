<template>
  <div class="aspect-square" v-for="(item, index) in foodItems" :key="index">
    <img
      v-lazy="item.recipe.image"
      class="w-32 aspect-square rounded-full object-center m-auto z-[1]"
      alt=""
    />
    <div class="border rounded-3xl -mt-14 pt-16 pb-4 px-5">
      <h3 class="font-semibold line-clamp-1">{{ item.recipe.label }}</h3>
      <p
        class="inline mr-1.5 text-gray-500"
        v-for="(item, index) in item.recipe.dietLabels"
        :key="item"
      >
        {{ item }}
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
const props = defineProps({
  foodItems: [Array, Object],
});
</script>
