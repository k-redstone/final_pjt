<template>
  <div
    class="w-[226px] h-[125px] bg-none rounded-md flex justify-center items-center cursor-pointer"
    :class="selectMood === text ? 'border-4 border-mint' : 'border-white border-2 '"
  >
    <p class="text-3xl text-white">{{ text }}</p>
  </div>
</template>

<script setup>
defineProps({
  text: String,
  selectMood: String,
})
</script>

<style lang="scss" scoped></style>
