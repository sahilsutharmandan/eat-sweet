<template>
  <div class="backdrop-blur-sm bg-white/20 shadow rounded-xl flex">
    <NavBar />
    <div
      class="bg-white flex-1 rounded-xl flex flex-col overflow-y-auto"
      style="height: calc(100vh - 50px)"
    >
      <HeaderNavbar>
        <form
          @submit.prevent="$emit('search-recipe', searchFoodRecipe)"
          class="relative flex flex-1"
          action="#"
          method="GET"
        >
          <label for="search-field" class="sr-only">Search</label>
          <MagnifyingGlassIcon
            class="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
            aria-hidden="true"
          />
          <input
            id="search-field"
            class="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm outline-none"
            placeholder="Search..."
            type="search"
            name="search"
            v-model="searchFoodRecipe"
          /></form
      ></HeaderNavbar>
      <div class="flex-1 p-6" :class="class">
        <slot></slot>
      </div>
      <!-- <MainBody /> -->
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import NavBar from "./NavBar.vue";
import { MagnifyingGlassIcon } from "@heroicons/vue/20/solid";
const props = defineProps({
  class: String,
  header: String,
});
const searchFoodRecipe = ref();
</script>
