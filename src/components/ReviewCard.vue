<template>
  <div class="flex flex-col gap-y-2">
    <div class="flex items-center gap-x-3">
      <RouterLink :to="{ name: 'profile', params: { username: comment.username } }">
        <p>{{ comment.user_nickname }}</p>
      </RouterLink>
      <p class="text-gray-400 grow">{{ getTimeFormat(comment.created_at) }}</p>
      <div v-show="store.userInfo.id === comment.user" class="flex gap-x-4">
        <span
          v-if="!isEdit"
          class="text-lg cursor-pointer hover:scale-110"
          @click="handleIsEdit(comment.content, comment.id)"
          >수정</span
        >
        <span
          v-else
          class="text-lg cursor-pointer hover:scale-110"
          @click="handleIsEdit(comment.content, comment.id)"
          >취소</span
        >
        <span class="text-lg cursor-pointer hover:scale-110" @click="handleDelete(comment.id)"
          >삭제</span
        >
      </div>
    </div>
    <div v-show="isEdit">
      <form
        id="commentForm"
        class="border p-3 border-black"
        @submit.prevent="handleEdit(comment.id)"
      >
        <textarea
          :id="'comment_' + comment.id"
          type="text"
          class="h-10 w-full overflow-y-auto resize-none"
          placeholder="댓글을 달아주세요."
          @input="commentInput.changeValue($event)"
        ></textarea>
        <hr />
        <div class="py-2 flex items-center">
          <p class="grow">글자수 {{ commentInput.valueLength }}/ {{ commentInput.valueLimit }}</p>
          <GlobalButton :type="'mint'" :text="'댓글 수정'" />
        </div>
      </form>
    </div>
    <p v-show="!isEdit">{{ comment.content }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { SETTING } from '@/constants/settings'
import { getTimeFormat } from '@/utils/timeFormat'
import GlobalButton from './GlobalButton.vue'
import useInputLimit from '@/hooks/useInputLimit'

defineProps({
  comment: Object,
})

const store = useAuthStore()
const emit = defineEmits(['deleteComment', 'editComment'])
const commentInput = useInputLimit(SETTING.comment_limt)

const editComment = ref({
  content: commentInput.inputValue,
})
const isEdit = ref(false)

const handleDelete = (commentId) => {
  emit('deleteComment', commentId)
}
const handleEdit = (commentId) => {
  emit('editComment', commentId, editComment.value)
  isEdit.value = false
  editComment.value.content = ''
}

const handleIsEdit = (selectComment, selectCommentId) => {
  isEdit.value = !isEdit.value
  commentInput.inputValue.value = selectComment
  document.querySelector(`#comment_${selectCommentId}`).value = selectComment
}
</script>
