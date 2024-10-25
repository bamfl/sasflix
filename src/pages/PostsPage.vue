<template>
  <main>
    <div class="posts-page">
      <div class="text-h1 text-center fw-700 accent-color mb-xl">
        ikakprosto.ru
      </div>

      <div v-for="post in firstFivePosts" :key="post.id" class="mb-md">
        <PostComponent :post="post" />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import PostComponent from '@/components/PostComponent.vue';
import { usePostsStore } from '@/stores/postsStore';
import { storeToRefs } from 'pinia';

const postsStore = usePostsStore();

const { getPosts } = postsStore;
const { posts } = storeToRefs(postsStore);

const firstFivePosts = computed(() => posts.value.slice(0, 5));

onMounted(async () => {
  await getPosts();
});
</script>

<style lang="scss">
.posts-page {
  margin: 0 auto;
  max-width: 696px;
  padding: 8px 10px;
}
</style>
