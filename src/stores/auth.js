import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const errorMsg = ref('')
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
    const userRegister = (formValue) => {
      console.log(formValue)
      // axios.post()
    }

    return { token, errorMsg, userLogin, userRegister }
  },
  { persist: [{ paths: ['token'], storage: sessionStorage }] },
)
