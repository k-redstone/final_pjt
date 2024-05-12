<template>
  <div
    class="w-[246px] h-[142px] bg-gray rounded-md flex justify-center items-center cursor-pointer"
    :class="{ 'border-4 border-purple-400': selectMood === text }"
  >
    <p class="text-3xl text-white font-kbiz">{{ text }}</p>
  </div>
</template>

<script setup>
defineProps({
  text: String,
  selectMood: String,
})
</script>

<style lang="scss" scoped></style>
