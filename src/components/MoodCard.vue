<template>
  <div
    class="w-[226px] h-[125px] bg-none rounded-md flex justify-center items-center cursor-pointer"
    :class="{ 'border-4 border-mint': selectMood === text }"
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
