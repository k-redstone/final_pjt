<template>
  <div class="w-full flex flex-col items-end text-black text-base">
    <p class="text-white">User</p>
    <div
      class="w-[303px] min-h-[48px] bg-[#68A9E4] py-3 px-5 rounded-xl flex items-center justify-end box-border"
    >
      <span>{{ chat.content }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  chat: Object,
})
</script>
