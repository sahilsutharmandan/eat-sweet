<template>
  <div class="ingredient-card relative min-w-0" v-for="(item, index) in ingredients" :key="index">
    <img
      v-if="item.image"
      v-lazy="item.image"
      class="w-20 max-w-full aspect-square rounded-full object-center m-auto z-[1]"
      alt=""
    />
    <div
      v-else
      class="w-20 max-w-full aspect-square rounded-full bg-green-100 border border-green-200 flex items-center justify-center m-auto z-[1] text-green-700 font-semibold"
    >
      {{ item.food?.[0]?.toUpperCase() || '🥗' }}
    </div>
    <div class="ingredient-card-body border rounded-3xl -mt-10 pt-12 pb-4 px-3 sm:px-4 space-y-2">
      <h3 class="font-semibold line-clamp-1 text-center" :title="item.food">{{ item.food }}</h3>
      <div
        class="ingredient-nutrition py-1 text-gray-500 text-xs sm:text-sm"
      >
        <p class="flex gap-1 items-center">
          <span>QTY:</span>
          <span class="text-green-500 font-medium">{{ item.quantity }}</span>
        </p>
        <p class="flex gap-1 items-center truncate">
          <span class="text-green-500 font-medium">{{ item.weight ? item.weight.toFixed(1) : '' }}</span>
          <span class="truncate">{{ item.measure && item.measure !== "<unit>" ? item.measure : "gram" }}</span>
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
<style scoped>
.ingredient-card {
  container-type: inline-size;
}

.ingredient-card-body {
  overflow-wrap: anywhere;
}

.ingredient-nutrition {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.25rem 0.5rem;
}

.ingredient-nutrition p {
  min-width: 0;
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
}

@container (min-width: 12rem) {
  .ingredient-nutrition p + p {
    border-left: 1px solid #d1d5db;
    padding-left: 0.5rem;
  }
}
</style>
