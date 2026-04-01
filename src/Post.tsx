import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import type { Post } from "../types";

const SinglePost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/posts/${id}`)
        .then((res) => setPost(res.data))
        .catch((err) => console.error(err));
    }
  }, [id]);

  if (!post) return <div className="text-center py-20">Завантаження...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Link to="/" className="text-blue-600 hover:underline mb-6 inline-block">
        ← Назад до всіх постів
      </Link>
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-500 mb-8">
        {new Date(post.createdAt).toLocaleDateString("uk-UA", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <div className="flex items-center gap-2 mt-2">
        <img
          src={post.author.avatar}
          alt="avatar"
          className="w-6 h-6 rounded-full"
        />
        <span className="text-sm text-gray-600">{post.author.name}</span>
      </div>
      <div className="prose text-lg leading-relaxed">
        {post.content.split("\n").map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
};

export default SinglePost;
