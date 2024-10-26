import { createRouter, createWebHistory } from 'vue-router';
import PostsPage from '@/pages/PostsPage.vue';
import PostPage from '@/pages/PostPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/posts',
    },
    {
      path: '/posts',
      name: 'posts',
      component: PostsPage,
    },
    {
      path: '/posts/:id',
      name: 'post',
      component: PostPage,
    },
  ],
});

export default router;
