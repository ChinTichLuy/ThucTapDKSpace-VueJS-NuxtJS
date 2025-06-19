<template>
  <div class="max-w-4xl mx-auto">
    <Navbar />
    <router-view />
  </div>
</template>

<script setup>
import Navbar from './components/MainNavbar.vue'
</script>