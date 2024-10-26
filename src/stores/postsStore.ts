import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { IPost } from '@/types';
import postsService from '@/api/services/postsService';

export const usePostsStore = defineStore('postsStore', () => {
  const posts = ref<IPost[]>([]);

  const getPosts = async () => {
    try {
      const { data } = await postsService.getPosts();

      posts.value = data.posts;
    } catch (error) {
      throw error;
    }
  };

  const updateReactions = (
    postId: number,
    updatedReactions: { likes: number; dislikes: number },
  ) => {
    const updatingPost = posts.value.find(post => post.id === postId);

    if (updatingPost) {
      updatingPost.reactions = updatedReactions;
    }
  };

  return { posts, getPosts, updateReactions };
});
