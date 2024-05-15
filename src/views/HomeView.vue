<template>
  <div class="flex flex-col">
    <!-- 네비게이션바 -->
    <HomeLayout>
      <header class="fixed z-50 w-[1280px]">
        <NavBar />
      </header>
    </HomeLayout>
    <div>
      <div v-show="!isLogin">
        <HomeLayout>
          <LandingPage />
        </HomeLayout>
      </div>
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
        class="fixed w-full h-screen z-0"
        init="false"
      >
        <swiper-slide data-hash="mainPage">
          <HomeLayout>
            <MainPage />
          </HomeLayout>
        </swiper-slide>
        <swiper-slide data-hash="selectMoodPage">
          <div class="absolute w-screen h-screen bg-opacityGray"></div>
          <HomeLayout>
            <SelectMoodPage />
          </HomeLayout>
        </swiper-slide>
        <swiper-slide data-hash="selectMoviePage">
          <div class="absolute w-screen h-screen bg-opacityGray"></div>
          <HomeLayout>
            <SelectMoviePage />
          </HomeLayout>
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
import LandingPage from '@/pages/LandingPage.vue'
import HomeLayout from '@/components/HomeLayout.vue'
import NavBar from '@/components/NavBar.vue'
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
