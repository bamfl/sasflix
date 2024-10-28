<template>
  <div
    class="text-h2 fw-700 mb-xs cursor-pointer"
    @click="$router.push(`/posts/${post.id}`)"
  >
    {{ props.post.title }}
  </div>

  <div class="text-h3 mb-md">
    {{ props.post.body }}
  </div>

  <div class="row items-center">
    <ReactionsToggler :post="props.post" class="mr-xs" />

    <button
      class="underlined-btn accent-color mr-xs"
      @click="onOpenCommentBtnClick"
    >
      {{ areCommentsOpen ? 'Close comments' : 'Open comments' }}
    </button>

    <div class="grey-1-color mr-xs">Today</div>

    <div v-for="(tag, idx) in props.post.tags" :key="tag" class="row">
      <div class="tag mr-xxs" :class="idx === 0 ? 'first' : ''">{{ tag }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IPost } from '@/types';
import ReactionsToggler from './ReactionsToggler.vue';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps<{
  post: IPost;
  areCommentsOpen?: boolean;
}>();

const emit = defineEmits<{
  (e: 'toggleComments'): void;
}>();

const route = useRoute();
const router = useRouter();

const onOpenCommentBtnClick = () => {
  if (route.name === 'posts') {
    router.push(`/posts/${props.post.id}`);
  } else {
    emit('toggleComments');
  }
};
</script>

<style lang="scss"></style>
