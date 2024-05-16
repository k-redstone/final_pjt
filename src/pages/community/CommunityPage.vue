<template>
  <div class="flex justify-center">
    <main class="flex flex-col font-kbizB">
      <div class="my-10">
        <h1 class="text-white text-5xl">자유게시판</h1>
      </div>
      <div>
        <div v-for="num in 3" class="cursor-pointer" :key="num">
          <RouterLink :to="{ name: 'communityDetail', params: { postId: num } }">
            <CommunityCard />
          </RouterLink>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import CommunityCard from '@/components/CommunityCard.vue'
import { RouterLink } from 'vue-router'
</script>

<style scoped></style>
