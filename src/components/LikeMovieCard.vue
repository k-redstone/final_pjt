<template>
  <div class="flex justify-center">
    <div class="w-[200px] text-white text-base font-kbizR">
      <div
        class="h-[301px] rounded-sm object-cover cursor-pointer flex flex-col justify-end"
        @click="moveDetailPage(movieData.db_movie_id)"
      >
        <img
          :src="'https://image.tmdb.org/t/p/original/' + movieData.poster_path"
          alt="movie_poster"
          @error="handleImg"
        />
      </div>
      <div class="flex mt-3 items-center">
        <p class="grow text-sm font-kbizB">{{ movieData.title }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import img from '@/assets/img/no_image.png'
import { useRouter } from 'vue-router'
defineProps({
  movieData: Object,
})

const router = useRouter()

const moveDetailPage = (movieId) => {
  router.push({ name: 'movieDetail', params: { movieId: movieId } })
}

const handleImg = (event) => {
  event.target.src = img
}
</script>

<style scoped></style>
