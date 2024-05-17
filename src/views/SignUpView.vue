<template>
  <div>
    <div class="flex justify-center mt-12 pt-[100px]">
      <div class="bg-gray w-[525px] px-4 py-2 rounded-lg">
        <div class="flex flex-col items-center">
          <!-- title -->
          <div class="my-10">
            <p class="font-summer text-5xl text-mint">Sign Up</p>
          </div>
          <form class="font-kbizR" @submit.prevent="fetchRegister">
            <!-- username form -->
            <div class="mb-1 flex flex-col justify-between">
              <label class="text-mint text-2xl py-2" for="userId">아이디</label>
              <input
                id="userId"
                class="w-[395px] h-[48px] pl-2 rounded-sm"
                placeholder="아이디를 입력해주세요"
                v-model="formData.username"
              />
            </div>
            <!-- error MSG -->
            <div class="text-red-300 text-sm w-[395px]">
              <p>{{ store.signUpErrorMsg.username }}</p>
            </div>
            <!-- nickname form -->
            <div class="mb-1 flex flex-col justify-between">
              <label class="text-mint text-2xl py-2" for="username">닉네임</label>
              <input
                id="username"
                class="w-[395px] h-[48px] pl-2 rounded-sm"
                placeholder="닉네임을 입력해주세요"
                v-model="formData.nickname"
              />
            </div>
            <!-- error MSG -->
            <div class="text-red-300 text-sm w-[395px]">
              <p>{{ store.signUpErrorMsg.nickname }}</p>
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
                v-model="formData.password1"
              />
            </div>
            <!-- error MSG -->
            <div class="text-red-300 text-sm w-[395px]">
              <p>{{ store.signUpErrorMsg.password1 }}</p>
            </div>
            <!-- confirm_password form -->
            <div class="flex flex-col justify-between">
              <label class="text-mint text-2xl py-2" for="password_confirm">비밀번호 확인</label>
              <input
                id="password_confirm"
                class="w-[395px] h-[48px] pl-2 rounded-sm"
                type="password"
                autoComplete="off"
                placeholder="비밀번호를 다시 입력해주세요"
                v-model="formData.password2"
              />
            </div>
            <!-- error MSG -->
            <div class="text-red-300 text-sm w-[395px]">
              <p>{{ store.signUpErrorMsg.password2 }}</p>
            </div>
            <!-- privacy -->
            <div class="mt-3">
              <div>
                <input type="checkbox" id="tos" value="tos" v-model="formData.isPosChecked" />
                <label class="text-white text-base ml-2" for="tos"
                  >이용약관 동의(필수)
                  <span class="underline underline-offset-2 text-sm">자세히</span>
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="privacy"
                  value="privacy"
                  v-model="formData.isPrivacyChecked"
                />
                <label class="text-white text-base ml-2" for="privacy"
                  >개인정보 수집 및 이용동의(필수)
                  <span class="underline underline-offset-2 text-sm">자세히</span>
                </label>
              </div>
              <!-- error MSG -->
              <div class="text-red-300 text-sm w-[395px]">
                <p>{{ store.signUpErrorMsg.privacy }}</p>
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
  </div>
</template>

<script setup>
import GlobalButton from '@/components/GlobalButton.vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'

const store = useAuthStore()
const router = useRouter()

const formData = ref({
  username: '',
  nickname: '',
  password1: '',
  password2: '',
  isPosChecked: false,
  isPrivacyChecked: false,
})

const fetchRegister = async () => {
  const status = await store.userRegister(formData.value)
  if (status === true) {
    router.push({ name: 'home' })
  }
}
</script>
