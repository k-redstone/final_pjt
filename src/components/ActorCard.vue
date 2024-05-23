<template>
  <div class="flex flex-col gap-y-2">
    <div class="w-[132px]">
      <img
        :src="'https://image.tmdb.org/t/p/original/' + actorData[2]"
        alt="movie_poster"
        @error="handleImg"
      />
    </div>
    <span class="text-white text-center text-sm">{{ actorData[0] }}</span>
  </div>
</template>

<script setup>
import img from '@/assets/img/no_image.png'
defineProps({
  actorData: Object,
})

const handleImg = (event) => {
  event.target.src = img
}
</script>
