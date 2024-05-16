<template>
  <div class="pt-10 w-full">
    <nav class="flex font-bold items-center">
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
          <!-- <RouterLink :to="{ name: 'home' }">
            <li>Home</li>
          </RouterLink> -->
          <RouterLink :to="{ name: 'movie' }">
            <li>Movie</li>
          </RouterLink>
          <RouterLink :to="{ name: 'community' }">
            <li>Community</li>
          </RouterLink>
        </ul>
      </div>
      <RouterLink
        class="flex items-center text-white"
        :to="{ name: 'profile', params: { username: username } }"
      >
        <span class="material-symbols-outlined text-white text-3xl mr-4"> account_circle </span>
        <span class="text-xl font-kbizR">admin</span>
      </RouterLink>
    </nav>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
// 임시
import { ref } from 'vue'
const username = ref('Admin')
// 프로필 페이지 이동할 때 사용
const store = useAuthStore()
</script>

<style lang="scss" scoped></style>
