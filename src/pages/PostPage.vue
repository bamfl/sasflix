<template>
  <div class="post-page">
    <div
      class="text-h1 text-center fw-700 accent-color mb-xl cursor-pointer"
      @click="$router.push('/posts')"
    >
      ikakprosto.ru
    </div>

    <div v-if="!loading">
      <div v-if="post">
        <PostComponent
          :post="post"
          :areCommentsOpen="areCommentsOpen"
          @toggleComments="areCommentsOpen = !areCommentsOpen"
        />

        <div class="text-h2 fw-700 cursor-pointer mt-xl mb-md">
          {{ comments.length }} {{ getCommentWord(comments.length) }}
        </div>

        <div v-if="areCommentsOpen">
          <div v-for="comment in comments" :key="comment.id" class="mb-md">
            <CommentComponent :comment="comment" @delete="deleteComment" />
          </div>
        </div>
      </div>

      <div v-else>
        <div class="text-h2 fw-700">Поста с id {{ postId }} не существует</div>

        <button
          class="underlined-btn accent-color mr-xs"
          @click="$router.push('/posts')"
        >
          К списку постов
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import CommentComponent from '../components/CommentComponent.vue';
import PostComponent from '../components/PostComponent.vue';
import { storeToRefs } from 'pinia';
import { usePostsStore } from '@/stores/postsStore';
import postsService from '@/api/services/postsService';
import type { IComment } from '@/types';

const route = useRoute();
const postId = +route.params.id;

const postsStore = usePostsStore();

const { getPosts } = postsStore;
const { posts, loading } = storeToRefs(postsStore);

const post = computed(() => posts.value.find(p => p.id == postId));

const areCommentsOpen = ref(false);

const comments = ref<IComment[]>([]);

const getComments = async (postId: number) => {
  try {
    loading.value = true;

    const { data } = await postsService.getPostComments(postId);

    comments.value = data.comments;
  } catch (error) {
    throw error;
  } finally {
    loading.value = false;
  }
};

const deleteComment = (postId: number) => {
  comments.value = comments.value.filter(c => c.id !== postId);
};

const getCommentWord = (count: number) => {
  if (count % 10 === 1 && count % 100 !== 11) {
    return 'комментарий';
  } else if (
    count % 10 >= 2 &&
    count % 10 <= 4 &&
    (count % 100 < 12 || count % 100 > 14)
  ) {
    return 'комментария';
  } else {
    return 'комментариев';
  }
};

onMounted(async () => {
  await getPosts();

  if (post.value) {
    await getComments(post.value.id);
  }
});
</script>

<style lang="scss">
.post-page {
  margin: 0 auto;
  max-width: 696px;
  padding: 8px 10px;
}
</style>
