<template>
  <div class="sticky top-0 z-50">
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog
        as="div"
        class="relative z-50 md:hidden"
        @close="sidebarOpen = false"
      >
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-900/80" />
        </TransitionChild>

        <div class="fixed inset-0 flex">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
              <TransitionChild
                as="template"
                enter="ease-in-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in-out duration-300"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <div
                  class="absolute left-full top-0 flex w-16 justify-center pt-5"
                >
                  <button
                    type="button"
                    class="-m-2.5 p-2.5"
                    @click="sidebarOpen = false"
                  >
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <div
                class="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4"
              >
                <div class="flex h-16 shrink-0 items-center">
                  <h1 class="italic antialiased tracking-wide text-xl">
                    <span class="text-gray-800 font-bold">eat</span>
                    <span class="text-green-800 font-bold">dish</span>
                    <i class="fi fi-rr-leaf text-xs ml-0.5 text-green-800"></i>
                  </h1>
                </div>
                <nav class="flex flex-1 flex-col">
                  <ul role="list" class="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" class="-mx-2 space-y-1">
                        <li v-for="item in navigation" :key="item.name">
                          <router-link
                            :to="item.url"
                            :class="[
                              item.current
                                ? 'bg-gray-50 text-indigo-600'
                                : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                              'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                            ]"
                          >
                            <i
                              :class="item.icon"
                              class="text-gray-400 group-hover:text-indigo-600"
                            ></i>
                            {{ item.name }}
                          </router-link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <div
      class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b bg-white px-4 sm:gap-x-6 sm:px-6 lg:px-8"
    >
      <button
        type="button"
        class="-m-2.5 p-2.5 text-gray-700 md:hidden"
        @click="sidebarOpen = true"
      >
        <span class="sr-only">Open sidebar</span>
        <Bars3Icon class="h-6 w-6" aria-hidden="true" />
      </button>

      <!-- Separator -->
      <div class="h-6 w-px bg-gray-200 md:hidden" aria-hidden="true" />

      <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <slot></slot>
        <div class="flex items-center gap-x-4 lg:gap-x-6">
          <!-- <button
            type="button"
            class="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500 [&_.p-badge]:text-xs [&_.p-badge]:min-w-[1rem] [&_.p-badge]:h-[1rem] [&_.p-badge]:bg-green-500"
          >
            <span class="sr-only">View notifications</span>
            <span v-badge="2" class="w-6 h-6">
              <ShoppingCartIcon class="h-6 w-6" aria-hidden="true" />
            </span>
          </button> -->
          <button
            type="button"
            class="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
          >
            <span class="sr-only">View notifications</span>
            <BellIcon class="h-6 w-6" aria-hidden="true" />
          </button>

          <!-- Separator -->
          <div
            class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"
            aria-hidden="true"
          />

          <!-- Profile dropdown -->
          <Menu as="div" class="relative">
            <MenuButton class="-m-1.5 flex items-center p-1.5">
              <span class="sr-only">Open user menu</span>
              <img
                class="h-8 w-8 rounded-full bg-gray-50"
                src="src\images\user-logo.png"
                alt=""
              />
              <span class="hidden lg:flex lg:items-center">
                <span
                  class="ml-4 text-sm font-semibold leading-6 text-gray-900"
                  aria-hidden="true"
                  >Sahil Suthar</span
                >
                <ChevronDownIcon
                  class="ml-2 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </MenuButton>
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
              >
                <MenuItem
                  v-for="item in userNavigation"
                  :key="item.name"
                  v-slot="{ active }"
                >
                  <a
                    :href="item.href"
                    :class="[
                      active ? 'bg-gray-50' : '',
                      'block px-3 py-1 text-sm leading-6 text-gray-900',
                    ]"
                    >{{ item.name }}</a
                  >
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import {
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
  ShoppingCartIcon,
} from "@heroicons/vue/24/outline";
import { ChevronDownIcon, MagnifyingGlassIcon } from "@heroicons/vue/20/solid";
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

const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: "#" },
];

const sidebarOpen = ref(false);
</script>
