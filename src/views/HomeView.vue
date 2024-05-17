<template>
  <div class="flex flex-col">
    <div>
      <swiper-container
        v-show="isLogin"
        :hashNavigation="{
          watchState: true,
        }"
        :direction="'vertical'"
        :slidesPerView="1"
        :mousewheel="true"
        :pagination="{
          clickable: true,
        }"
        :modules="[Mousewheel, Pagination, Navigation]"
        class="fixed w-full h-screen top-0 left-0"
        init="false"
      >
        <swiper-slide data-hash="mainPage">
          <WrapLayout>
            <MainPage />
          </WrapLayout>
        </swiper-slide>
        <swiper-slide data-hash="selectMoodPage">
          <div class="absolute w-screen h-screen bg-opacityGray"></div>
          <WrapLayout>
            <SelectMoodPage />
          </WrapLayout>
        </swiper-slide>
        <swiper-slide data-hash="selectMoviePage">
          <div class="absolute w-screen h-screen bg-opacityGray"></div>
          <WrapLayout>
            <SelectMoviePage />
          </WrapLayout>
        </swiper-slide>
      </swiper-container>
    </div>
  </div>
</template>

<script setup>
import { register } from 'swiper/element/bundle'
import { ref, onMounted } from 'vue'
import { Mousewheel, Pagination, Navigation } from 'swiper/modules'
import MainPage from '@/pages/mood/MainPage.vue'
import SelectMoodPage from '@/pages/mood/SelectMoodPage.vue'
import SelectMoviePage from '@/pages/mood/SelectMoviePage.vue'
import WrapLayout from '@/layout/WrapLayout.vue'

register()

const isLogin = ref(true)

onMounted(() => {
  const swiperEl = document.querySelector('swiper-container')
  console.log(swiperEl)
  const params = {
    injectStyles: [
      `
      .swiper-pagination-bullet {
        width:24px;
        height:24px;
        background: #FFFFFF;
      }
      .swiper-pagination-bullet-active {
        background: #60F2BE;
      }
      `,
    ],
  }
  console.log(params)
  Object.assign(swiperEl, params)

  swiperEl.initialize()
})
</script>

<style scoped></style>
