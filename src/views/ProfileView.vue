<template>
  <div>
    <div class="absolute top-0 left-0 w-full h-full bg-opacityGray -z-10"></div>
    <main class="flex flex-col font-kbizB text-white">
      <div class="mt-14">
        <h1 class="e text-4xl">{{ route.params.username }}님이 관심있어 하는 영화</h1>
      </div>
      <div class="mt-10 flex gap-x-4 text-base items-center">
        <span>팔로워 {{ follower.length }}</span>
        <span>|</span>
        <span>팔로잉 {{ following.length }}</span>
        <!-- 자기 자신페이지는 안보이게 하기-->
        <div
          v-show="route.params.username != store.userInfo.username"
          class="flex gap-x-4 items-center"
        >
          <div
            v-show="!isFollow"
            class="w-[70px] h-[30px] border-mint border-2 text-sm rounded-md flex justify-center items-center cursor-pointer hover:scale-110"
            @click="handleFollow"
          >
            <span>팔로우</span>
          </div>
          <div
            v-show="isFollow"
            class="w-[70px] h-[30px] border-red-300 border-2 text-sm rounded-md flex justify-center items-center cursor-pointer hover:scale-110"
            @click="handleFollow"
          >
            <span>언팔로우</span>
          </div>
        </div>
      </div>
      <div class="mt-10 grid grid-cols-4 gap-x-10 gap-y-20 mb-20">
        <LikeMovieCard
          class="hover:scale-110 transition-transform"
          v-for="movie in movieData"
          :movieData="movie"
          :key="movie.db_movie_id"
        />
      </div>
    </main>
  </div>
</template>

<script setup>
import LikeMovieCard from '@/components/LikeMovieCard.vue'
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import axios from 'axios'

const store = useAuthStore()
const route = useRoute()
const router = useRouter()

const movieData = ref('')
const following = ref([])
const follower = ref([])

onMounted(() => {
  getUserMovieList(route.params.username)
  getFollowingList(route.params.username)
  getFollowerList(route.params.username)
})

onBeforeRouteUpdate((to) => {
  getUserMovieList(to.params.username)
  getFollowingList(to.params.username)
  getFollowerList(to.params.username)
})

const getUserMovieList = (username) => {
  const URL = import.meta.env.VITE_BACKEND_URL
  const headers = {
    Authorization: `Token ${store.token}`,
  }
  axios({
    method: 'get',
    url: URL + `accounts/${username}/like_movie/`,
    headers: headers,
  })
    .then((res) => {
      movieData.value = res.data
    })
    .catch((error) => {
      if (error.response.status === 404) {
        router.push({ name: '404' })
      }
    })
}

const getFollowingList = (username) => {
  const URL = import.meta.env.VITE_BACKEND_URL
  const headers = {
    Authorization: `Token ${store.token}`,
  }

  axios({
    method: 'get',
    url: URL + `accounts/${username}/followings/`,
    headers: headers,
  }).then((res) => {
    following.value = res.data
  })
}
const getFollowerList = (username) => {
  const URL = import.meta.env.VITE_BACKEND_URL
  const headers = {
    Authorization: `Token ${store.token}`,
  }

  axios({
    method: 'get',
    url: URL + `accounts/${username}/followers/`,
    headers: headers,
  }).then((res) => {
    follower.value = res.data
  })
}

const handleFollow = () => {
  const URL = import.meta.env.VITE_BACKEND_URL
  const headers = {
    Authorization: `Token ${store.token}`,
  }

  axios({
    method: 'post',
    url: URL + `accounts/${route.params.username}/follow/`,
    headers: headers,
  }).then((res) => {
    getFollowerList(route.params.username)
  })
}

const isFollow = computed(() => {
  return follower.value.find((follower) => follower.username === store.userInfo.username)
})
</script>

<style scoped></style>
