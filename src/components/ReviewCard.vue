<template>
  <div class="flex flex-col gap-y-2">
    <div class="flex gap-x-3">
      <RouterLink :to="{ name: 'profile', params: { username: '유저이름' } }">
        <P>유저이름</P>
      </RouterLink>
      <p class="text-gray-400">시간</p>
    </div>
    <p>comment</p>
  </div>
</template>

<script setup></script>
