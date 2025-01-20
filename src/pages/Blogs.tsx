import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase.ts";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  imageUrl: string;
}

const Blogs: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const blogCollection = collection(db, "blogs");
        const blogSnapshot = await getDocs(blogCollection);
        const blogList = blogSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as BlogPost[];

        setBlogPosts(blogList);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  if (loading) {
    return (
      <main className="max-w-7xl mx-auto px-6 md:px-4  py-12">
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto py-8 px-6 sm:px-0">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold text-primary mb-2">
          Our Blogs
        </h1>
        <p className="text-gray-600 text-lg">
          Insights, updates, and stories from our team
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105"
          >
            <Link to={`/blog/${post.id}`}>
              <div className="relative h-48">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>

                <div className="prose prose-sm max-h-32 overflow-hidden mb-4">
                  {post.content.slice(0, 150)}
                  {post.content.length > 150 && "..."}
                </div>

                <div className="mt-4">
                  <span className="text-secondary font-semibold hover:text-[#24558a]">
                    Read more →
                  </span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
};

export default Blogs;
