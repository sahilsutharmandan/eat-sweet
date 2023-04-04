<template>
  <div class="backdrop-blur-sm bg-white/20 shadow rounded-xl flex">
    <NavBar />
    <div class="bg-white flex-1 rounded-xl p-6" :class="class">
      <slot></slot>
      <!-- <MainBody /> -->
    </div>
  </div>
</template>
<script setup>
import NavBar from "./NavBar.vue";
const props = defineProps({
  class: String,
});
</script>
