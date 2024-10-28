import { ref, watch } from 'vue';
import { defineStore } from 'pinia';
import type { IPost } from '@/types';
import postsService from '@/api/services/postsService';

export const usePostsStore = defineStore('postsStore', () => {
  const loading = ref(false);

  const posts = ref<IPost[]>([]);

  const getPosts = async () => {
    try {
      loading.value = true;

      const { data } = await postsService.getPosts();

      posts.value = data.posts.map(post => ({ ...post, userReaction: null }));

      getPostsFromLocalStorage();
    } catch (error) {
      throw error;
    } finally {
      loading.value = false;
    }
  };

  const updateReactions = (
    postId: number,
    updatedReactions: IPost['reactions'],
    userReaction: IPost['userReaction'],
  ) => {
    const updatingPost = posts.value.find(post => post.id === postId);

    if (updatingPost) {
      updatingPost.reactions = updatedReactions;
      updatingPost.userReaction = userReaction;
    }
  };

  const getPostsFromLocalStorage = () => {
    const postsJSON = localStorage.getItem('posts');

    if (typeof postsJSON === 'string') {
      const postsFromLocalStorage = JSON.parse(postsJSON);

      if (Array.isArray(postsFromLocalStorage)) {
        posts.value = postsFromLocalStorage as IPost[];
      }
    }
  };

  watch(
    posts,
    updatedPosts => {
      localStorage.setItem('posts', JSON.stringify(updatedPosts));
    },
    { deep: true },
  );

  return { posts, getPosts, updateReactions, loading };
});
