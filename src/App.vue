<template>
  <div class="relative">
    <div class="fixed w-full min-h-screen bg-main-img bg-cover -z-50">
      <div class="min-h-screen bg-opacityGray"></div>
    </div>
    <div class="min-h-screen w-full">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>

<style scoped></style>
