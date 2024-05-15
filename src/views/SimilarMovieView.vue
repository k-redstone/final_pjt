<template>
  <div class="flex flex-col">
    <HomeLayout>
      <header>
        <NavBar />
      </header>
      <main class="w-full flex flex-col font-kbizB">
        <div>
          <!-- title -->
          <div class="flex items-center w-full my-10">
            <h1 class="text-white text-5xl">오늘 당신을 위한 영화입니다</h1>
          </div>
        </div>
        <div class="grid grid-cols-4 gap-5">
          <LikeMovieCard
            v-for="movieData in store.similarMovieList"
            :movieData="movieData"
            :key="movieData.id"
          />
        </div>
      </main>
    </HomeLayout>
  </div>
</template>

<script setup>
import { useMovieRecommendStore } from '@/stores/movieRecommend'
import HomeLayout from '@/components/HomeLayout.vue'
import LikeMovieCard from '@/components/LikeMovieCard.vue'
import NavBar from '@/components/NavBar.vue'

const store = useMovieRecommendStore()

console.log(store.similarMovieList)
</script>

<style lang="scss" scoped></style>
