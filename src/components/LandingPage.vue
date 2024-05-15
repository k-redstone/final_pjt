<template>
  <div>
    <main class="absolute top-1/4">
      <div>
        <p class="text-white text-5xl font-kbizH">MoodMovie</p>
        <p class="text-white text-5xl font-kbizH mt-10">오늘의 기분을 달래보세요</p>
      </div>
      <div class="mt-20">
        <RouterLink :to="{ name: 'login' }">
          <GlobalButton class="mr-10" :type="'mint'" :text="'Log In'" />
        </RouterLink>
        <RouterLink :to="{ name: 'signUp' }">
          <GlobalButton :type="'white'" :text="'Sign Up'" />
        </RouterLink>
      </div>
    </main>
  </div>
</template>

<script setup>
import GlobalButton from './GlobalButton.vue'
import { RouterLink } from 'vue-router'
</script>

<style lang="scss" scoped></style>
