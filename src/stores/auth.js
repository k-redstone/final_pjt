import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const userLogin = (formValue) => {
    console.log(formValue)
    // axios.post()
  }
  const userRegister = (formValue) => {
    console.log(formValue)
    // axios.post()
  }

  return { userLogin, userRegister }
})
