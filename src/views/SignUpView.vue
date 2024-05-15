<template>
  <div>
    <HomeLayout>
      <header>
        <NavBar />
      </header>
      <div class="flex justify-center mt-12 pt-[100px]">
        <div class="bg-gray w-[525px] px-4 py-2 rounded-lg">
          <div class="flex flex-col items-center">
            <!-- title -->
            <div class="my-10">
              <p class="font-summer text-5xl text-mint">Sign Up</p>
            </div>
            <form class="font-kbizR" @submit.prevent="fetchLogin">
              <!-- userId form -->
              <div class="mb-1 flex flex-col justify-between">
                <label class="text-mint text-2xl py-2" for="userId">아이디</label>
                <input
                  id="userId"
                  class="w-[395px] h-[48px] pl-2 rounded-sm"
                  placeholder="아이디를 입력해주세요"
                  v-model="userId"
                />
              </div>
              <!-- username form -->
              <div class="mb-1 flex flex-col justify-between">
                <label class="text-mint text-2xl py-2" for="username">닉네임</label>
                <input
                  id="username"
                  class="w-[395px] h-[48px] pl-2 rounded-sm"
                  placeholder="닉네임을 입력해주세요"
                  v-model="username"
                />
              </div>
              <!-- password form -->
              <div class="flex flex-col justify-between">
                <label class="text-mint text-2xl py-2" for="password">비밀번호</label>
                <input
                  id="password"
                  class="w-[395px] h-[48px] pl-2 rounded-sm"
                  type="password"
                  autoComplete="off"
                  placeholder="비밀번호를 입력해주세요"
                  v-model="password"
                />
              </div>
              <!-- error MSG -->
              <div class="flex justify-center text-red-300 font-medium text-lg my-3 w-[395px]">
                <p>{{ errorMsg }}</p>
              </div>
              <!-- privacy -->
              <div>
                <div>
                  <input type="checkbox" id="tos" value="tos" v-model="isPosChecked" />
                  <label class="text-white text-base ml-2" for="tos"
                    >이용약관 동의(필수)
                    <span class="underline underline-offset-2 text-sm">자세히</span>
                  </label>
                </div>
                <div>
                  <input type="checkbox" id="privacy" value="privacy" v-model="isPrivacyChecked" />
                  <label class="text-white text-base ml-2" for="privacy"
                    >개인정보 수집 및 이용동의(필수)
                    <span class="underline underline-offset-2 text-sm">자세히</span>
                  </label>
                </div>
              </div>

              <!-- login btn -->
              <div class="flex justify-center py-5">
                <GlobalButton
                  class="w-[395px] h-[48px] text-xl font-kbizB"
                  :type="'mint'"
                  :text="'Sign Up'"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </HomeLayout>
  </div>
</template>

<script setup>
import HomeLayout from '@/components/HomeLayout.vue'
import GlobalButton from '@/components/GlobalButton.vue'
import NavBar from '@/components/NavBar.vue'
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'

const store = useAuthStore()
const userId = ref('')
const username = ref('')
const password = ref('')
const isPosChecked = ref(false)
const isPrivacyChecked = ref(false)
const errorMsg = ref('')

const fetchLogin = () => {
  errorMsg.value = ''
  if (isPosChecked.value === false || isPrivacyChecked.value === false) {
    errorMsg.value = '이용약관에 동의해주세요.'
    return
  }

  if (userId.value === '' || password.value === '' || username.value === '') {
    errorMsg.value = '빈칸이 존재합니다.'
    userId.value = ''
    password.value = ''
    username.value = ''
    return
  }

  const data = {
    userId: userId.value,
    username: username.value,
    password: password.value,
  }

  store.userLogin(data)
  userId.value = ''
  password.value = ''
  username.value = ''
}
</script>

<style scoped></style>
