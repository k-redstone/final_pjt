import OpenAI from 'openai'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { SETTING } from '@/constants/settings'

import { useMovieRecommendStore } from './movieRecommend'

export const useGptStore = defineStore('gpt', () => {
  const chat = ref(null)
  const chatList = ref([])
  const gptMessageList = ref([
    { role: 'system', content: 'You are an expert in recommending movies and Korean.' },
    { role: 'user', content: '앞으로 답변은 한국어로 해줘' },
    {
      role: 'user',
      content:
        '사용자가 입력한 감정을 해소할 수 있는 장르를 3개 추천해줘. (추천 장르는 보여주지 않아도 괜찮아)',
    },
    {
      role: 'user',
      content:
        '앞에서 추천해준 장르별로 영화를 3개씩 추천해주고, 중복되지 않는 추가 추천 영화도 3개 추천해줘.',
    },
    { role: 'user', content: '12개의 영화를 영화 제목만 리스트에 담아줘.' },
    {
      role: 'user',
      content:
        '추천된 영화를 하나의 json 형식 만들어줘. 예시는 {movies: 추천된 영화로 이루어진 리스트]',
    },
  ])
  const isLoading = ref(false)
  const isSelectMood = ref(false)
  const isShowMovie = ref(false)
  const store = useMovieRecommendStore()

  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_GPT_API_KEY,
    dangerouslyAllowBrowser: true,
  })

  const getChatList = computed(() => chatList.value)

  const setUserMood = async (mood) => {
    console.log(mood)
    isSelectMood.value = true
    isLoading.value = true

    chat.value = {
      content: SETTING[mood],
      type: 'user',
      loading: false,
    }
    chatList.value.push(chat.value)

    chat.value = {
      content: '당신의 기분에 어울리는 영화를 찾아 드리겠습니다.',
      type: 'system',
      loading: true,
    }
    chatList.value.push(chat.value)

    gptMessageList.value.push({ role: 'user', content: '슬퍼요' })
    fetchGptMood(chat.value)
  }

  const setUserSelectMovie = (movieList) => {
    // console.log(mood)
    isShowMovie.value = false

    chat.value = {
      content: '나는 이러한 영화를 좋아해',
      type: 'user',
      loading: false,
    }
    chatList.value.push(chat.value)

    chat.value = {
      content: '오늘 당신을 위한 영화를 찾아드리겠습니다.',
      type: 'system',
      loading: true,
    }
    chatList.value.push(chat.value)

    movieList.forEach((movie) => {
      gptMessageList.value.push({ role: 'user', content: `나는 영화 ${movie}를 좋아해 ` })
    })
    gptMessageList.value.push({
      role: 'user',
      content:
        '사용자가 입력한 영화와 비슷한 영화를 총 12개 추천해줘. 앞에서 추천해준 영화와 중복되지 않는 영화를 추천해줘.',
    })
    fetchGptMovie(chat.value)
  }

  const fetchGptMood = async (chat) => {
    let gptResponse = await fetchGpt(gptMessageList.value)
    await store.fetchMoodMovie(gptResponse)
    chat.content +=
      '\r\n당신의 취향에 맞는 영화를 골라주세요. 영화는 최대 3개까지 고를 수 있습니다.'
    chat.loading = false
    isShowMovie.value = true
  }

  const fetchGptMovie = async (chat) => {
    let gptResponse = await fetchGpt(gptMessageList.value)
    console.log(gptResponse)
    await store.fetchMoodMovie(gptResponse)
    chat.loading = false
    isShowMovie.value = true
  }

  const fetchGpt = async (messages) => {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: messages,
      temperature: 0.85,
      max_tokens: 1000,
      response_format: { type: 'json_object' },
    })
    return JSON.parse(response.choices[0].message['content'].trim())
  }

  return {
    chatList,
    isLoading,
    isSelectMood,
    isShowMovie,
    getChatList,
    setUserSelectMovie,
    setUserMood,
    fetchGptMood,
    fetchGptMovie,
  }
})
