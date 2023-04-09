<template>
  <div class="backdrop-blur-sm bg-white/20 shadow rounded-xl flex">
    <NavBar />
    <div
      class="bg-white flex-1 rounded-xl flex flex-col overflow-y-auto"
      style="height: calc(100vh - 50px)"
    >
      <HeaderNavbar>
        <form
          @submit.prevent="
            $emit('search-recipe', searchFoodRecipe),
              (isSearchPanelVisible = true)
          "
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
          />
          <div
            class="absolute bg-white border border-t-0 rounded-b-lg px-2 py-1 w-96 top-16 max-h-[300px] overflow-y-auto"
            :class="
              isSearchPanelVisible &&
              searchFoodRecipe !== '' &&
              searchPanelVisible
                ? 'block'
                : 'hidden'
            "
          >
            <router-link
              to="/recipe-details"
              @click="
                getRecipeDetails(item.recipe), (isSearchPanelVisible = false)
              "
              v-for="item in getRecipes?.data?.hits"
              :key="item"
              class="flex gap-2 items-center hover:bg-gray-100 p-2 rounded-md"
            >
              <img v-lazy="item.recipe.image" class="w-7 shrink-0" alt="" />
              <span class="flex-1 line-clamp-1">{{ item.recipe.label }}</span>
            </router-link>
          </div>
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
import { ref, computed } from "vue";
import NavBar from "./NavBar.vue";
import { MagnifyingGlassIcon } from "@heroicons/vue/20/solid";
import { useStore } from "vuex";
const props = defineProps({
  class: String,
  header: String,
  searchPanelVisible: {
    type: Boolean,
    default: false,
  },
});
const isSearchPanelVisible = ref(false);
const store = useStore();
const searchFoodRecipe = ref();
const getRecipes = computed(() => {
  return store.getters["FoodRecipeModule/getRecipe"];
});
const getRecipeDetails = (recipe) => {
  store.dispatch("FoodRecipeModule/getRecipeDetails", recipe);
};
</script>
