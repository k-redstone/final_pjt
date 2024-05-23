<template>
  <div class="flex justify-center">
    <main class="flex flex-col font-kbizB">
      <div class="w-[1100px] my-10 flex items-center gap-x-5">
        <h1 class="text-white text-5xl">새로운 게시물을 작성해보세요!</h1>
      </div>
      <div class="bg-white rounded-lg p-6 text-black flex flex-col gap-y-3 overflow-y-auto">
        <h3 class="text-2xl">게시글 작성하기</h3>
        <form
          id="freeBoardForm"
          class="flex flex-col border p-3 border-black"
          @submit.prevent="submitPost"
        >
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
            <GlobalButton :type="'mint'" :text="'작성하기'" />
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
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const store = useAuthStore()
const router = useRouter()

const titleInput = useInputLimit(SETTING.post_title_limit)
const contentInput = useInputLimit(SETTING.post_content_limit)

const formData = ref({
  title: titleInput.inputValue,
  content: contentInput.inputValue,
})

const submitPost = () => {
  const URL = import.meta.env.VITE_BACKEND_URL
  const headers = {
    Authorization: `Token ${store.token}`,
  }

  axios({
    method: 'post',
    url: URL + 'free_board/article/',
    headers: headers,
    data: formData.value,
  })
    .then((res) => {
      formData.value.title = ''
      formData.value.content = ''
      document.querySelector('#freeBoardForm').reset()
      router.push({ name: 'community' })
    })
    .catch((error) => {
      console.error(error)
    })
}
</script>

<style scoped></style>
