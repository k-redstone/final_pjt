import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const errorMsg = ref('')
    const signUpErrorMsg = ref({
      username: '',
      nickname: '',
      password1: '',
      password2: '',
      privacy: '',
    })
    const token = ref(null)

    const userLogin = async (formValue) => {
      errorMsg.value = ''
      if (formValue.username === '' || formValue.password === '') {
        errorMsg.value = '아이디 또는 비빌번호를 입력해주세요'
        return
      }

      try {
        console.log(formValue)
        const URL = import.meta.env.VITE_BACKEND_URL
        const res = await axios({
          method: 'post',
          url: URL + '/accounts/login/',
          data: formValue,
        })
        console.log(res)
        token.value = res.data.token
        return true
      } catch (error) {
        console.log(error)

        errorMsg.value = error.response.data.message[0]
        return false
      }
    }

    const userRegister = async (formValue) => {
      Object.keys(signUpErrorMsg.value).forEach((key) => {
        signUpErrorMsg.value[key] = ''
      })
      console.log(formValue)

      if (formValue.isPosChecked === false || formValue.isPrivacyChecked === false) {
        signUpErrorMsg.value.privacy = '이용약관에 동의해주세요'
        return
      }
      try {
        const URL = import.meta.env.VITE_BACKEND_URL
        const res = await axios({
          method: 'post',
          url: URL + '/accounts/registration/',
          data: formValue,
        })
        console.log(res)
        token.value = res.data.key
        return true
      } catch (error) {
        // console.log(error)
        Object.keys(error.response.data).forEach((key) => {
          signUpErrorMsg.value[key] = error.response.data[key][0]
        })
        if (error.response.data['non_field_errors']) {
          signUpErrorMsg.value.password2 = error.response.data['non_field_errors'][0]
        }
        return false
      }
    }

    return { token, errorMsg, signUpErrorMsg, userLogin, userRegister }
  },
  { persist: [{ paths: ['token'], storage: sessionStorage }] },
)
