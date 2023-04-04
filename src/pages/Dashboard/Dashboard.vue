<template>
  <FullPageLayout>
    <div class="space-y-3">
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
            <FavoriteFood />
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
