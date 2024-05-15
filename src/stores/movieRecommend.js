import { defineStore } from 'pinia'
import axios from 'axios'
import { ref, computed } from 'vue'
import _ from 'lodash'

export const useMovieRecommendStore = defineStore('movieRecommend', () => {
  const isLoading = ref(false)
  const isMoodSelected = ref(false)
  const moodMovieList = ref([])
  const moodMovieSelectList = ref(new Set())
  const similarMovieList = ref([])

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

  const getSimilarMovies = () => {
    if (moodMovieSelectList.value.size === 0) {
      alert('영화를 최소 1개 이상 선택해주세요')
      return
    }

    const params = {
      language: 'ko-KR',
      api_key: import.meta.env.VITE_TMDB_API_KEY,
      page: 1,
    }

    moodMovieSelectList.value.forEach((movieId) => {
      const URL = `https://api.themoviedb.org/3/movie/${movieId}/similar`
      axios
        .get(URL, { params: params })
        .then((res) => {
          const randomMovieList = _.sampleSize(res.data.results, 10)
          similarMovieList.value.push(...randomMovieList)
        })
        .catch((error) => {
          console.error(error)
        })
    })
  }

  const clearMoodMovieSelctList = () => {
    moodMovieSelectList.value = new Set()
  }
  return {
    isMoodSelected,
    similarMovieList,
    moodMovieSelectCount,
    moodMovieSelectList,
    moodMovieList,
    isLoading,
    handleMoodSelect,
    getSimilarMovies,
    clearMoodMovieSelctList,
  }
})
