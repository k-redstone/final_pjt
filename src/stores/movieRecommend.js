import { defineStore } from 'pinia'
import axios from 'axios'
import { ref, computed } from 'vue'

export const useMovieRecommendStore = defineStore('movieRecommend', () => {
  const moodMovieList = ref([])
  const moodMovieSelectList = ref(new Set())

  const moodMovieSelectCount = computed(() => {
    return moodMovieSelectList.value.size
  })

  const fetchMoodMovie = async (gptResponse) => {
    const URL = import.meta.env.VITE_BACKEND_URL
    await axios({
      method: 'post',
      url: URL + 'movies/search_poster/',
      data: gptResponse,
    }).then((res) => {
      moodMovieList.value = res.data
    })
  }

  const clearMoodMovieSelctList = () => {
    moodMovieSelectList.value = new Set()
  }

  const resetValue = () => {
    moodMovieList.value = []
    clearMoodMovieSelctList()
  }
  return {
    moodMovieSelectCount,
    moodMovieSelectList,
    moodMovieList,
    fetchMoodMovie,
    clearMoodMovieSelctList,
    resetValue,
  }
})
