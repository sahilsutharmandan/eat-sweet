<template>
  <FoodItem :foodItems="foodItems" />
</template>

<script setup>
import FoodItem from "../../components/FoodItem.vue";

const props = defineProps({
  foodItems: [Array, Object],
});
</script>
