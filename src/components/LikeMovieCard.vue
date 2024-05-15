<template>
  <div>
    <div class="w-[162px] h-[276px] text-white text-base font-kbizR">
      <div class="w-full h-[245px] rounded-sm object-cover">
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
defineProps({
  movieData: Object,
})
</script>

<style scoped></style>
