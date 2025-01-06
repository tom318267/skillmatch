export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
}

export const seedBlogs: BlogPost[] = [
  {
    id: 1,
    title: "Getting Started with React and TypeScript",
    excerpt:
      "Learn how to set up and build your first React application with TypeScript...",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    imageUrl: "https://source.unsplash.com/random/800x600?react",
    date: "2024-03-20",
    author: "John Doe",
    category: "Development",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Mastering Tailwind CSS",
    excerpt:
      "Discover the power of utility-first CSS and how to create beautiful designs...",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    imageUrl: "https://source.unsplash.com/random/800x600?css",
    date: "2024-03-19",
    author: "Jane Smith",
    category: "Design",
    readTime: "4 min read",
  },
  {
    id: 3,
    title: "Web Performance Optimization",
    excerpt:
      "Learn essential techniques to improve your website's loading speed...",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    imageUrl: "https://source.unsplash.com/random/800x600?web",
    date: "2024-03-18",
    author: "Mike Johnson",
    category: "Performance",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "Modern JavaScript Features",
    excerpt:
      "Explore the latest JavaScript features and how to use them effectively...",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    imageUrl: "https://source.unsplash.com/random/800x600?javascript",
    date: "2024-03-17",
    author: "Sarah Wilson",
    category: "Development",
    readTime: "7 min read",
  },
  {
    id: 5,
    title: "Building Responsive Layouts",
    excerpt:
      "Master the art of creating layouts that work perfectly across all devices...",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    imageUrl: "https://source.unsplash.com/random/800x600?responsive",
    date: "2024-03-16",
    author: "Alex Brown",
    category: "Design",
    readTime: "5 min read",
  },
];
