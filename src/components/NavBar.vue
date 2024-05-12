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
      <!-- login -->
      <div>
        <RouterLink :to="{ name: 'login' }">
          <GlobalButton :type="'purple'" :text="'Log In'" />
        </RouterLink>
        <RouterLink :to="{ name: 'signUp' }">
          <GlobalButton class="ml-10" :type="'white'" :text="'Sign Up'" />
        </RouterLink>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import GlobalButton from './GlobalButton.vue'
</script>

<style lang="scss" scoped></style>
