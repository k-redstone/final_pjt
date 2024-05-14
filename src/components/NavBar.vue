<template>
  <div class="mt-14">
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
          <li class="mx-6">Movie</li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style lang="scss" scoped></style>
