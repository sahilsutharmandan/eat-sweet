<template>
  <div class="p-6 w-32 flex items-center flex-col">
    <h1 class="italic antialiased tracking-wide mb-8">
      <span class="text-gray-800 font-bold">eat</span>
      <span class="text-green-800 font-bold">dish</span>
      <i class="fi fi-rr-leaf text-xs ml-0.5 text-green-800"></i>
    </h1>
    <ul class="m-2" v-for="(item, index) in navigation" :key="index">
      <li
        class="px-2.5 py-2 inline-block cursor-pointer rounded-lg delay-75 duration-150 linear"
        :class="
          item.active
            ? 'bg-green-900/10 text-green-900  '
            : 'text-green-900/60 hover:bg-green-900/10 '
        "
      >
        <i class="fi" :class="item.icon"></i>
      </li>
    </ul>
    <i
      class="fi fi-rr-sign-out-alt px-2 py-2 rounded-xl mt-16 text-green-900"
    ></i>
  </div>
</template>
<script setup>
import { ref } from "vue";
const navigation = ref([
  { name: "Dashboard", icon: "fi-sr-home", url: "", active: true },
  { name: "Wish", icon: "fi-sr-heart", url: "", active: false },
  { name: "Checkout", icon: "fi-sr-sack-dollar", url: "", active: false },
  { name: "Gift", icon: "fi-sr-gift", url: "", active: false },
  { name: "Chat", icon: "fi-ss-comments", url: "", active: false },
  { name: "Shop", icon: "fi-ss-shop", url: "", active: false },
  { name: "Setting", icon: "fi-sr-settings", url: "", active: false },
]);
</script>
