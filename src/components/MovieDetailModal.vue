<template>
  <div class="fixed top-0 left-0 w-screen h-screen bg-opacityGray z-50" @click="handleModal"></div>
  <div
    class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center z-50"
  >
    <!-- absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -->
    <div>
      <div class="w-[1280px] flex bg-gray px-10 py-8 rounded-xl">
        <div class="w-[350px] flex-shrink-0 mr-4">
          <img
            :src="'https://image.tmdb.org/t/p/original' + setMovieData.poster_path"
            alt="movie_poster"
            @error="handleImg"
          />
        </div>
        <div class="grow flex flex-col items-start text-white text-lg gap-y-4 font-kbizR">
          <div class="w-full">
            <div class="flex items-center gap-x-3 pb-2">
              <span class="text-[#ffdd57] text-4xl">{{ setMovieData.title }}</span>

              <span
                class="material-symbols-outlined text-4xl fill-red-300 hover:scale-125 transition-transform cursor-pointer"
                :class="{ 'text-red-300': isLikeMovie }"
                @click="handleLike(setMovieData.db_movie_id)"
              >
                favorite
              </span>
              <div class="grow"></div>
              <span
                class="material-symbols-outlined text-3xl cursor-pointer transform hover:scale-110"
                @click="handleModal"
              >
                close
              </span>
            </div>
            <div class="flex items-center gap-x-4">
              <span>{{ setMovieData.release_date }}</span>
              <span>{{ setMovieData.vote_average }}점</span>
            </div>
          </div>
          <div class="flex flex-col">
            <span class="text-xl text-[#ffdd57]">장르</span>
            <div>
              <span v-for="genre in setMovieData.genres" :key="genre">{{ genre }} &nbsp;</span>
            </div>
          </div>
          <div class="flex flex-col grow">
            <span class="text-xl text-[#ffdd57]">줄거리</span>
            <span>{{ setMovieData.overview }}</span>
          </div>
          <div class="flex flex-col gap-y-1">
            <div class="flex items-center gap-x-3">
              <span
                >이 영화를 좋아하는 사람
                <span class="text-[#ffdd57]"> {{ setMovieData.like_user?.length }} </span>명</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import img from '@/assets/img/no_image.png'
import axios from 'axios'
import { ref, onMounted, watch } from 'vue'

import { useAuthStore } from '@/stores/auth'
onMounted(() => {
  getMovieDetail()
})

const props = defineProps({
  movieData: Object,
})

const store = useAuthStore()
const setMovieData = ref({})
const isLikeMovie = ref('false')

watch(
  () => setMovieData.value,
  () => {
    isLikeMovie.value = setMovieData.value.like_user.some(
      (user) => user['id'] === store.userInfo.id,
    )
  },
)

const emit = defineEmits(['handleModal'])

const handleModal = () => {
  emit('handleModal')
}
const handleImg = (event) => {
  event.target.src = img
}

const getMovieDetail = () => {
  const URL = import.meta.env.VITE_BACKEND_URL
  const headers = {
    Authorization: `Token ${store.token}`,
  }
  axios({
    method: 'get',
    url: URL + `movies/movie_exist/${props.movieData.db_movie_id}/`,
    headers: headers,
  })
    .then((res) => {
      console.log(res.data)
      setMovieData.value = res.data.movie
    })
    .catch((error) => {
      console.error(error)
    })
}

const handleLike = (movieId) => {
  const URL = import.meta.env.VITE_BACKEND_URL
  const headers = {
    Authorization: `Token ${store.token}`,
  }
  axios({
    method: 'post',
    url: URL + `movies/like-movie/${movieId}/`,
    headers: headers,
  })
    .then((res) => {
      console.log(res.data)
      getMovieDetail()
    })
    .catch((error) => {
      console.error(error)
    })
}
</script>
