<template>
  <div class="aspect-square" v-for="(item, index) in ingredients" :key="index">
    <img
      v-lazy="item.image"
      class="w-20 aspect-square rounded-full object-center m-auto z-[1]"
      alt=""
    />
    <div class="border rounded-3xl -mt-10 pt-12 pb-4 px-4 space-y-2">
      <h3 class="font-semibold line-clamp-1 text-center">{{ item.food }}</h3>
      <div
        class="flex justify-between border- py-1 border-green-100 text-gray-500 text-sm"
      >
        <p class="flex gap-1 items-center">
          <span>QTY:</span>
          <span class="text-green-500 pr-1">{{ item.quantity }}</span>
        </p>
        |
        <p class="flex gap-1 items-center line-clamp-1">
          <span class="text-green-500 ">{{ item.weight.toFixed(1) }}</span
          ><span>{{ item.measure && item.measure !== "<unit>" ? item.measure : "gram" }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch, computed } from "vue";
import { useStore } from "vuex";
const props = defineProps({
  ingredients: [Array, Object],
});
</script>
