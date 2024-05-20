<template>
  <div class="flex justify-center">
    <main class="flex flex-col w-[1100px] font-kbizB">
      <div class="my-10">
        <h1 class="text-white text-5xl">게시물 상세보기</h1>
      </div>
      <div class="bg-white rounded-lg px-5 pt-7 pb-3 my-6 font-kbizR">
        <!-- 유지명 및 기능 -->
        <div class="flex items-center gap-x-4">
          <span class="text-2xl font-kbizB">{{ postData.article?.user_nickname }}</span>
          <span class="text-lg grow text-gray-400">{{
            getTimeFormat(postData.article?.created_at)
          }}</span>
          <!-- <div v-show="store.userInfo.id === postData.article?.user" class="flex gap-x-4">
            <RouterLink :to="{ name: communityEdit, params: { postId: postData.article?.id } }">
              <span class="text-lg">수정</span>
            </RouterLink>
            <span class="text-lg">삭제</span>
          </div> -->
        </div>
        <!-- 본문 -->
        <div class="px-20 py-2">
          <p class="text-xl mb-4">{{ postData.article?.title }}</p>
          <p>
            {{ postData.article?.content }}
          </p>
        </div>
      </div>
      <div
        class="bg-white rounded-lg mt-10 p-6 text-black flex flex-col gap-y-3 mb-20 overflow-y-auto"
      >
        <h3 class="text-2xl">댓글</h3>
        <form
          id="commentForm"
          class="border p-3 border-black"
          @submit.prevent="submitComment(postData.article.id)"
        >
          <p>{{ store.userInfo.username }}</p>
          <textarea
            id="comment"
            type="text"
            class="h-10 w-full overflow-y-auto resize-none"
            placeholder="댓글을 달아주세요."
            @input="commentInput.changeValue($event)"
          ></textarea>
          <hr />
          <div class="py-2 flex items-center">
            <p class="grow">글자수 {{ commentInput.valueLength }}/ {{ commentInput.valueLimit }}</p>
            <GlobalButton :type="'mint'" :text="'댓글 달기'" />
          </div>
        </form>
        <div>
          <div v-for="comment in postData?.comments" :key="comment.id">
            <ReviewCard
              class="py-5"
              :comment="comment"
              @delete-comment="deleteComment"
              @edit-comment="editComment"
            />
            <hr />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import GlobalButton from '@/components/GlobalButton.vue'
import ReviewCard from '@/components/ReviewCard.vue'
import axios from 'axios'
import useInputLimit from '@/hooks/useInputLimit'
import { getTimeFormat } from '@/utils/timeFormat'
import { SETTING } from '@/constants/settings'
import { useAuthStore } from '@/stores/auth'
import { useRoute, RouterLink } from 'vue-router'
import { ref, onMounted } from 'vue'

const store = useAuthStore()
const route = useRoute()
const commentInput = useInputLimit(SETTING.comment_limt)

const comment = ref({
  content: commentInput.inputValue,
})
const postData = ref({})

onMounted(() => {
  getPostDetail()
})

const getPostDetail = () => {
  const URL = import.meta.env.VITE_BACKEND_URL
  const headers = {
    Authorization: `Token ${store.token}`,
  }

  axios({
    method: 'get',
    url: URL + `/free_board/${route.params.postId}/`,
    headers: headers,
  }).then((res) => {
    console.log(res.data)
    postData.value = res.data
  })
}

const submitComment = (postId) => {
  const URL = import.meta.env.VITE_BACKEND_URL
  const headers = {
    Authorization: `Token ${store.token}`,
  }
  axios({
    method: 'post',
    url: URL + `/free_board/${postId}/comment/`,
    headers: headers,
    data: comment.value,
  })
    .then(() => {
      document.querySelector('#commentForm').reset()
      comment.value.content = ''
      getPostDetail()
    })
    .catch((error) => {
      console.log(error)
    })
}

const deleteComment = (postId, commentId) => {
  const URL = import.meta.env.VITE_BACKEND_URL
  const headers = {
    Authorization: `Token ${store.token}`,
  }

  axios({
    method: 'delete',
    url: URL + `/free_board/${postId}/comment/${commentId}/`,
    headers: headers,
  })
    .then(() => {
      getPostDetail()
    })
    .catch((error) => {
      console.error(error)
    })
}
const editComment = (postId, commentId, formData) => {
  console.log(formData)
  const URL = import.meta.env.VITE_BACKEND_URL
  const headers = {
    Authorization: `Token ${store.token}`,
  }
  axios({
    method: 'put',
    url: URL + `/free_board/${postId}/comment/${commentId}/`,
    headers: headers,
    data: formData,
  })
    .then(() => {
      getPostDetail()
    })
    .catch((error) => {
      console.error(error)
    })
}
</script>

<style scoped></style>
