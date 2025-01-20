import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase.ts";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  date: string;
  readTime: string;
  imageUrl: string;
}

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        if (!id) return;
        const docRef = doc(db, "blogs", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPost({
            id: docSnap.id,
            ...docSnap.data(),
          } as BlogPost);
        }
      } catch (error) {
        console.error("Error fetching blog post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [id]);

  if (loading) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            Blog post not found
          </h1>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-6 md:px-4 py-12">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate("/blogs")}
          className="mr-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          ← Back to Blogs
        </button>
      </div>
      <article className="prose prose-lg mx-auto">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-64 object-cover rounded-lg mb-8"
        />
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <span>{post.date}</span>
          <span className="mx-2">•</span>
          <span>{post.readTime}</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>
        <div
          className="prose prose-lg prose-blue max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </main>
  );
};

export default BlogPost;
