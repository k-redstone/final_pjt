<template>
  <div class="w-[1100px] bg-white rounded-lg px-5 pt-7 pb-3 my-6 font-kbizR">
    <!-- 유지명 및 기능 -->
    <div class="flex items-center gap-x-4">
      <RouterLink :to="{ name: 'profile', params: { username: '유저이름' } }">
        <span class="text-2xl font-kbizB underline">{{ postData.userId }}</span>
      </RouterLink>
      <span class="text-lg grow text-gray-400">{{ postData.created_at }}</span>
      <span class="text-lg">수정</span>
      <span class="text-lg">삭제</span>
    </div>
    <!-- 본문 -->
    <div class="px-20 py-5">
      <p>
        {{ postData.content }}
      </p>
    </div>
    <hr />
    <div class="flex items-center mt-3 gap-x-3">
      <span>좋아요</span>
      <RouterLink :to="{ name: 'communityDetail', params: { postId: postData.id } }">
        <span class="underline">댓글 3개</span>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'

// 추후 백엔드 연결 후 props로 데이터 연동 예정
defineProps({
  postData: Object,
})
</script>
