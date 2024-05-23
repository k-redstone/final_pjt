<template>
  <div class="flex flex-col">
    <main class="w-full flex flex-col font-kbizB">
      <div>
        <!-- title -->
        <div class="flex items-center w-full my-10">
          <h1 class="text-white text-4xl grow">랜덤 인기 영화</h1>
          <GlobalButton :type="'mint'" :text="'다시 추천'" @click="getRandomMovieList" />
        </div>
        <div class="grid grid-cols-5 gap-y-10 gap-x-10 mb-20">
          <LikeMovieCard
            v-for="movie in movieData"
            class="hover:scale-110 transition-transform"
            :key="movie.id"
            :movie-data="movie"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import axios from 'axios'
import GlobalButton from '@/components/GlobalButton.vue'
import LikeMovieCard from '@/components/LikeMovieCard.vue'
import { useAuthStore } from '@/stores/auth'
import { ref, onMounted } from 'vue'

const store = useAuthStore()

const movieData = ref([])

onMounted(() => {
  getRandomMovieList()
})

const getRandomMovieList = () => {
  const URL = import.meta.env.VITE_BACKEND_URL
  const headers = {
    Authorization: `Token ${store.token}`,
  }

  axios({
    method: 'get',
    url: URL + `movies/list/`,
    headers: headers,
  })
    .then((res) => {
      console.log(res.data)
      movieData.value = res.data
    })
    .catch((error) => {
      console.error(error)
    })
}

// http://127.0.0.1:8000/movies/list/
</script>
