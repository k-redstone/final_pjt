<template>
  <div class="mt-14">
    <nav class="flex font-bold">
      <!-- link -->
      <div class="grow">
        <ul class="flex text-2xl text-white">
          <li class="mr-[12px]">logo</li>
          <li class="mx-6">Home</li>
          <li class="mx-6">Movie</li>
        </ul>
      </div>
      <!-- login -->
      <div>
        <RouterLink :to="{ name: 'login' }">
          <button class="w-[137px] h-[43px] bg-lightPurple rounded-xl cursor-pointer">
            <p class="text-white text-xl">Log In</p>
          </button>
        </RouterLink>
        <RouterLink :to="{ name: 'signUp' }">
          <button class="w-[137px] h-[43px] bg-white rounded-xl text-center ml-10 cursor-pointer">
            <p class="text-black text-xl">Sign Up</p>
          </button>
        </RouterLink>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style lang="scss" scoped></style>
