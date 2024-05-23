<template>
  <div>
    <div class="fixed top-0 left-0 w-full min-h-screen bg-community-img bg-cover -z-50">
      <div class="min-h-screen bg-opacityGray"></div>
    </div>
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>

<style scoped></style>
