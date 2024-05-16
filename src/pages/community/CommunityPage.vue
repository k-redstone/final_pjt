<template>
  <div class="flex justify-center">
    <main class="flex flex-col font-kbizB">
      <div class="my-10">
        <h1 class="text-white text-5xl">자유게시판</h1>
      </div>
      <div>
        <CommunityCard v-for="num in 3" :postData="{ postId: num }" :key="num" />
      </div>
    </main>
  </div>
</template>

<script setup>
import CommunityCard from '@/components/CommunityCard.vue'
</script>

<style scoped></style>
