<template>
  <FullPageLayout>
    <div class="space-y-3">
      <header class="flex justify-between">
        <div class="w-3/4 flex justify-between">
          <h1 class="text-2xl font-bold">
            Welcome to <br />
            Eatland &#128523
          </h1>
          <div>
            <div class="rounded-xl bg-green-50 border border-green-100 pr-3 flex items-center">
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
      </header>
      <main class="space-y-4">
        <div class="flex gap-4">
          <div class="w-3/4 space-y-4">
            <FoodCategory />
            <div>
              <nav class="flex justify-between mt-1">
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
                <FoodItems />
              </div>
            </div>
          </div>
          <div class="flex-1 border rounded-2xl p-4 space-y-3">
            <nav class="flex justify-between mt-1">
                <div class="flex items-center gap-2">
                  <h2 class="text-xl font-semibold">Favorite</h2>
                </div>
                
              </nav>
              <FavoriteFood/>
              <div class="flex justify-end">
                <div class="flex items-center gap-2">
                  <span>See All</span>
                  <i class="fi fi-ss-arrow-right mt-1.5"></i>
                </div>
              </div>
          </div>
        </div>
      </main>
    </div>
  </FullPageLayout>
  </template>
  <script setup>
  import FullPageLayout from "../../components/FullPageLayout.vue";
import FavoriteFood from "./FavoriteFood.vue";
  import FoodCategory from "./FoodCategory.vue";
  import FoodItems from "./FoodItems.vue";
  </script>
  