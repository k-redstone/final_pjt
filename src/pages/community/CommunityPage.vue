<template>
  <div class="flex justify-center">
    <main class="flex flex-col font-kbizB">
      <div class="w-[1100px] my-10 flex items-center gap-x-5">
        <h1 class="text-white text-5xl">자유게시판</h1>
      </div>
      <div class="bg-white rounded-lg p-6 text-black flex flex-col gap-y-3 overflow-y-auto">
        <h3 class="text-2xl">게시글 작성하기</h3>
        <form class="flex flex-col border p-3 border-black" @submit.prevent="submitPost">
          <!-- <p class="mb-4">{{ store.userInfo.username }}</p> -->
          <label for="freeBoardTitle">제목</label>
          <textarea
            id="freeBoardTitle"
            type="text"
            class="h-10 w-full overflow-y-auto resize-none"
            placeholder="제목을 작성해주세요."
            v-model="formData.title"
          />
          <label for="freeBoardContent">내용</label>
          <textarea
            id="freeBoardContent"
            type="text"
            class="h-14 w-full overflow-y-auto resize-none"
            placeholder="게시글을 작성해주세요."
            @input="changeContent"
            v-model="formData.content"
          ></textarea>
          <hr />
          <div class="py-2 flex items-center">
            <p class="grow">글자수 {{ contentLength }}/500</p>
            <GlobalButton :type="'mint'" :text="'작성하기'" />
          </div>
        </form>
      </div>
      <div>
        <CommunityCard v-for="postData in postList" :postData="postData" :key="postData.id" />
      </div>
    </main>
  </div>
</template>

<script setup>
import CommunityCard from '@/components/CommunityCard.vue'
import GlobalButton from '@/components/GlobalButton.vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import { ref, computed, onMounted } from 'vue'

const store = useAuthStore()

const formData = ref({
  title: '',
  content: '',
})
const postList = ref([])

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

const changeContent = (event) => {
  if (event.inputType === 'deleteContentBackward') {
    formData.value.content = event.target.value
    return
  }
  if (event.inputType === 'insertFromPaste') {
    if (event.target.value.length >= 500) {
      alert('500자까지 입력할 수 있습니다.')
      event.target.value = formData.value.content
      return
    }
  }
  if (contentLength.value >= 500) {
    alert('500자까지 입력할 수 있습니다.')
    event.target.value = formData.value.content
    return
  }
  formData.value.content = event.target.value
}

const submitPost = () => {
  const URL = import.meta.env.VITE_BACKEND_URL
  const headers = {
    Authorization: `Token ${store.token}`,
  }
  console.log(formData.value)
  console.log(headers)
  axios({
    method: 'post',
    url: URL + '/free_board/article/',
    headers: headers,
    data: formData.value,
  })
    .then((res) => {
      console.log(res)
      getFreeBoardList()
    })
    .catch((error) => {
      console.log(error)
    })
}

const contentLength = computed(() => {
  return formData.value.content.length
})
</script>

<style scoped></style>
