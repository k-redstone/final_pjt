import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'

export const useMovieRecommendStore = defineStore('movieRecommend', () => {
  const isLoading = ref(true)
  const ismoodSelected = ref(false)

  const handleMoodSelect = (mood) => {
    console.log(mood)
    isLoading.value = true
  }

  return { ismoodSelected, isLoading, handleMoodSelect }
})
