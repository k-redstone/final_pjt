<template>
  <div>
    <main class="w-full font-kbizB">
      <div class="flex items-center w-full my-10 px-8">
        <div class="w-full h-[705px] flex box-border bg-[#242323] rounded-xl">
          <!-- chat -->
          <div class="box-border w-[525px] h-full border-white border-r-2">
            <div
              id="gptBox"
              class="w-full h-full overflow-hidden overflow-y-scroll mix-blend-normal"
            >
              <div class="py-5 pl-4 pr-2 flex flex-col gap-y-3">
                <div class="w-full text-white">
                  <p>Mood Movie</p>
                  <div
                    class="w-[303px] h-[90px] bg-[#232636] py-1 px-5 flex flex-col justify-around rounded-xl"
                  >
                    <p>오늘 당신의 기분은 어떠신가요?</p>
                    <div
                      class="w-[132px] flex justify-center items-center py-1 fill-none border-white border-2 rounded-2xl"
                    >
                      <span class="text-sm cursor-pointer" @click="handleSelectMood"
                        >다 골랐어요</span
                      >
                    </div>
                  </div>

                  <!-- 감정 선택 -->
                  <div class="w-[303px] mt-4 grid grid-cols-2 gap-2">
                    <div
                      class="w-[101px] flex justify-center items-center py-1 bg-[#232636] rounded-2xl box-border"
                      :class="selectedMood === '기뻐요' && 'border-white border-2'"
                      @click="handleSelect('기뻐요')"
                    >
                      <span class="text-sm">😭 행복</span>
                    </div>
                    <div
                      class="w-[101px] flex justify-center items-center py-1 bg-[#232636] rounded-2xl box-border"
                      :class="selectedMood === '슬퍼요' && 'border-white border-2'"
                      @click="handleSelect('슬퍼요')"
                    >
                      <span class="text-sm">😭 슬픔</span>
                    </div>
                    <div
                      class="w-[101px] flex justify-center items-center py-1 bg-[#232636] rounded-2xl box-border"
                      :class="selectedMood === '화나요' && 'border-white border-2'"
                      @click="handleSelect('화나요')"
                    >
                      <span class="text-sm">😭 화남</span>
                    </div>
                    <div
                      class="w-[101px] flex justify-center items-center py-1 bg-[#232636] rounded-2xl box-border"
                      :class="selectedMood === '지루해요' && 'border-white border-2'"
                      @click="handleSelect('지루해요')"
                    >
                      <span class="text-sm">😭 지루</span>
                    </div>
                  </div>
                </div>

                <div v-for="chat in gptStore.getChatList" :key="chat.content">
                  <template v-if="chat.type === 'system'">
                    <GptChatBox :text="chat.content" :chat="chat" />
                  </template>
                  <template v-else>
                    <UserChatBox :text="chat.content" :chat="chat" />
                  </template>
                </div>
              </div>
            </div>
          </div>
          <!-- movie content -->
          <div class="grow py-5 px-3">
            <template v-if="gptStore.isShowMovie">
              <div class="h-full relative flex flex-col">
                <div v-if="!isSelectRecommend" class="text-white flex items-center mb-5">
                  <p class="grow text-red-200 text-lg">{{ errorMsg }}</p>
                  <div>
                    <GlobalButton
                      class="mr-5"
                      :type="'white'"
                      :text="'초기화'"
                      @click="movieStore.clearMoodMovieSelctList"
                    />
                    <GlobalButton
                      :type="'mint-outline'"
                      :text="'다 골랐어요'"
                      @click="handleRecommendBtn"
                    />
                  </div>
                </div>
                <div v-else class="flex items-center justify-end mb-5">
                  <div>
                    <GlobalButton
                      class="mr-5"
                      :type="'white'"
                      :text="'다시 추천받기'"
                      @click="handleReroll"
                    />
                  </div>
                </div>
                <div
                  id="movieBox"
                  class="w-full grid grid-cols-2 gap-y-5 overflow-hidden overflow-y-scroll"
                >
                  <MovieCard
                    v-for="movie in movieStore.moodMovieList"
                    :movie-data="movie"
                    :key="movie.id"
                  />
                </div>
              </div>
            </template>
            <template v-else>
              <div class="flex items-center justify-center h-full w-full">
                <div class="w-[200px]">
                  <img
                    class="w-full -translate-y-20 animate-pulse"
                    src="@/assets/img/logo.png"
                    alt="logo_img"
                  />
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import GptChatBox from '@/components/chatBox/GptChatBox.vue'
import UserChatBox from '@/components/chatBox/UserChatBox.vue'
import MovieCard from '@/components/MovieCard.vue'
import { useGptStore } from '@/stores/gpt'
import { useMovieRecommendStore } from '@/stores/movieRecommend'
import { onBeforeRouteLeave } from 'vue-router'
import { ref, watch } from 'vue'
import GlobalButton from '@/components/GlobalButton.vue'

const gptStore = useGptStore()
const movieStore = useMovieRecommendStore()

const isSelectRecommend = ref(false)
const errorMsg = ref('')
const selectedMood = ref('')

onBeforeRouteLeave(() => {
  gptStore.resetValue()
  movieStore.resetValue()
})

const handleSelect = (mood) => {
  selectedMood.value = mood
}

const handleSelectMood = () => {
  if (gptStore.isSelectMood) return
  if (selectedMood.value === '') return
  gptStore.setUserMood(selectedMood.value)
}

const handleRecommendBtn = () => {
  if (movieStore.moodMovieSelectCount === 0) {
    errorMsg.value = '최소 1개 이상을 선택해주세요.'
    return
  }
  isSelectRecommend.value = true
  gptStore.setUserSelectMovie(movieStore.moodMovieSelectList)
}

const handleReroll = () => {
  gptStore.resetValue()
  movieStore.resetValue()
  isSelectRecommend.value = false
  errorMsg.value = ''
  selectedMood.value = ''
}

watch(
  () => movieStore.moodMovieSelectCount,
  () => {
    if (movieStore.moodMovieSelectCount === 3) {
      errorMsg.value = '최대 3개를 선택할 수 있습니다.'
    } else {
      errorMsg.value = ''
    }
  },
)
</script>
