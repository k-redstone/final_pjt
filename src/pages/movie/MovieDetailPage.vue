<template>
  <div class="flex flex-col">
    <div class="absolute top-0 left-0 w-full h-full bg-opacityGray -z-10"></div>
    <main class="w-full flex flex-col font-kbizB">
      <div>
        <!-- title -->
        <!-- <div class="flex items-center w-full my-10"> -->
        <!-- <h1 class="text-white text-5xl">영화상세 페이지</h1> -->
        <!-- </div> -->
        <div class="flex mt-10 bg-gray px-10 py-8 rounded-xl">
          <div class="w-[350px] flex-shrink-0 mr-4">
            <img
              :src="'https://image.tmdb.org/t/p/original' + movieData.poster_path"
              alt="movie_poster"
              @error="handleImg"
            />
          </div>
          <div class="grow flex flex-col items-start text-white text-lg gap-y-4 font-kbizR">
            <div class="w-full">
              <div class="flex items-center gap-x-3 pb-2">
                <span class="text-[#ffdd57] text-4xl">{{ movieData.title }}</span>

                <span
                  class="material-symbols-outlined text-4xl fill-red-300 hover:scale-125 transition-transform cursor-pointer"
                  :class="{ 'text-red-300': isLikeMovie }"
                  @click="handleLike(movieData.db_movie_id)"
                >
                  favorite
                </span>
              </div>
              <div class="flex items-center gap-x-4">
                <span>{{ movieData.release_date }}</span>
                <span>{{ movieData.vote_average }}점</span>
              </div>
            </div>
            <div class="flex flex-col">
              <span class="text-xl text-[#ffdd57]">장르</span>
              <div>
                <span v-for="genre in movieData.genres" :key="genre">{{ genre }} &nbsp;</span>
              </div>
            </div>
            <div class="flex flex-col grow">
              <span class="text-xl text-[#ffdd57]">줄거리</span>
              <span>{{ movieData.overview }}</span>
            </div>
            <div class="flex flex-col gap-y-1">
              <div class="flex items-center gap-x-3">
                <span
                  >이 영화를 좋아하는 사람
                  <span class="text-[#ffdd57]"> {{ movieData.like_user?.length }} </span>명</span
                >
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col mt-5">
          <span class="text-xl text-[#ffdd57]">출연진</span>
          <div class="flex gap-x-5 mt-2">
            <ActorCard v-for="actor in movieData.actors" :key="actor[1]" :actor-data="actor" />
          </div>
        </div>
        <div
          class="bg-white rounded-lg mt-10 p-6 text-black flex flex-col gap-y-3 mb-20 overflow-y-auto"
        >
          <h3 class="text-2xl">감상평</h3>
          <form
            id="reviewForm"
            class="border p-3 border-black"
            @submit.prevent="submitReview(movieData.db_movie_id)"
          >
            <p>{{ store.userInfo.nickname }}</p>
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
              <ReviewCard
                class="py-5"
                :comment="review"
                @delete-comment="deleteComment"
                @edit-comment="editComment"
              />
              <hr />
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import img from '@/assets/img/no_image.png'
import axios from 'axios'
import GlobalButton from '@/components/GlobalButton.vue'
import useInputLimit from '@/hooks/useInputLimit'
import ReviewCard from '@/components/ReviewCard.vue'
import ActorCard from '@/components/ActorCard.vue'
import { SETTING } from '@/constants/settings'
import { useAuthStore } from '@/stores/auth'
import { useRoute } from 'vue-router'
import { ref, watch, onMounted } from 'vue'
import router from '@/router'

const props = defineProps({
  movieId: Number,
})

const reviewInput = useInputLimit(SETTING.comment_limt)
const store = useAuthStore()
const route = useRoute()

const movieData = ref([])
const reviewData = ref([])
const isLikeMovie = ref('false')
const review = ref({
  content: reviewInput.inputValue,
})

onMounted(() => {
  getMovieDetail(props.movieId)
  getMovieReview(props.movieId)
})

watch(
  () => movieData.value,
  () => {
    isLikeMovie.value = movieData.value.like_user.some((user) => user['id'] === store.userInfo.id)
  },
)

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
    url: URL + `movies/detail/${route.params.movieId}/`,
    headers: headers,
  })
    .then((res) => {
      console.log(res.data)
      movieData.value = res.data
    })
    .catch((error) => {
      if (error.response.status === 404) {
        router.push({ name: '404' })
      }
    })
}
const getMovieReview = () => {
  const URL = import.meta.env.VITE_BACKEND_URL
  const headers = {
    Authorization: `Token ${store.token}`,
  }
  axios({
    method: 'get',
    url: URL + `movie_board/${route.params.movieId}/`,
    headers: headers,
  })
    .then((res) => {
      console.log('getReview')
      console.log(res.data)
      reviewData.value = res.data
    })
    .catch((error) => {
      console.error(error)
    })
}

const submitReview = (movieId) => {
  console.log(movieId)
  const URL = import.meta.env.VITE_BACKEND_URL
  const headers = {
    Authorization: `Token ${store.token}`,
  }
  axios({
    method: 'post',
    url: URL + `movie_board/${movieId}/comment/`,
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

const deleteComment = (commentId) => {
  // console.log(postData.value.article.id)
  const URL = import.meta.env.VITE_BACKEND_URL
  const headers = {
    Authorization: `Token ${store.token}`,
  }

  axios({
    method: 'delete',
    url: URL + `movie_board/${movieData.value.db_movie_id}/comment/${commentId}/`,
    headers: headers,
  })
    .then(() => {
      getMovieReview()
    })
    .catch((error) => {
      console.error(error)
    })
}
const editComment = (commentId, formData) => {
  console.log(movieData.value)
  const URL = import.meta.env.VITE_BACKEND_URL
  const headers = {
    Authorization: `Token ${store.token}`,
  }
  axios({
    method: 'put',
    url: URL + `movie_board/${movieData.value.db_movie_id}/comment/${commentId}/`,
    headers: headers,
    data: formData,
  })
    .then(() => {
      getMovieReview()
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

<style scoped></style>
