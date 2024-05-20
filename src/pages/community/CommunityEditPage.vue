<template>
  <div class="flex justify-center">
    <main class="flex flex-col font-kbizB">
      <div class="w-[1100px] my-10 flex items-center gap-x-5">
        <h1 class="text-white text-5xl">작성한 게시물이 마음에 안들으셨나요?</h1>
      </div>
      <div class="bg-white rounded-lg p-6 text-black flex flex-col gap-y-3 overflow-y-auto">
        <div class="flex items-center">
          <h3 class="text-2xl grow">게시글 수정하기</h3>
          <span class="cursor-pointer hover:scale-110 mr-2" @click="cancelEdit">수정 취소</span>
        </div>
        <form
          id="freeBoardForm"
          class="flex flex-col border p-3 border-black"
          @submit.prevent="submitPost"
        >
          <!-- <p class="mb-4">{{ store.userInfo.username }}</p> -->
          <label for="freeBoardTitle">
            <span class="text-lg">제목</span>
            <span> &ensp; </span>
            <span class="text-gray-400"
              >{{ titleInput.valueLength }}/ {{ titleInput.valueLimit }}</span
            ></label
          >
          <textarea
            id="freeBoardTitle"
            type="text"
            class="h-10 w-full overflow-y-auto resize-none"
            placeholder="제목을 작성해주세요."
            @input="titleInput.changeValue($event)"
          />
          <label for="freeBoardContent">
            <span class="text-lg">내용</span>
            <span> &ensp; </span>
            <span class="text-gray-400"
              >{{ contentInput.valueLength }}/ {{ contentInput.valueLimit }}</span
            ></label
          >

          <textarea
            id="freeBoardContent"
            type="text"
            class="h-14 w-full overflow-y-auto resize-none"
            placeholder="게시글을 작성해주세요."
            @input="contentInput.changeValue($event)"
          ></textarea>
          <hr />
          <div class="py-2 flex items-center justify-end">
            <GlobalButton :type="'mint'" :text="'수정하기'" />
          </div>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup>
import GlobalButton from '@/components/GlobalButton.vue'
import useInputLimit from '@/hooks/useInputLimit.js'
import axios from 'axios'
import { SETTING } from '@/constants/settings'
import { useAuthStore } from '@/stores/auth'
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'

const store = useAuthStore()
const router = useRouter()
const route = useRoute()

const titleInput = useInputLimit(SETTING.post_title_limit)
const contentInput = useInputLimit(SETTING.post_content_limit)

const formData = ref({
  title: titleInput.inputValue,
  content: contentInput.inputValue,
})

onMounted(() => {
  getPostDetail()
})

const submitPost = () => {
  const URL = import.meta.env.VITE_BACKEND_URL
  const headers = {
    Authorization: `Token ${store.token}`,
  }

  axios({
    method: 'put',
    url: URL + `/free_board/${route.params.postId}/edit/`,
    headers: headers,
    data: formData.value,
  })
    .then((res) => {
      console.log(res)
      formData.value.title = ''
      formData.value.content = ''
      document.querySelector('#freeBoardForm').reset()
      router.push({ name: 'community' })
    })
    .catch((error) => {
      console.log(error)
    })
}

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
    titleInput.inputValue.value = res.data.article.title
    document.querySelector('#freeBoardTitle').value = titleInput.inputValue.value
    contentInput.inputValue.value = res.data.article.content
    document.querySelector('#freeBoardContent').value = contentInput.inputValue.value
  })
}

const cancelEdit = () => {
  router.push({ name: 'community' })
}
</script>

<style scoped></style>
