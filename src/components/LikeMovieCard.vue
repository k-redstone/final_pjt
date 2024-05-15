<template>
  <div class="flex justify-center">
    <div class="w-[250px] text-white text-base font-kbizR">
      <div class="h-[375px] rounded-sm object-cover">
        <img
          :src="'https://image.tmdb.org/t/p/original/' + movieData.poster_path"
          alt="movie_poster"
        />
      </div>
      <div class="mt-3 flex items-center">
        <p class="grow text-lg font-kbizB">{{ movieData.title }}</p>
        <span class="material-symbols-outlined text-3xl ml-3"> favorite </span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  movieData: Object,
})
</script>

<style scoped></style>
