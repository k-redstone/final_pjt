<template>
  <div class="pt-[100px]">
    <HomeLayout>
      <div class="flex justify-center translate-y-1/4 qhd:translate-y-1/2">
        <div class="bg-gray w-[646px] h-[425px] rounded-lg">
          <div class="flex flex-col items-center">
            <!-- title -->
            <div class="my-10">
              <p class="font-summer text-5xl text-mint">Login</p>
            </div>
            <form class="w-[411px]" @submit.prevent="fetchLogin">
              <!-- username form -->
              <div class="my-10 flex justify-between">
                <label class="text-mint font-kbiz text-2xl" for="userId">아이디</label>
                <input
                  id="userId"
                  class="w-[281px] h-[34px] pl-2 rounded-sm"
                  placeholder="아이디를 입력해주세요"
                  v-model="userId"
                />
              </div>
              <!-- password form -->
              <div class="my-5 flex justify-between">
                <label class="text-mint font-kbiz text-2xl" for="password">비밀번호</label>
                <input
                  id="password"
                  class="w-[281px] h-[34px] pl-2 rounded-sm"
                  type="password"
                  autoComplete="off"
                  placeholder="비밀번호를 입력해주세요"
                  v-model="password"
                />
              </div>
              <div class="flex justify-center text-red-300 font-medium text-lg">
                <p>{{ errorMsg }}</p>
              </div>
              <!-- login btn -->
              <div class="flex justify-center mt-4">
                <GlobalButton :type="'mint'" :text="'Log In'" />
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
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'

const store = useAuthStore()
const userId = ref('')
const password = ref('')

const errorMsg = ref('')

const fetchLogin = () => {
  errorMsg.value = ''

  if (userId.value === '' || password.value === '') {
    errorMsg.value = '아이디 또는 비빌번호를 입력해주세요'
    return
  }

  const data = {
    userId: userId.value,
    password: password.value,
  }

  store.userLogin(data)
  userId.value = ''
  password.value = ''
}
</script>

<style scoped></style>
