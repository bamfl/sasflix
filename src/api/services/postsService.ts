import type { IComments, IPosts } from '@/types';
import httpClient from '../httpClient';

class PostsService {
  async getPosts() {
    return await httpClient.get<IPosts>('/posts');
  }

  async getPostComments(id: number) {
    return await httpClient.get<IComments>(`posts/${id}/comments`);
  }
}

export default new PostsService();
