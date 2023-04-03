<template>
  <div class="space-y-3">
    <header class="flex justify-between">
      <h1 class="text-2xl font-bold">
        Welcome to <br />
        Eatland &#128523
      </h1>
      <div>
        <div class=" rounded-xl bg-green-100 pr-3 flex items-center">
          <input type="text" class="bg-green-100 p-2.5 rounded-xl focus:border-none focus:outline-none">
          <i class="fi fi-rr-search mt-1.5"></i>
        </div>
      </div>
      <div>
        <div class="p-4 pb-3 rounded-xl bg-slate-700 text-white">
          <i class="fi fi-rr-shopping-cart"></i>
        </div>
      </div>
    </header>
    <main class="space-y-4">
      <div class="flex">
        <FoodCategory class="w-3/4" />
        <div class="w-1/4"></div>
      </div>
      <div class="flex">
        <div class="w-3/4">
          <nav class="flex justify-between  mt-1">
            <div class="flex items-center gap-2">

              <h2 class="text-xl font-semibold">All items</h2>
              <i class="fi fi-rr-settings-sliders mt-1.5"></i>
            </div>
            <div class="flex items-center gap-2">
              <span>See All</span>
              <i class="fi fi-ss-arrow-right mt-1.5"></i>
            </div>
          </nav>
          <div class="grid grid-cols-3 gap-4">
            <FoodItems/>
          </div>
        </div>
        <div class="w-1/4"></div>
      </div>
    </main>
  </div>
</template>
<script setup>
import FoodCategory from "./FoodCategory.vue";
import FoodItems from "./FoodItems.vue"
</script>
