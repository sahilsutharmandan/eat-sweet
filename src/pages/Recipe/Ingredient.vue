<template>
  <div v-for="(item, index) in ingredients" :key="index" class="min-w-0">
    <div class="relative z-10 mx-auto w-20 aspect-square">
      <img
        :src="item.image"
        class="w-full h-full aspect-square rounded-full object-cover object-center shadow-sm ring-2 ring-white bg-gray-50"
        :alt="item.food"
        loading="lazy"
      />
    </div>
    <div class="border border-gray-100 bg-white rounded-3xl -mt-10 pt-12 pb-4 px-4 space-y-2 shadow-xs">
      <h3 class="font-bold text-gray-900 line-clamp-1 text-center text-sm" :title="item.food">
        {{ item.food }}
      </h3>
      <div
        class="flex justify-between items-center py-1 text-gray-500 text-xs border-t border-gray-100/80 pt-2"
      >
        <p class="flex gap-1 items-center">
          <span class="text-[10px] text-gray-400 font-semibold uppercase">Qty:</span>
          <span class="font-bold text-emerald-700">{{ item.quantity }}</span>
        </p>
        <span class="text-gray-200">|</span>
        <p class="flex gap-1 items-center line-clamp-1">
          <span class="font-bold text-emerald-700">{{ item.weight ? item.weight.toFixed(1) : 0 }}</span>
          <span class="text-[10px] text-gray-400 font-semibold uppercase truncate">
            {{ item.measure && item.measure !== "<unit>" ? item.measure : "g" }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  ingredients: [Array, Object],
});
</script>
