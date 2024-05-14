<template>
  <div class="relative h-screen">
    <div class="absolute top-[15%] w-full">
      <main class="w-full flex flex-col font-kbizB">
        <div v-if="!store.isMoodSelected">
          <h1 class="text-white text-5xl">이전 페이지에서 오늘의 기분을 선택해주세요.</h1>
        </div>
        <div v-else>
          <!-- title -->
          <div class="flex items-center w-full">
            <h1 class="text-white text-5xl grow">Q. 어떤 영화가 취향이신가요?</h1>
            <div class="">
              <GlobalButton
                class="mr-5"
                :type="'white'"
                :text="'초기화'"
                @click="store.clearMoodMovieSelctList"
              />
              <GlobalButton :type="'mint'" :text="'추천 받기'" />
            </div>
          </div>
          <div class="h-[600px] mt-10">
            <swiper-container
              class="h-[600px]"
              :slidesPerView="4"
              :grid="{
                rows: 2,
              }"
              :spaceBetween="1"
              :pagination="{
                clickable: true,
              }"
              :modules="[Grid, Pagination]"
            >
              <swiper-slide v-for="movie in store.moodMovieList" :key="movie.id">
                <MovieCard :movieData="movie" />
              </swiper-slide>
            </swiper-container>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { useMovieRecommendStore } from '@/stores/movieRecommend'
import MovieCard from './MovieCard.vue'
import { Grid, Pagination } from 'swiper/modules'
import GlobalButton from './GlobalButton.vue'

const store = useMovieRecommendStore()
</script>

<style lang="scss" scoped></style>
