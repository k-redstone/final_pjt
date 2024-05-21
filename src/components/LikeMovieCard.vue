<template>
  <div class="flex justify-center">
    <div class="w-[200px] text-white text-base font-kbizR">
      <div
        class="h-[301px] rounded-sm object-cover cursor-pointer"
        @click="moveDetailPage(movieData.db_movie_id)"
      >
        <img
          :src="'https://image.tmdb.org/t/p/original/' + movieData.poster_path"
          alt="movie_poster"
        />
      </div>
      <div class="mt-3 flex items-center">
        <p class="grow text-sm font-kbizB">{{ movieData.title }}</p>
        <!-- <span
          class="material-symbols-outlined text-3xl ml-3 cursor-pointer"
          @click="handleLike(movieData.db_movie_id)"
        >
          favorite
        </span> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
defineProps({
  movieData: Object,
})

const router = useRouter()

const moveDetailPage = (movieId) => {
  router.push({ name: 'movieDetail', params: { movieId: movieId } })
}
</script>

<style scoped></style>
