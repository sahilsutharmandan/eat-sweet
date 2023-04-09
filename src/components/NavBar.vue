<template>
  <div class="p-6 w-32 hidden md:flex items-center flex-col">
    <h1 class="italic antialiased tracking-wide mb-8">
      <span class="text-gray-800 font-bold">eat</span>
      <span class="text-green-800 font-bold">dish</span>
      <i class="fi fi-rr-leaf text-xs ml-0.5 text-green-800"></i>
    </h1>
    <ul class="m-2" v-for="(item, index) in navigation" :key="index">
      <router-link :to="item.url">
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
      </router-link>
    </ul>
    <i
      class="fi fi-rr-sign-out-alt px-2 py-2 rounded-xl mt-16 text-green-900"
    ></i>
  </div>
  <div></div>
</template>
<script setup>
import { ref } from "vue";
const navigation = ref([
  {
    name: "Dashboard",
    icon: "fi-sr-home",
    url: "/",
    active: "/" === window.location.pathname,
  },
  {
    name: "Country",
    icon: "fi fi-rr-flag",
    url: "/by-country",
    active: "/by-country" === window.location.pathname,
  },
  {
    name: "Recipe",
    icon: "fi fi-sr-restaurant",
    url: "/recipe",
    active: "/recipe" === window.location.pathname,
  },
  {
    name: "Products",
    icon: "fi fi-sr-hamburger-soda",
    url: "/products",
    active: "/products" === window.location.pathname,
  },
  {
    name: "Favorite",
    icon: "fi-sr-heart ",
    url: "/favorite",
    active: "/favorite" === window.location.pathname,
  },

  {
    name: "Checkout",
    icon: "fi-sr-sack-dollar",
    url: "/checkout",
    active: "/checkout" === window.location.pathname,
  },
  // { name: "Chat", icon: "fi-ss-comments", url: "", active: false },
  // { name: "Shop", icon: "fi-ss-shop", url: "", active: false },
  // { name: "Setting", icon: "fi-sr-settings", url: "", active: false },
]);
</script>
