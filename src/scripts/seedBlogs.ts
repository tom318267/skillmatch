import dotenv from "dotenv";
dotenv.config();

import { collection, addDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../config/firebase";

const sampleBlogs = [
  {
    id: "1",
    title: "5 Essential Skills for Remote Work Success in 2024",
    excerpt:
      "Master these key skills to thrive in the evolving remote work landscape.",
    content:
      "The landscape of remote work continues to evolve, and success requires more than just technical prowess. Today's remote professionals need to master asynchronous communication, digital collaboration, time management, self-motivation, and work-life boundaries. This guide explores these critical skills and provides practical strategies for developing them...",
    date: "March 15, 2024",
    readTime: "8 min read",
    imageUrl: "https://images.unsplash.com/photo-1593642532744-d377ab507dc8",
  },
  {
    id: "2",
    title: "Navigating Career Transitions: A Strategic Guide",
    excerpt:
      "How to successfully pivot your career path in today's dynamic job market.",
    content:
      "Career transitions have become increasingly common in today's dynamic job market. Whether you're switching industries, moving up the ladder, or completely reinventing your professional path, strategic planning is crucial. This article explores proven methods for assessing your transferable skills, building new competencies, and marketing yourself effectively...",
    date: "March 12, 2024",
    readTime: "6 min read",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
  },
  {
    id: "3",
    title: "Building a Personal Brand in the Digital Age",
    excerpt:
      "Learn how to establish and maintain a powerful professional presence online.",
    content:
      "Your personal brand is more important than ever in today's digital-first professional world. From LinkedIn optimization to content creation, every online interaction contributes to your professional image. This comprehensive guide covers the essential elements of building an authentic and impactful personal brand...",
    date: "March 8, 2024",
    readTime: "7 min read",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
  },
  {
    id: "4",
    title: "The Future of Work: AI and Human Collaboration",
    excerpt:
      "Understanding the evolving relationship between AI tools and human workers.",
    content:
      "As artificial intelligence continues to reshape the workplace, understanding how to effectively collaborate with AI tools has become crucial. This article explores the current state of AI in the workplace, practical applications across different industries, and strategies for professionals to adapt and thrive in an AI-augmented work environment...",
    date: "March 5, 2024",
    readTime: "9 min read",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
  },
  {
    id: "5",
    title: "Workplace Wellness: Beyond the Basics",
    excerpt:
      "Modern approaches to maintaining health and productivity in today's workplace.",
    content:
      "Workplace wellness has evolved far beyond traditional health programs. Today's holistic approach encompasses mental health, ergonomic considerations, work-life integration, and stress management. Discover innovative strategies and practical tips for maintaining your well-being while pursuing professional success...",
    date: "March 1, 2024",
    readTime: "5 min read",
    imageUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643",
  },
  {
    id: "6",
    title: "Effective Networking in a Digital World",
    excerpt:
      "Modern strategies for building and maintaining professional relationships online.",
    content:
      "The art of networking has been transformed by digital platforms and remote work culture. This guide explores effective strategies for building meaningful professional relationships in a virtual environment, including tips for virtual events, social media engagement, and maintaining long-term connections...",
    date: "February 28, 2024",
    readTime: "6 min read",
    imageUrl: "https://images.unsplash.com/photo-1521737711867-e3b97375f902",
  },
  // Add more blog posts as needed
];

const seedBlogs = async () => {
  try {
    const email = "admin@jobboard.com";
    const password = "test123456";

    const auth = getAuth();
    console.log("Attempting to authenticate...");
    await signInWithEmailAndPassword(auth, email, password);
    console.log("Authentication successful!");

    const blogsRef = collection(db, "blogs");

    for (const blog of sampleBlogs) {
      try {
        const docRef = await addDoc(blogsRef, blog);
        console.log("Added blog:", blog.title, "with ID:", docRef.id);
      } catch (error) {
        console.error("Error adding blog:", error);
      }
    }
  } catch (error) {
    console.error("Authentication error:", error);
  }
};

// Run this script separately to seed your database
seedBlogs();
