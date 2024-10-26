<template>
  <div class="post-page">
    <div class="text-h1 text-center fw-700 accent-color mb-xl">
      ikakprosto.ru
    </div>

    <PostComponent v-if="post" :post="post" />

    <div v-else>
      <div class="text-h2 fw-700 mb-xs">
        Поста с id {{ postId }} не существует
      </div>

      <button
        class="underlined-btn accent-color mr-xs"
        @click="$router.push('/posts')"
      >
        К списку постов
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { usePostsStore } from '@/stores/postsStore';
import PostComponent from '../components/PostComponent.vue';

const route = useRoute();
const postId = +route.params.id;

const postsStore = usePostsStore();

const { getPosts } = postsStore;
const { posts } = storeToRefs(postsStore);

const post = computed(() => posts.value.find(p => p.id == postId));

onMounted(async () => {
  await getPosts();
});
</script>

<style lang="scss">
.post-page {
  margin: 0 auto;
  max-width: 696px;
  padding: 8px 10px;
}
</style>
