<template>
  <div class="flex justify-center">
    <div class="w-[132px] text-white text-base font-kbizR" @click="handleMovieSelect">
      <div class="h-[200px] rounded-sm object-cover box-border">
        <img
          :src="'https://image.tmdb.org/t/p/original/' + movieData.poster_path"
          alt="movie_poster"
          @error="handleImg"
        />
      </div>
      <p class="pt-2 text-center text-xs">{{ movieData.title }}</p>
    </div>
    <template v-if="isModalOpen">
      <MovieDetailModal :movie-data="movieData" @handle-modal="handleModalOpen" />
    </template>
  </div>
</template>

<script setup>
import img from '@/assets/img/no_image.png'
import { ref } from 'vue'
import MovieDetailModal from './MovieDetailModal.vue'
defineProps({
  movieData: Object,
})

const isModalOpen = ref(false)

const handleMovieSelect = () => {
  handleModalOpen()
}

const handleModalOpen = () => {
  console.log('emit')
  isModalOpen.value = !isModalOpen.value
}

const handleImg = (event) => {
  event.target.src = img
}
</script>

<style scoped></style>
