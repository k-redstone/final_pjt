<template>
  <div class="w-[1100px] bg-white rounded-lg px-5 pt-7 pb-3 my-6 font-kbizR">
    <!-- 유지명 및 기능 -->
    <div class="flex items-center gap-x-4">
      <RouterLink :to="{ name: 'profile', params: { username: postData.username } }">
        <span class="text-2xl font-kbizB underline">{{ postData.user_nickname }}</span>
      </RouterLink>
      <span class="text-lg grow text-gray-400">{{ getTimeFormat(postData.created_at) }}</span>
      <!-- serializer수정 후 변경 -->
      <div v-show="store.userInfo.id === postData.user" class="flex gap-x-4">
        <RouterLink
          class="text-lg cursor-pointer hover:scale-110"
          :to="{ name: 'communityEdit', params: { postId: postData.id } }"
          >수정</RouterLink
        >
        <span class="text-lg cursor-pointer hover:scale-110" @click="deletePost(postData.id)"
          >삭제</span
        >
      </div>
    </div>
    <!-- 본문 -->
    <div class="px-20 py-2">
      <p class="text-xl mb-4">{{ postData.title }}</p>
      <p>
        {{ postData.content }}
      </p>
    </div>
    <hr />
    <div class="flex items-center mt-3 gap-x-5">
      <div
        class="flex gap-x-2 items-center cursor-pointer hover:scale-110"
        @click="fetchLike(postData.id)"
      >
        <!-- serializer수정 후 변경 -->
        <span
          class="material-symbols-outlined"
          :class="{
            'text-red-300': postData.like_user.includes(store.userInfo.id),
          }"
        >
          thumb_up
        </span>
        <span>{{ postData.like_user.length }}</span>
      </div>
      <RouterLink :to="{ name: 'communityDetail', params: { postId: postData.id } }">
        <span class="underline">댓글 {{ postData.comments_cnt }}개</span>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { getTimeFormat } from '@/utils/timeFormat'

defineProps({
  postData: Object,
})

const emit = defineEmits(['deletePost', 'fetchLike'])
const store = useAuthStore()

const deletePost = (postId) => {
  emit('deletePost', postId)
}

const fetchLike = (postId) => {
  emit('fetchLike', postId)
}
</script>
