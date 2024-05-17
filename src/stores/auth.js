import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const userInfo = ref({ username: 'null' })
    const token = ref(null)

    const userLogin = async (formValue) => {
      const URL = import.meta.env.VITE_BACKEND_URL

      await axios({
        method: 'post',
        url: URL + '/accounts/login/',
        data: formValue,
      }).then((res) => {
        token.value = res.data.token
      })
    }

    const userRegister = async (formValue) => {
      const URL = import.meta.env.VITE_BACKEND_URL
      await axios({
        method: 'post',
        url: URL + '/accounts/registration/',
        data: formValue,
      }).then((res) => {
        token.value = res.data.key
      })
    }

    const getUserInfo = async (username) => {
      const URL = import.meta.env.VITE_BACKEND_URL
      await axios({
        method: 'get',
        url: URL + `/accounts/${username}/profile/`,
      }).then((res) => {
        userInfo.value = res.data
      })
    }

    const userLogout = async () => {
      const URL = import.meta.env.VITE_BACKEND_URL
      await axios({
        method: 'post',
        url: URL + '/accounts/logout/',
      }).then(() => {
        token.value = null
        userInfo.value = { username: 'null' }
      })
    }

    return {
      token,
      userInfo,
      userLogin,
      userRegister,
      userLogout,
      getUserInfo,
    }
  },
  {
    persist: [{ storage: sessionStorage }],
  },
)
