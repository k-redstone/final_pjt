<template>
  <button :class="'rounded-lg text-xl w-[137px] h-[43px] font-bold ' + btnStyle[type]">
    {{ text }}
  </button>
</template>

<script setup>
import { ref } from 'vue'

ref
defineProps({
  type: String,
  text: String,
})

const btnStyle = ref({
  mint: 'bg-mint text-black',
  white: 'bg-white text-black',
  purple: 'bg-lightPurple text-white',
})
</script>

<style scoped></style>
