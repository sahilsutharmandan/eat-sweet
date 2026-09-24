<template>
  <div class="backdrop-blur-sm bg-white/20 shadow flex">
    <NavBar />
    <div
      class="bg-white flex-1 min-w-0 rounded-xl flex flex-col overflow-y-auto"
      style="height: 100dvh"
    >
      <HeaderNavbar>
        <form
          @submit.prevent="$emit('search-recipe', searchQuery)"
          class="relative flex flex-1 items-center"
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
            class="block h-full w-full border-0 py-0 pl-8 pr-8 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm outline-none bg-transparent"
            :placeholder="placeholderText"
            type="search"
            name="search"
            v-model="searchQuery"
            autocomplete="off"
            @input="$emit('search-recipe', searchQuery)"
          />
          <!-- Clear search button -->
          <button
            v-if="searchQuery"
            type="button"
            @click="clearSearch"
            class="absolute right-2 p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
            title="Clear search"
          >
            <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </form>
      </HeaderNavbar>

      <div class="flex-1 p-6" :class="class">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from "vue";
import { useRoute } from "vue-router";
import NavBar from "./NavBar.vue";
import { MagnifyingGlassIcon } from "@heroicons/vue/20/solid";
import { useSearch } from "../composables/useSearch";

const props = defineProps({
  class: String,
  header: String,
  searchPanelVisible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["search-recipe"]);

const route = useRoute();
const { searchQuery, clearSearch } = useSearch();

// Reset search on route navigation so each page starts fresh
watch(
  () => route.path,
  () => {
    clearSearch();
  }
);

const placeholderText = computed(() => {
  if (route.path === "/favorite") return "Search favorite recipes...";
  if (route.path === "/products") return "Search meals & ingredients...";
  if (route.path === "/checkout") return "Search recipes or ingredients...";
  if (route.path === "/by-country") return "Search country recipes...";
  if (route.path.startsWith("/recipe")) return "Search ingredients or nutrients...";
  return "Search recipes, meals, ingredients...";
});
</script>
