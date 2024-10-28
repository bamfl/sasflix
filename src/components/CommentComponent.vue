<template>
  <div class="row">
    <div class="mr-xs">
      <img class="avatar" src="/icons/avatar.jpg" alt="avatar" />
    </div>

    <div>
      <div class="text-h3 fw-600 mb-xs">{{ props.comment.user.fullName }}</div>

      <div class="text-h3 mb-sm">{{ props.comment.body }}</div>

      <div class="row">
        <div class="grey-1-color mr-md">Today</div>

        <button
          class="underlined-btn red-color"
          @click="$emit('delete', comment.id)"
        >
          Удалить
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IComment } from '@/types';

const props = defineProps<{
  comment: IComment;
}>();

defineEmits<{
  (e: 'delete', commentId: number): void;
}>();
</script>

<style lang="scss">
.avatar {
  width: 46px;
  height: 46px;
}
</style>
