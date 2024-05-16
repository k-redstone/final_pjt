<template>
  <div>
    <div class="absolute top-0 left-0 w-full h-full bg-opacityGray -z-10"></div>
    <main class="flex flex-col font-kbizB text-white">
      <div class="mt-14">
        <h1 class="e text-4xl">{{ route.params.username }}님이 관심있어 하는 영화</h1>
      </div>
      <div class="mt-10 flex gap-x-4">
        <span>팔로워 {{ follower }}</span>
        <span>|</span>
        <span>팔로잉 {{ following }}</span>
        <span>팔로우</span>
      </div>
      <div class="mt-10 grid grid-cols-4 gap-x-10 gap-y-20 mb-20">
        <LikeMovieCard :movieData="movieData" />
        <LikeMovieCard :movieData="movieData" />
        <LikeMovieCard :movieData="movieData" />
        <LikeMovieCard :movieData="movieData" />
        <LikeMovieCard :movieData="movieData" />
      </div>
    </main>
  </div>
</template>

<script setup>
import LikeMovieCard from '@/components/LikeMovieCard.vue'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const movieData = ref('')
const following = ref(122)
const follower = ref(2323)

onMounted(() => {
  const URL = 'https://api.themoviedb.org/3/movie/200'
  const params = {
    language: 'ko-KR',
    api_key: import.meta.env.VITE_TMDB_API_KEY,
  }
  axios
    .get(URL, { params: params })
    .then((res) => {
      console.log(res)
      movieData.value = res.data
    })
    .catch((error) => {
      console.error(error)
    })
})
</script>

<style scoped></style>
