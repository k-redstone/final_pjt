<template>
  <div>
    <div
      class="w-[162px] h-[276px] text-white text-base font-kbizR"
      @click="handleMovieSelect(movieData.id)"
    >
      <div
        class="w-full h-[245px] rounded-sm object-cover"
        :class="{ 'border-red-200 border-4': isSelect }"
      >
        <img
          :src="'https://image.tmdb.org/t/p/original/' + movieData.poster_path"
          alt="movie_poster"
        />
      </div>
      <p class="text-center">{{ movieData.title }}</p>
    </div>
  </div>
</template>

<script setup>
import { useMovieRecommendStore } from '@/stores/movieRecommend'
import { ref, watch } from 'vue'
defineProps({
  movieData: Object,
})
const store = useMovieRecommendStore()

const isSelect = ref(false)

const handleMovieSelect = (movieId) => {
  if (isSelect.value === true) {
    isSelect.value = false
    store.moodMovieSelectList.delete(movieId)
    return
  }
  if (store.moodMovieSelectCount === 3) {
    return
  }
  isSelect.value = true
  store.moodMovieSelectList.add(movieId)
}

watch(
  () => store.moodMovieSelectList,
  () => {
    isSelect.value = false
  },
)
</script>

<style scoped></style>
