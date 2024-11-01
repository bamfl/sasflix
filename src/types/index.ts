export interface IPost {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  userReaction: boolean | null;
  views: number;
  userId: number;
}

export interface IPosts {
  posts: IPost[];
  total: number;
  skip: number;
  limit: number;
}

export interface IComment {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: {
    id: number;
    username: string;
    fullName: string;
  };
}

export interface IComments {
  comments: IComment[];
  total: number;
  skip: number;
  limit: number;
}
