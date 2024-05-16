<template>
  <div class="pt-10 w-full">
    <nav class="h-[50px] flex font-bold items-center overflow-hidden">
      <!-- link -->
      <div class="grow">
        <ul class="flex text-2xl text-white items-end gap-x-5">
          <RouterLink :to="{ name: 'home' }">
            <li class="mr-3">
              <div class="relative w-[82px] h-[50px]">
                <img class="absolute w-full h-full" src="@/assets/img/logo.png" alt="logo_img" />
              </div>
            </li>
          </RouterLink>
          <RouterLink :to="{ name: 'movie' }">
            <li>Movie</li>
          </RouterLink>
          <RouterLink :to="{ name: 'community' }">
            <li>Community</li>
          </RouterLink>
        </ul>
      </div>
      <div class="flex flex-col items-center text-white float-left">
        <div class="flex items-center cursor-pointer peer" @click="handleBoxOpen">
          <span class="material-symbols-outlined text-white text-3xl mr-4"> account_circle </span>
          <span class="text-xl font-kbizR">admin</span>
        </div>
        <div
          class="absolute hidden peer-hover:block peer-hover:translate-y-8 hover:block hover:translate-y-8"
        >
          <div class="w-full flex flex-col items-center gap-y-2">
            <RouterLink :to="{ name: 'profile', params: { username: username } }" class="mt-2">
              <span>My Profile</span>
            </RouterLink>
            <span>Logout</span>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
// 임시
const username = ref('Admin')
// 프로필 페이지 이동할 때 사용
const store = useAuthStore()

const isBoxOpen = ref(false)

const handleBoxOpen = () => {
  isBoxOpen.value = !isBoxOpen.value
}
</script>

<style lang="scss" scoped></style>
