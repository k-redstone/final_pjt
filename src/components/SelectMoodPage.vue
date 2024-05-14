<template>
  <div class="relative h-screen">
    <div class="absolute top-1/4 w-full">
      <main class="w-full flex flex-col font-kbizB">
        <!-- msg -->
        <div>
          <p class="text-white text-5xl">Q. 오늘 당신의 기분은 어떠신가요?</p>
        </div>
        <!-- selectBox -->
        <div class="flex justify-around mt-20">
          <MoodCard
            v-for="mood in moods"
            :key="mood"
            :selectMood="selectedMood"
            :text="mood"
            @click="handleSelect(mood)"
          />
        </div>
        <!-- select btn -->
        <div class="flex justify-center mt-28">
          <GlobalButton :type="'mint'" :text="'선택'" @click="submitMood" />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { useMovieRecommendStore } from '@/stores/movieRecommend'
import GlobalButton from './GlobalButton.vue'
import MoodCard from './MoodCard.vue'
import { ref } from 'vue'

const store = useMovieRecommendStore()
const selectedMood = ref('')

const moods = ref(['행복해요', '슬퍼요', '화가나요', '따분해요'])

const handleSelect = (mood) => {
  selectedMood.value = mood
}

const submitMood = () => {
  if (selectedMood.value === '') {
    return
  }
  store.handleMoodSelect(selectedMood.value)
  alert(`${selectedMood.value}가 선택되었습니다.`)
}
</script>

<style lang="scss" scoped></style>
