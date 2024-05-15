<template>
  <div class="pt-14 w-full">
    <nav class="flex font-bold">
      <!-- link -->
      <div class="grow">
        <ul class="flex text-2xl text-white">
          <RouterLink :to="{ name: 'home' }">
            <li class="mr-[12px]">logo</li>
          </RouterLink>
          <RouterLink :to="{ name: 'home' }">
            <li class="mx-6">Home</li>
          </RouterLink>
          <RouterLink :to="{ name: 'movie' }">
            <li class="mx-6">Movie</li>
          </RouterLink>
        </ul>
      </div>
      <div class="flex items-center text-white">
        <span class="material-symbols-outlined text-white text-3xl mr-4"> account_circle </span>
        <span class="text-xl font-kbizR">admin</span>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style lang="scss" scoped></style>
