<template>
  <div class="backdrop-blur-sm bg-white/20 shadow rounded-xl flex">
    <NavBar />
    <div
      class="bg-white flex-1 rounded-xl flex flex-col overflow-y-auto"
      style="height: calc(100vh - 50px)"
    >
      <!-- <header class="flex justify-between px-6 pt-6 sticky top-0 z-10 bg-white">
        <div class="w-3/4 flex justify-between">
          <h1 v-if="header" class="text-2xl font-bold hidden md:block">
            {{ header }}
          </h1>
          <h1 v-else class="text-2xl font-bold hidden md:block">
            Welcome to <br />
            Eatland &#128523
          </h1>
          <div class="hidden md:block">
            <div
              class="rounded-xl bg-green-50 border border-green-100 pr-3 flex items-center"
            >
              <input
                type="text"
                class="bg-transparent p-2.5 rounded-xl focus:border-none focus:outline-none"
              />
              <i class="fi fi-rr-search mt-1.5 text-green-800"></i>
            </div>
          </div>
        </div>
        <div>
          <div class="p-4 pb-3 rounded-xl bg-slate-700 text-white">
            <i class="fi fi-rr-shopping-cart"></i>
          </div>
        </div>
      </header> -->
      <HeaderNavbar />
      <div class="flex-1 p-6" :class="class">
        <slot></slot>
      </div>
      <!-- <MainBody /> -->
    </div>
  </div>
</template>
<script setup>
import NavBar from "./NavBar.vue";
const props = defineProps({
  class: String,
  header: String,
});
</script>
