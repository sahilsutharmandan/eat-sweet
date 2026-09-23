<template>
  <div class="p-6 w-32 hidden md:flex flex-col justify-between items-center h-full shrink-0">
    <div class="flex flex-col items-center">
      <h1 class="italic antialiased tracking-wide mb-8">
        <span class="text-gray-800 font-bold">eat</span>
        <span class="text-green-800 font-bold">sweet</span>
        <i class="fi fi-rr-leaf text-xs ml-0.5 text-green-800"></i>
      </h1>
      <ul class="m-2" v-for="(item, index) in navigation" :key="index">
        <router-link :to="item.url">
          <li
            class="px-2.5 py-2 inline-block cursor-pointer rounded-lg delay-75 duration-150 linear"
            :class="
              route.path === item.url
                ? 'bg-green-900/15 text-green-900 font-bold'
                : 'text-gray-800 hover:text-green-900 hover:bg-green-900/10'
            "
          >
            <i class="fi text-lg" :class="item.icon"></i>
          </li>
        </router-link>
      </ul>
    </div>
    <div class="pb-2">
      <i
        class="fi fi-rr-sign-out-alt px-2 py-2 rounded-xl text-gray-800 hover:text-green-900 text-lg cursor-pointer"
      ></i>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const navigation = ref([
  {
    name: "Dashboard",
    icon: "fi-sr-home",
    url: "/",
  },
  {
    name: "Country",
    icon: "fi fi-rr-flag",
    url: "/by-country",
  },
  {
    name: "Recipe",
    icon: "fi fi-sr-restaurant",
    url: "/recipe",
  },
  {
    name: "Products",
    icon: "fi fi-sr-hamburger-soda",
    url: "/products",
  },
  {
    name: "Favorite",
    icon: "fi-sr-heart ",
    url: "/favorite",
  },

  {
    name: "Checkout",
    icon: "fi-sr-sack-dollar",
    url: "/checkout",
  },
  // { name: "Chat", icon: "fi-ss-comments", url: "", active: false },
  // { name: "Shop", icon: "fi-ss-shop", url: "", active: false },
  // { name: "Setting", icon: "fi-sr-settings", url: "", active: false },
]);
</script>
