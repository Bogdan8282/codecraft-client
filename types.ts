export interface Post {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  author: {
    name: string;
    avatar: string;
  };
  authorId: string;
  likes: string[];
  dislikes: string[];
}

export interface Comment {
  _id: string;
  content: string;
  createdAt: string;
  authorId: string;
  author: {
    name: string;
    avatar: string;
  };
}