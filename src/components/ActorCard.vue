<template>
  <div class="flex flex-col gap-y-2">
    <div class="w-[132px]">
      <img :src="'https://image.tmdb.org/t/p/original/' + actorData[2]" alt="movie_poster" />
    </div>
    <span class="text-white text-center text-sm">{{ actorData[0] }}</span>
  </div>
</template>

<script setup>
defineProps({
  actorData: Object,
})
</script>
