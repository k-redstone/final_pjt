import { defineStore } from 'pinia'
import axios from 'axios'
import { ref, computed } from 'vue'

export const useMovieRecommendStore = defineStore('movieRecommend', () => {
  const isLoading = ref(false)
  const isMoodSelected = ref(false)
  const moodMovieList = ref([])
  const moodMovieSelectList = ref(new Set())

  const moodMovieSelectCount = computed(() => {
    return moodMovieSelectList.value.size
  })

  const handleMoodSelect = (mood) => {
    console.log(mood)
    isLoading.value = false
    isMoodSelected.value = true

    const URL = 'https://api.themoviedb.org/3/movie/popular'
    const params = {
      language: 'ko-KR',
      api_key: import.meta.env.VITE_TMDB_API_KEY,
      page: 1,
    }
    axios
      .get(URL, { params: params })
      .then((res) => {
        moodMovieList.value = res.data.results
      })
      .catch((error) => {
        console.error(error)
      })
  }
  const clearMoodMovieSelctList = () => {
    moodMovieSelectList.value = new Set()
  }
  return {
    isMoodSelected,
    moodMovieSelectCount,
    moodMovieSelectList,
    moodMovieList,
    isLoading,
    handleMoodSelect,
    clearMoodMovieSelctList,
  }
})
