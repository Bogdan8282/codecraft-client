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
