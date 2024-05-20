<template>
  <div>
    <div class="flex justify-center pt-[100px] mb-20">
      <div class="bg-gray w-[525px] px-4 py-2 rounded-lg">
        <div class="flex flex-col items-center">
          <!-- title -->
          <div class="mt-10 mb-5">
            <p class="font-summer text-5xl text-mint">Sign Up</p>
          </div>
          <form class="font-kbizR" @submit.prevent="fetchRegister">
            <!-- username form -->
            <div class="mb-1 flex flex-col justify-between">
              <label class="text-mint text-xl py-2" for="userId">아이디</label>
              <input
                id="userId"
                class="w-[395px] h-[48px] pl-2 rounded-sm text-sm"
                placeholder="아이디를 입력해주세요"
                v-model="formData.username"
              />
            </div>
            <!-- error MSG -->
            <div class="text-red-300 text-sm w-[395px]">
              <p>{{ errorMsg.username }}</p>
            </div>
            <!-- nickname form -->
            <div class="mb-1 flex flex-col justify-between">
              <label class="text-mint text-xl py-2" for="username">닉네임</label>
              <input
                id="username"
                class="w-[395px] h-[48px] pl-2 rounded-sm text-sm"
                placeholder="닉네임을 입력해주세요"
                v-model="formData.nickname"
              />
            </div>
            <!-- error MSG -->
            <div class="text-red-300 text-sm w-[395px]">
              <p>{{ errorMsg.nickname }}</p>
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
                v-model="formData.password1"
              />
            </div>
            <!-- error MSG -->
            <div class="text-red-300 text-sm w-[395px]">
              <p>{{ errorMsg.password1 }}</p>
            </div>
            <!-- confirm_password form -->
            <div class="flex flex-col justify-between">
              <label class="text-mint text-xl py-2" for="password_confirm">비밀번호 확인</label>
              <input
                id="password_confirm"
                class="w-[395px] h-[48px] pl-2 rounded-sm text-sm"
                type="password"
                autoComplete="off"
                placeholder="비밀번호를 다시 입력해주세요"
                v-model="formData.password2"
              />
            </div>
            <!-- error MSG -->
            <div class="text-red-300 text-sm w-[395px]">
              <p>{{ errorMsg.password2 }}</p>
            </div>
            <!-- privacy -->
            <div class="mt-3">
              <div>
                <input type="checkbox" id="tos" value="tos" v-model="formData.isPosChecked" />
                <label class="text-white text-base ml-2" for="tos"
                  >이용약관 동의(필수)
                  <a
                    href="https://accurate-dryer-393.notion.site/b290a395cfb341a7a7740358afd76872?pvs=4"
                    target="_blank"
                  >
                    <span class="underline underline-offset-2 text-sm">자세히</span>
                  </a>
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
                  <a
                    href="https://accurate-dryer-393.notion.site/600ee87e489c4f5e8944fc557cfe4754?pvs=4"
                    target="_blank"
                  >
                    <span class="underline underline-offset-2 text-sm">자세히</span>
                  </a>
                </label>
              </div>
              <!-- error MSG -->
              <div class="text-red-300 text-sm w-[395px]">
                <p>{{ errorMsg.privacy }}</p>
              </div>
            </div>
            <div class="text-white mt-3">
              <p>
                이미 회원이신가요?
                <RouterLink :to="{ name: 'login' }" class="underline">로그인</RouterLink>
              </p>
            </div>
            <!-- sign btn -->
            <div class="flex justify-center pt-2 pb-5">
              <GlobalButton
                class="w-[395px] h-[48px] text-xl font-kbizB"
                :type="'mint-outline'"
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
import { FORM_ERROR_MESSAGE } from '@/constants/errorMessage'
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
const errorMsg = ref({
  username: '',
  nickname: '',
  password1: '',
  password2: '',
  privacy: '',
})

const fetchRegister = async () => {
  Object.keys(errorMsg.value).forEach((key) => {
    errorMsg.value[key] = ''
  })
  if (formData.value.isPosChecked === false || formData.value.isPrivacyChecked === false) {
    errorMsg.value.privacy = FORM_ERROR_MESSAGE.check_privacy
    return
  }
  try {
    await store.userRegister(formData.value)
    await store.getUserInfo(formData.value.username)
    router.push({ name: 'home' })
  } catch (error) {
    console.log(error.response.data)
    Object.keys(error.response.data).forEach((key) => {
      errorMsg.value[key] = FORM_ERROR_MESSAGE[error.response.data[key][0]]
      // errorMsg.value[key] = error.response.data[key][0]
    })
    if (error.response.data['non_field_errors']) {
      errorMsg.value.password2 = FORM_ERROR_MESSAGE[error.response.data['non_field_errors'][0]]
      // errorMsg.value.password2 = error.response.data['non_field_errors'][0]
    }
  }
}
</script>
