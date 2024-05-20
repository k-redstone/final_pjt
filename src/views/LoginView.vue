<template>
  <div>
    <div class="flex justify-center pt-[100px] mb-20">
      <div class="bg-gray w-[525px] px-4 py-2 rounded-lg">
        <div class="flex flex-col items-center">
          <!-- title -->
          <div class="mt-10 mb-5">
            <p class="font-summer text-5xl text-mint">Login</p>
          </div>
          <form class="font-kbizR" @submit.prevent="fetchLogin">
            <!-- username form -->
            <div class="mb-4 flex flex-col justify-between">
              <label class="text-mint text-xl py-2" for="userId">아이디</label>
              <input
                id="userId"
                class="w-[395px] h-[48px] pl-2 rounded-sm text-sm"
                placeholder="아이디를 입력해주세요"
                v-model="formData.username"
              />
            </div>
            <!-- password form -->
            <div class="flex flex-col justify-between">
              <label class="text-mint text-xl py-2" for="password">비밀번호</label>
              <input
                id="password"
                class="w-[395px] h-[48px] pl-2 rounded-sm text-sm"
                type="password"
                autoComplete="off"
                placeholder="비밀번호를 입력해주세요"
                v-model="formData.password"
              />
            </div>
            <div class="flex justify-start text-red-300 font-medium text-sm my-6 w-[395px]">
              <p>{{ errorMsg }}</p>
            </div>
            <div class="text-white">
              <p>
                아직 회원이 아니신가요?
                <RouterLink :to="{ name: 'signUp' }" class="underline">회원가입</RouterLink>
              </p>
            </div>
            <!-- login btn -->
            <div class="flex justify-center py-5">
              <GlobalButton
                class="w-[395px] h-[48px] font-kbizB"
                :type="'mint-outline'"
                :text="'Log In'"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import GlobalButton from '@/components/GlobalButton.vue'
import { FORM_ERROR_MESSAGE } from '@/constants/errorMessage'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
const store = useAuthStore()

const formData = ref({
  username: '',
  password: '',
})
const errorMsg = ref('')

const router = useRouter()

const fetchLogin = async () => {
  errorMsg.value = ''
  if (!formData.value.username || !formData.value.password) {
    errorMsg.value = FORM_ERROR_MESSAGE.login_empty_blank
    return
  }

  try {
    await store.userLogin(formData.value)
    await store.getUserInfo(formData.value.username)
    router.push({ name: 'home' })
  } catch (error) {
    errorMsg.value = error.response.data.message[0]
  }
}
</script>

<style scoped></style>
