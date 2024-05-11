<template>
  <div>
    <nav class="absolute">nva1</nav>
    <swiper-container
      :direction="'vertical'"
      :slidesPerView="1"
      :spaceBetween="30"
      :mousewheel="true"
      :pagination="{
        clickable: true,
      }"
      :modules="[Mousewheel, Pagination]"
      class="w-full h-screen"
    >
      <swiper-slide>Slide 1</swiper-slide>
      <swiper-slide>Slide 2</swiper-slide>
      <swiper-slide>Slide 3</swiper-slide>
      <swiper-slide>Slide 4</swiper-slide>
      <swiper-slide>Slide 5</swiper-slide>
      <swiper-slide>Slide 6</swiper-slide>
    </swiper-container>
  </div>
</template>

<script setup>
// Import Swiper Vue.js components

import { Mousewheel, Pagination } from 'swiper/modules'
</script>
