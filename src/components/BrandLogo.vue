<template><router-link to="/" aria-label="Eatsweet home" class="brand-logo"><img :src="logo" alt="Eatsweet — good food, every day" /></router-link></template>
<script setup>import logo from '../assets/eatsweet-logo.svg';</script>
<style scoped>.brand-logo { display:block; width:112px; max-width:100%; } .brand-logo img { width:100%; height:auto; }</style>