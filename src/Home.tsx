import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import type { Post } from "../types";

const AllPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Блог</h1>
        <Link
          to="/post/create"
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
        >
          + Написати пост
        </Link>
      </div>

      <div className="space-y-8">
        {posts.map((post) => (
          <div key={post._id} className="border-b pb-8">
            <Link to={`/post/${post._id}`}>
              <h2 className="text-2xl font-semibold hover:text-blue-600">
                {post.title}
              </h2>
            </Link>
            <p className="text-gray-500 text-sm mt-1">
              {new Date(post.createdAt).toLocaleDateString("uk-UA")}
            </p>
            <p className="mt-3 text-lg line-clamp-3">
              {post.content.substring(0, 280)}...
            </p>
            <Link
              to={`/post/${post._id}`}
              className="inline-block mt-4 text-blue-600 hover:underline"
            >
              Читати повністю →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPosts;
