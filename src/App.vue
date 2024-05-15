<template>
  <div class="relative">
    <div class="fixed w-full min-h-screen bg-community-img bg-cover -z-20">
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
