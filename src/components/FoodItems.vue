<template>
  <div class="aspect-square" v-for="(item, index) in meals" :key="index">
    <img :src="item.src" class="w-32 m-auto z-[1]" alt="" />
    <div class="border rounded-3xl -mt-14 pt-16 pb-4 px-5">
      <h3 class="font-semibold">{{ item.label }}</h3>
      <p class="line-clamp-3 text-gray-500">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. A maxime
        voluptate asperiores ut, inventore odit facere repellat nemo, nostrum
        magnam eligendi eum tenetur! Repudiandae sequi, beatae odit ut, ullam
        temporibus quaerat exercitationem iusto dolorem repellat eveniet,
        sapiente suscipit consequuntur. Eligendi quaerat laborum numquam dolores
        ipsa natus nesciunt nihil architecto quas.
      </p>
      <div class="flex justify-between items-center mt-2">
        <span class="font-bold">$23</span>
        <span class="mt-1.5 flex gap-2">
          <i class="fi fi-rs-heart"></i>
          <i class="fi fi-rr-shopping-cart"></i>
        </span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
const meals = ref([
  { label: "'Burger 'Wanted'", desc: "", src: "/src/images/burgers.png" },
  { label: "'Pizza 'Wanted'", desc: "", src: "/src/images/pizzas.png" },
  {
    label: "'Watermelon 'Wanted'",
    desc: "",
    src: "/src/images/watermelon.png",
  },
]);
</script>
