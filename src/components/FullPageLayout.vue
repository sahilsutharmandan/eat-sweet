<template>
  <div class="backdrop-blur-sm bg-white/20 shadow flex">
    <NavBar />
    <div
      class="bg-white flex-1 min-w-0 rounded-xl flex flex-col overflow-y-auto"
      style="height: 100dvh"
    >
      <HeaderNavbar>
        <form @submit.prevent class="relative flex flex-1 min-w-0" role="search">
          <label for="search-field" class="sr-only">Filter this page</label>
          <MagnifyingGlassIcon class="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400" aria-hidden="true" />
          <input id="search-field" class="block h-full w-full min-w-0 border-0 pl-8 text-gray-900 outline-none focus:ring-2 focus:ring-inset focus:ring-green-700" placeholder="Filter this page…" type="search" v-model="query" @input="$emit('search-recipe', query)" />
        </form></HeaderNavbar
      >
      <div class="flex-1 p-6" :class="class">
        <slot></slot>
      </div>
      <!-- <MainBody /> -->
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import NavBar from './NavBar.vue';
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid';
defineProps({ class: String });
defineEmits(['search-recipe']);
const query = ref('');
</script>
