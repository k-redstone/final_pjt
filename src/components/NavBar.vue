<template>
  <div class="pt-10 pb-2 border-b-2 w-full">
    <nav class="h-[50px] flex font-bold items-center overflow-hidden">
      <!-- link -->
      <div class="grow">
        <ul class="flex text-2xl text-white items-end gap-x-5">
          <RouterLink :to="{ name: 'landing' }">
            <li class="mr-3">
              <div class="relative w-[100px] h-[50px]">
                <img
                  class="absolute w-full h-full"
                  src="@/assets/img/logo.png"
                  alt="logo_img"
                  @error="handleImg"
                />
              </div>
            </li>
          </RouterLink>
          <RouterLink :to="{ name: 'movie' }">
            <li>Movie</li>
          </RouterLink>
          <RouterLink :to="{ name: 'community' }">
            <li>Community</li>
          </RouterLink>
          <RouterLink :to="{ name: 'recommend' }">
            <li>Recommend</li>
          </RouterLink>
        </ul>
      </div>
      <div v-show="store.token" class="flex flex-col items-center text-white float-left">
        <div class="flex items-center cursor-pointer peer" @click="handleBoxOpen">
          <span class="material-symbols-outlined text-white text-3xl mr-4"> account_circle </span>
          <span class="text-xl font-kbizR">{{ store.userInfo.username }}</span>
        </div>
        <div
          class="absolute bg-gray py-2 px-3 hidden rounded-lg peer-hover:block peer-hover:translate-y-8 hover:block hover:translate-y-8"
        >
          <div class="w-full flex flex-col items-center gap-y-2">
            <RouterLink
              :to="{ name: 'profile', params: { username: store.userInfo.username } }"
              class="mt-2"
            >
              <span>Profile</span>
            </RouterLink>
            <span class="cursor-pointer" @click="handleLogout">Logout</span>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import img from '@/assets/img/no_image.png'
import { useRouter, RouterLink } from 'vue-router'

import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'

// 프로필 페이지 이동할 때 사용
const store = useAuthStore()
const router = useRouter()
const isBoxOpen = ref(false)

const handleBoxOpen = () => {
  isBoxOpen.value = !isBoxOpen.value
}

const handleImg = (event) => {
  event.target.src = img
}
const handleLogout = async () => {
  try {
    await store.userLogout()
    router.push({ name: 'landing' })
  } catch (error) {
    console.error(error)
  }
}
</script>

<style lang="scss" scoped></style>
