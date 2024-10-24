<template>
  <main>
    <div class="posts-page">
      <div class="text-h1 text-center fw-700 accent-color mb-xl">
        ikakprosto.ru
      </div>

      <div>
        <PostComponent />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import PostComponent from '@/components/PostComponent.vue';
</script>

<style lang="scss">
.posts-page {
  margin: 0 auto;
  max-width: 696px;
  padding: 8px 10px;
}
</style>
