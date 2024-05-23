<template>
  <div class="flex justify-center">
    <main class="flex flex-col font-kbizB">
      <div class="w-[1100px] my-10 flex items-center gap-x-5">
        <h1 class="text-white text-5xl">자유게시판</h1>
        <RouterLink :to="{ name: 'communityCreate' }">
          <GlobalButton :type="'mint'" :text="'게시물 만들기'" />
        </RouterLink>
      </div>
      <div>
        <CommunityCard
          v-for="postData in postList"
          :postData="postData"
          :key="postData.id"
          @delete-post="deletepost"
          @fetch-like="fetchLike"
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

const store = useAuthStore()
const postList = ref([])

onMounted(() => {
  getFreeBoardList()
})

const getFreeBoardList = async () => {
  const URL = import.meta.env.VITE_BACKEND_URL
  const headers = {
    Authorization: `Token ${store.token}`,
  }

  axios({
    method: 'get',
    url: URL + 'free_board/',
    headers: headers,
  })
    .then((res) => {
      postList.value = res.data
    })
    .catch((error) => {
      console.error(error)
    })
}

const deletepost = (postId) => {
  const URL = import.meta.env.VITE_BACKEND_URL
  const headers = {
    Authorization: `Token ${store.token}`,
  }

  axios({
    method: 'delete',
    url: URL + `free_board/${postId}/edit/`,
    headers: headers,
  })
    .then(() => {
      getFreeBoardList()
    })
    .catch((error) => {
      console.error(error)
    })
}

const fetchLike = (postId) => {
  const URL = import.meta.env.VITE_BACKEND_URL
  const headers = {
    Authorization: `Token ${store.token}`,
  }
  axios({
    method: 'post',
    url: URL + `free_board/${postId}/like/`,
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
