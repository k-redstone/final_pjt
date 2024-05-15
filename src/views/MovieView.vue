<template>
  <div class="flex flex-col">
    <HomeLayout>
      <NavBar />
      <RouterView />
    </HomeLayout>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import HomeLayout from '@/components/HomeLayout.vue'
import NavBar from '@/components/NavBar.vue'
</script>

<style scoped></style>
