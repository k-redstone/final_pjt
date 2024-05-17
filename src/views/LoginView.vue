<template>
  <div>
    <div class="flex justify-center mt-12 pt-[100px]">
      <div class="bg-gray w-[525px] px-4 py-2 rounded-lg">
        <div class="flex flex-col items-center">
          <!-- title -->
          <div class="my-10">
            <p class="font-summer text-5xl text-mint">Login</p>
          </div>
          <form class="font-kbizR" @submit.prevent="fetchLogin">
            <!-- username form -->
            <div class="mb-4 flex flex-col justify-between">
              <label class="text-mint text-2xl py-2" for="userId">아이디</label>
              <input
                id="userId"
                class="w-[395px] h-[48px] pl-2 rounded-sm"
                placeholder="아이디를 입력해주세요"
                v-model="formData.username"
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
                v-model="formData.password"
              />
            </div>
            <div class="flex justify-center text-red-300 font-medium text-lg mt-6 w-[395px]">
              <p>{{ errorMsg }}</p>
            </div>
            <!-- login btn -->
            <div class="flex justify-center py-5">
              <GlobalButton class="w-[395px] h-[48px] font-kbizB" :type="'mint'" :text="'Log In'" />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import GlobalButton from '@/components/GlobalButton.vue'
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
    errorMsg.value = '아이디 또는 비빌번호를 입력해주세요'
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
