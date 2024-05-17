<template>
  <div class="flex justify-center">
    <main class="flex flex-col font-kbizB">
      <div class="w-[1100px] my-10 flex items-center gap-x-5">
        <h1 class="text-white text-5xl">자유게시판</h1>
      </div>
      <div class="bg-white rounded-lg p-6 text-black flex flex-col gap-y-3 overflow-y-auto">
        <h3 class="text-2xl">게시글 작성하기</h3>
        <form
          id="freeBoardForm"
          class="flex flex-col border p-3 border-black"
          @submit.prevent="submitPost"
        >
          <!-- <p class="mb-4">{{ store.userInfo.username }}</p> -->
          <label for="freeBoardTitle">제목</label>
          <textarea
            id="freeBoardTitle"
            type="text"
            class="h-10 w-full overflow-y-auto resize-none"
            placeholder="제목을 작성해주세요."
            @input="titleInput.changeValue($event)"
          />
          <label for="freeBoardContent">내용</label>
          <textarea
            id="freeBoardContent"
            type="text"
            class="h-14 w-full overflow-y-auto resize-none"
            placeholder="게시글을 작성해주세요."
            @input="contentInput.changeValue($event)"
          ></textarea>
          <hr />
          <div class="py-2 flex items-center">
            <p class="grow">글자수 {{ contentInput.valueLength }}/ {{ contentInput.valueLimit }}</p>
            <GlobalButton :type="'mint'" :text="'작성하기'" />
          </div>
        </form>
      </div>
      <div>
        <CommunityCard
          v-for="postData in postList"
          :postData="postData"
          :key="postData.id"
          @delete-post="deletepost"
        />
      </div>
    </main>
  </div>
</template>

<script setup>
import CommunityCard from '@/components/CommunityCard.vue'
import GlobalButton from '@/components/GlobalButton.vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import { ref, onMounted } from 'vue'
import useInputLimit from '@/hooks/useInputLimit.js'

const store = useAuthStore()

const postList = ref([])
const titleInput = useInputLimit(50)
const contentInput = useInputLimit(200)

const formData = ref({
  title: titleInput.inputValue,
  content: contentInput.inputValue,
})

onMounted(() => {
  getFreeBoardList()
})

const getFreeBoardList = () => {
  const URL = import.meta.env.VITE_BACKEND_URL
  const headers = {
    Authorization: `Token ${store.token}`,
  }

  axios({
    method: 'get',
    url: URL + '/free_board/',
    headers: headers,
  }).then((res) => {
    postList.value = res.data
    console.log(res)
  })
}

const submitPost = () => {
  const URL = import.meta.env.VITE_BACKEND_URL
  const headers = {
    Authorization: `Token ${store.token}`,
  }

  axios({
    method: 'post',
    url: URL + '/free_board/article/',
    headers: headers,
    data: formData.value,
  })
    .then((res) => {
      console.log(res)
      formData.value.title = ''
      formData.value.content = ''
      document.querySelector('#freeBoardForm').reset()
      getFreeBoardList()
    })
    .catch((error) => {
      console.log(error)
    })
}

const deletepost = (postId) => {
  const URL = import.meta.env.VITE_BACKEND_URL
  const headers = {
    Authorization: `Token ${store.token}`,
  }

  axios({
    method: 'delete',
    url: URL + `/free_board/${postId}/edit/`,
    headers: headers,
  })
    .then(() => {
      getFreeBoardList()
    })
    .catch((error) => {
      console.error(error)
    })
}
</script>

<style scoped></style>
