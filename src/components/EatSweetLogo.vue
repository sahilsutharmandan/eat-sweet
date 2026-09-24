<template>
  <router-link
    to="/"
    class="group inline-flex items-center gap-2.5 transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 rounded-xl py-1 px-1.5"
    :class="[
      isVertical ? 'flex-col justify-center text-center' : 'flex-row items-center',
      customClass
    ]"
    :title="'eatsweet - Home'"
  >
    <!-- Crisp Vector Logo Mark (Bowl + Sprouting Leaf + Utensil Stem) -->
    <div
      class="relative flex shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-105"
      :class="iconContainerSize"
    >
      <svg
        :width="iconPixelSize"
        :height="iconPixelSize"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="drop-shadow-sm"
      >
        <defs>
          <linearGradient id="esLeafGrad" x1="16" y1="6" x2="38" y2="30" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#34d399" />
            <stop offset="45%" stop-color="#10b981" />
            <stop offset="100%" stop-color="#047857" />
          </linearGradient>
          <linearGradient id="esBowlGrad" x1="8" y1="22" x2="40" y2="42" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#065f46" />
            <stop offset="100%" stop-color="#022c22" />
          </linearGradient>
          <linearGradient id="esAccentGrad" x1="18" y1="8" x2="26" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#a7f3d0" />
            <stop offset="100%" stop-color="#34d399" />
          </linearGradient>
          <filter id="esGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="1" stdDeviation="1.5" flood-opacity="0.15" />
          </filter>
        </defs>

        <!-- Modern Culinary Bowl Base -->
        <path
          d="M8 24C8 33.5 15.5 41 24 41C32.5 41 40 33.5 40 24C40 23.2 39.3 22.5 38.5 22.5H9.5C8.7 22.5 8 23.2 8 24Z"
          fill="url(#esBowlGrad)"
        />
        
        <!-- Bowl Rim Highlight -->
        <path
          d="M8.5 23.2C8.5 22.8 8.8 22.5 9.2 22.5H38.8C39.2 22.5 39.5 22.8 39.5 23.2C39.5 23.6 39.2 23.9 38.8 23.9H9.2C8.8 23.9 8.5 23.6 8.5 23.2Z"
          fill="#34d399"
          fill-opacity="0.6"
        />

        <!-- Bowl Pedestal Base -->
        <path
          d="M19 41C19 41 20 43 24 43C28 43 29 41 29 41H19Z"
          fill="#022c22"
        />

        <!-- Organic Sprouting Leaf (Left & Center) -->
        <path
          d="M24 23C24 16 29 8 36 6C36.8 13.5 32 20 25.5 23C25 23.2 24.5 23.2 24 23Z"
          fill="url(#esLeafGrad)"
          filter="url(#esGlow)"
        />

        <!-- Leaf Spine / Center Vein (subtle negative space) -->
        <path
          d="M24.8 22.5C28 17.5 31.5 12 35.2 7.2"
          stroke="#a7f3d0"
          stroke-width="1.25"
          stroke-linecap="round"
        />

        <!-- Secondary Fresh Sprout Leaf (Left Accent) -->
        <path
          d="M23.5 21C22 17 17.5 13.5 13.5 13C13 17.5 16.5 21 21.5 22.2C22.3 22.4 23 21.8 23.5 21Z"
          fill="url(#esAccentGrad)"
          fill-opacity="0.9"
        />

        <!-- Culinary Utensil Silhouette (Fork Tines emerging with natural elegance) -->
        <g stroke="#ffffff" stroke-width="1.3" stroke-linecap="round" opacity="0.95">
          <!-- Fork Center Stem -->
          <line x1="24" y1="28" x2="24" y2="24" />
          <!-- Fork Tines -->
          <line x1="21.5" y1="24.5" x2="21.5" y2="21.5" />
          <line x1="24" y1="23.5" x2="24" y2="19.5" />
          <line x1="26.5" y1="24.5" x2="26.5" y2="21.5" />
          <!-- Fork Base Crossbar -->
          <path d="M21 25.5C21 27 27 27 27 25.5" fill="none" stroke-width="1.2" />
        </g>
      </svg>
    </div>

    <!-- Wordmark -->
    <div
      v-if="showWordmark"
      class="flex select-none flex-col justify-center leading-none"
      :class="isVertical ? 'items-center mt-1' : 'items-start'"
    >
      <div class="flex items-baseline tracking-tight font-extrabold" :class="textClass">
        <span class="text-gray-900 group-hover:text-black transition-colors">eat</span>
        <span class="text-emerald-700 group-hover:text-emerald-600 transition-colors">sweet</span>
        <span class="inline-block w-1.5 h-1.5 ml-0.5 rounded-full bg-emerald-500"></span>
      </div>
      <span
        v-if="showTagline"
        class="text-[9px] uppercase tracking-widest font-semibold text-emerald-800/60 mt-0.5"
      >
        Fresh & Healthy
      </span>
    </div>
  </router-link>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  size: {
    type: String,
    default: "md", // sm, md, lg
  },
  showWordmark: {
    type: Boolean,
    default: true,
  },
  showTagline: {
    type: Boolean,
    default: false,
  },
  isVertical: {
    type: Boolean,
    default: false,
  },
  customClass: {
    type: String,
    default: "",
  },
});

const iconPixelSize = computed(() => {
  if (props.size === "sm") return 30;
  if (props.size === "lg") return 48;
  return 38;
});

const iconContainerSize = computed(() => {
  if (props.size === "sm") return "w-8 h-8";
  if (props.size === "lg") return "w-12 h-12";
  return "w-10 h-10";
});

const textClass = computed(() => {
  if (props.size === "sm") return "text-base";
  if (props.size === "lg") return "text-2xl";
  return "text-xl";
});
</script>
