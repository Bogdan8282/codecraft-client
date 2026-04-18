import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import type { Post } from "../types";

const SinglePost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isSignedIn, getToken } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
  const [likes, setLikes] = useState<number>(0);
  const [dislikes, setDislikes] = useState<number>(0);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/posts/${id}`)
        .then((res) => {
          setPost(res.data);
          setLikes(res.data.likes?.length || 0);
          setDislikes(res.data.dislikes?.length || 0);
        })
        .catch((err) => console.error(err));
    }
  }, [id]);

  const handleVote = async (type: "like" | "dislike") => {
    const token = await getToken();
    if (!isSignedIn) {
      alert("Будь ласка, увійдіть, щоб оцінити пост");
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:5000/api/posts/${id}/vote`,
        { type },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setLikes(res.data.likes);
      setDislikes(res.data.dislikes);
    } catch (err) {
      console.error("Помилка голосування:", err);
    }
  };

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

      <div className="flex items-center gap-2 mb-8">
        <img
          src={post.author.avatar}
          alt="avatar"
          className="w-8 h-8 rounded-full"
        />
        <span className="font-medium text-gray-700">{post.author.name}</span>
      </div>

      <div className="prose text-lg leading-relaxed mb-8">
        {post.content.split("\n").map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      {/* Блок голосування */}
      <div className="flex items-center gap-4 pt-6 border-t">
        <button
          onClick={() => handleVote("like")}
          className="flex items-center gap-2 px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors"
        >
          <span>👍</span> {likes}
        </button>
        <button
          onClick={() => handleVote("dislike")}
          className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-colors"
        >
          <span>👎</span> {dislikes}
        </button>
      </div>
    </div>
  );
};

export default SinglePost;
