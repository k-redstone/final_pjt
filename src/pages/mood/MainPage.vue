<template>
  <div>
    <main class="w-full">
      <div class="absolute top-1/4">
        <div>
          <p class="text-white text-5xl font-kbizH">MoodMovie</p>
          <p class="text-white text-5xl font-kbizH mt-10">오늘의 기분을 달래보세요</p>
        </div>
        <div class="mt-14">
          <RouterLink :to="{ name: 'login' }">
            <GlobalButton class="mr-10" :type="'mint'" :text="'Movie'" />
          </RouterLink>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import GlobalButton from '@/components/GlobalButton.vue'
</script>
