<template>
  <div>
    <div class="min-h-screen bg-community-img bg-cover">
      <div class="absolute w-full min-h-screen bg-opacityGray">
        <header class="absolute w-screen z-10">
          <HomeLayout>
            <NavBar />
          </HomeLayout>
        </header>
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import HomeLayout from '@/components/HomeLayout.vue'
</script>

<style scoped></style>
