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
        <div class="bg-white rounded-lg mt-10 p-6 text-black flex flex-col gap-y-3 mb-20">
          <h3 class="text-2xl">감상평</h3>
          <form class="border p-3 border-black" @submit.prevent="submitReview">
            <p>유저이름</p>
            <textarea
              type="text"
              class="h-10 w-full overflow-y-auto resize-none"
              placeholder="감상평을 알려주세요"
              @input="changeReview"
            ></textarea>
            <hr />
            <div class="py-2 flex items-center">
              <p class="grow">글자수 {{ reviewLength }}/100</p>
              <GlobalButton :type="'mint'" :text="'댓글 달기'" />
            </div>
          </form>
          <div>
            <div v-for="num in 10">
              <ReviewCard class="py-5" />
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
import ReviewCard from '@/components/ReviewCard.vue'
import { ref, computed, onMounted } from 'vue'

const movieData = ref({})
const review = ref('')

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

const changeReview = (event) => {
  if (event.inputType === 'deleteContentBackward') {
    review.value = event.target.value
    return
  }
  if (event.inputType === 'insertFromPaste') {
    if (event.target.value.length >= 100) {
      alert('100자까지 입력할 수 있습니다.')
      event.target.value = review.value
      return
    }
  }
  if (reviewLength.value >= 100) {
    alert('100자까지 입력할 수 있습니다.')
    event.target.value = review.value
    return
  }
  review.value = event.target.value
}

const submitReview = () => {
  alert('댓글달기')
}

const reviewLength = computed(() => {
  return review.value.length
})
</script>

<style scoped></style>
