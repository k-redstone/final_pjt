<template>
  <div class="flex justify-center">
    <main class="flex flex-col w-[1100px] font-kbizB">
      <div class="my-10">
        <h1 class="text-white text-5xl">게시물 상세보기</h1>
      </div>
      <div class="bg-white rounded-lg px-5 pt-7 pb-3 my-6 font-kbizR">
        <!-- 유지명 및 기능 -->
        <div class="flex items-center gap-x-4">
          <span class="text-2xl font-kbizB">{{ postData.article?.userId }}</span>
          <span class="text-lg grow text-gray-400">{{ postData.article?.created_at }}</span>
          <span class="text-lg">수정</span>
          <span class="text-lg">삭제</span>
        </div>
        <!-- 본문 -->
        <div class="px-20 py-5">
          <p>
            {{ postData.article?.content }}
          </p>
        </div>
      </div>
      <div
        class="bg-white rounded-lg mt-10 p-6 text-black flex flex-col gap-y-3 mb-20 overflow-y-auto"
      >
        <h3 class="text-2xl">댓글</h3>
        <form class="border p-3 border-black" @submit.prevent="submitComment(postData.article.id)">
          <p>유저이름</p>
          <textarea
            id="comment"
            type="text"
            class="h-10 w-full overflow-y-auto resize-none"
            placeholder="댓글을 달아주세요."
            @input="changeReview"
          ></textarea>
          <hr />
          <div class="py-2 flex items-center">
            <p class="grow">글자수 {{ commentLength }}/100</p>
            <GlobalButton :type="'mint'" :text="'댓글 달기'" />
          </div>
        </form>
        <div>
          <div v-for="comment in postData?.comments" :key="comment.id">
            <ReviewCard class="py-5" :comment="comment" />
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
import { useAuthStore } from '@/stores/auth'
import { useRoute } from 'vue-router'
import { ref, computed, onMounted } from 'vue'

const store = useAuthStore()
const route = useRoute()
const comment = ref({
  content: '',
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
    postData.value = res.data
  })
}

const changeReview = (event) => {
  if (event.inputType === 'deleteContentBackward') {
    comment.value.content = event.target.value
    return
  }
  if (event.inputType === 'insertFromPaste') {
    if (event.target.value.length >= 100) {
      alert('100자까지 입력할 수 있습니다.')
      event.target.value = comment.value.content
      return
    }
  }
  if (commentLength.value >= 100) {
    alert('100자까지 입력할 수 있습니다.')
    event.target.value = comment.value.content
    return
  }
  comment.value.content = event.target.value
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
      document.querySelector('#comment').value = ''
      comment.value.content = ''
      getPostDetail()
    })
    .catch((error) => {
      console.log(error)
    })
}

const commentLength = computed(() => {
  return comment.value.content.length
})
</script>

<style scoped></style>
