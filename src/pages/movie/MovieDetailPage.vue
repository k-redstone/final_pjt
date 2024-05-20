<template>
  <div class="flex flex-col">
    <div class="absolute top-0 left-0 w-full h-full bg-opacityGray -z-10"></div>
    <main class="w-full flex flex-col font-kbizB">
      <div>
        <!-- title -->
        <div class="flex items-center w-full my-10">
          <h1 class="text-white text-5xl">영화상세 페이지</h1>
        </div>
        <div class="flex">
          <div class="w-[400px] flex-shrink-0 mr-4">
            <img
              :src="'https://image.tmdb.org/t/p/original/' + movieData.poster_path"
              alt="movie_poster"
            />
          </div>
          <div class="flex flex-col items-start text-white text-lg gap-y-4 font-kbizR">
            <span class="text-3xl">영화명</span>
            <span>{{ movieData.title }}</span>
            <span class="text-3xl">개봉일</span>
            <span>{{ movieData.release_date }}</span>
            <span class="text-3xl">런타임</span>
            <span>{{ movieData.runtime }}분</span>
            <span class="text-3xl">TMDB 평점</span>
            <span>{{ movieData.vote_average }}점</span>
            <span class="text-3xl">줄거리</span>
            <span>{{ movieData.overview }}</span>
          </div>
        </div>
        <div
          class="bg-white rounded-lg mt-10 p-6 text-black flex flex-col gap-y-3 mb-20 overflow-y-auto"
        >
          <h3 class="text-2xl">감상평</h3>
          <form
            id="reviewForm"
            class="border p-3 border-black"
            @submit.prevent="submitReview(movieData.id)"
          >
            <p>유저이름</p>
            <textarea
              type="text"
              class="h-10 w-full overflow-y-auto resize-none"
              placeholder="감상평을 알려주세요"
              @input="reviewInput.changeValue($event)"
            ></textarea>
            <hr />
            <div class="py-2 flex items-center">
              <p class="grow">글자수 {{ reviewInput.valueLength }}/{{ reviewInput.valueLimit }}</p>
              <GlobalButton :type="'mint'" :text="'댓글 달기'" />
            </div>
          </form>
          <div>
            <div v-for="review in reviewData" :key="review.id">
              <ReviewCard class="py-5" :comment="review" />
              <hr />
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import axios from 'axios'
import GlobalButton from '@/components/GlobalButton.vue'
import useInputLimit from '@/hooks/useInputLimit'
import ReviewCard from '@/components/ReviewCard.vue'
import { SETTING } from '@/constants/settings'
import { useAuthStore } from '@/stores/auth'
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'

const reviewInput = useInputLimit(SETTING.comment_limt)
const store = useAuthStore()
const route = useRoute()

const movieData = ref({})
const reviewData = ref([])
const review = ref({
  content: reviewInput.inputValue,
})

// http://127.0.0.1:8000/movie_board/<int:movie_pk>/

onMounted(() => {
  getMovieDetail()
  getMovieReview()
})

const getMovieDetail = () => {
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
}
const getMovieReview = () => {
  const URL = import.meta.env.VITE_BACKEND_URL
  const headers = {
    Authorization: `Token ${store.token}`,
  }
  axios({
    method: 'get',
    url: URL + `/movie_board/${route.params.movieId}/`,
    headers: headers,
  })
    .then((res) => {
      reviewData.value = res.data
    })
    .catch((error) => {
      console.error(error)
    })
}

const submitReview = (movieId) => {
  const URL = import.meta.env.VITE_BACKEND_URL
  const headers = {
    Authorization: `Token ${store.token}`,
  }
  axios({
    method: 'post',
    url: URL + `/movie_board/${movieId}/comment/`,
    headers: headers,
    data: review.value,
  })
    .then(() => {
      document.querySelector('#reviewForm').reset()
      review.value.content = ''
      getMovieReview()
    })
    .catch((error) => {
      console.log(error)
    })
}
</script>

<style scoped></style>
