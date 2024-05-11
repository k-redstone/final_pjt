<template>
  <div class="bg-main-img bg-cover my-0 mx-auto">
    <div class="absolute w-full h-full bg-opacityGray"></div>
    <header class="absolute w-screen z-10">
      <HomeLayout>
        <NavBar />
      </HomeLayout>
    </header>
    <swiper-container
      :direction="'vertical'"
      :slidesPerView="1"
      :mousewheel="true"
      :pagination="{
        clickable: true,
      }"
      :modules="[Mousewheel, Pagination]"
      class="w-full h-screen"
      init="false"
    >
      <swiper-slide>
        <HomeLayout>
          <MainPage />
        </HomeLayout>
      </swiper-slide>
      <swiper-slide>
        <HomeLayout>
          <MainPage />
        </HomeLayout>
      </swiper-slide>
      <swiper-slide>
        <HomeLayout>
          <MainPage />
        </HomeLayout>
      </swiper-slide>
    </swiper-container>
  </div>
</template>

<script setup>
import { register } from 'swiper/element/bundle'
import { onMounted } from 'vue'
import { Mousewheel, Pagination } from 'swiper/modules'
import MainPage from '@/components/MainPage.vue'
import NavBar from '@/components/NavBar.vue'
import HomeLayout from '@/components/HomeLayout.vue'

register()
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
