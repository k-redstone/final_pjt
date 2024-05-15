<template>
  <div class="relative">
    <div class="absolute top-[15%] w-full">
      <HomeLayout>
        <main class="w-full flex flex-col font-kbizB">
          <div>
            <!-- title -->
            <div class="flex items-center w-full">
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
  </div>
</template>

<script setup>
import { useMovieRecommendStore } from '@/stores/movieRecommend'
import HomeLayout from '@/components/HomeLayout.vue'
import LikeMovieCard from '@/components/LikeMovieCard.vue'

const store = useMovieRecommendStore()

console.log(store.similarMovieList)
</script>

<style lang="scss" scoped></style>
