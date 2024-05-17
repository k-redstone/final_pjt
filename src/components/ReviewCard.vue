<template>
  <div class="flex flex-col gap-y-2">
    <div class="flex gap-x-3">
      <RouterLink :to="{ name: 'profile', params: { username: comment.userId } }">
        <p>{{ comment.userId }}</p>
      </RouterLink>
      <p class="text-gray-400">{{ comment.created_at }}</p>
    </div>
    <p>{{ comment.content }}</p>
  </div>
</template>

<script setup>
defineProps({
  comment: Object,
})
</script>
