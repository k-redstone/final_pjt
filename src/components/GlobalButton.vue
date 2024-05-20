<template>
  <button :class="'rounded-lg text-xl w-[137px] h-[43px] font-bold ' + btnStyle[type]">
    {{ text }}
  </button>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  type: String,
  text: String,
})

const btnStyle = ref({
  mint: 'bg-mint text-black',
  white: 'bg-white text-black',
  purple: 'bg-lightPurple text-white',
  'mint-outline':
    'bg-none text-black border-mint border-2 text-mint hover:bg-mint hover:text-black',
})
</script>

<style scoped></style>
