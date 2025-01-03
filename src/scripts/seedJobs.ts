import dotenv from "dotenv";
dotenv.config();

import { collection, addDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../config/firebase";

const sampleJobs = [
  {
    title: "Senior UX Designer",
    company: "Design Co",
    category: "design",
    description: "We're looking for a senior UX designer...",
    requirements: ["5+ years experience", "Figma proficiency"],
    salary: "$90,000 - $120,000",
    location: "Remote",
  },
  {
    title: "Frontend Developer",
    company: "Tech Corp",
    category: "tech",
    description: "Frontend developer position...",
    requirements: ["React", "TypeScript"],
    salary: "$80,000 - $100,000",
    location: "New York",
  },
  {
    title: "Full Stack Engineer",
    company: "Growth Startup",
    category: "tech",
    description:
      "Join our fast-paced team building scalable web applications...",
    requirements: ["Node.js", "React", "AWS", "MongoDB"],
    salary: "$100,000 - $140,000",
    location: "San Francisco",
  },
  {
    title: "Product Manager",
    company: "Innovation Labs",
    category: "product",
    description:
      "Lead product strategy and development for our flagship product...",
    requirements: [
      "3+ years PM experience",
      "Agile certification",
      "Technical background",
    ],
    salary: "$110,000 - $150,000",
    location: "Boston",
  },
  {
    title: "DevOps Engineer",
    company: "Cloud Systems Inc",
    category: "tech",
    description:
      "Managing cloud infrastructure and implementing CI/CD pipelines...",
    requirements: ["Kubernetes", "Docker", "Jenkins", "AWS/Azure"],
    salary: "$95,000 - $130,000",
    location: "Remote",
  },
  {
    title: "Data Scientist",
    company: "Analytics Pro",
    category: "data",
    description:
      "Develop machine learning models and analyze large datasets...",
    requirements: ["Python", "SQL", "Machine Learning", "Statistics"],
    salary: "$105,000 - $145,000",
    location: "Seattle",
  },
  {
    title: "UI Designer",
    company: "Creative Agency",
    category: "design",
    description:
      "Create beautiful and intuitive user interfaces for web and mobile...",
    requirements: ["Adobe Creative Suite", "Sketch", "Portfolio required"],
    salary: "$70,000 - $90,000",
    location: "Los Angeles",
  },
  {
    title: "Customer Service Representative",
    company: "Support Solutions",
    category: "customer-service",
    description:
      "Handle customer inquiries and provide exceptional support via phone and email...",
    requirements: [
      "1+ years customer service",
      "Communication skills",
      "Problem-solving ability",
    ],
    salary: "$35,000 - $45,000",
    location: "Remote",
  },
  {
    title: "Customer Success Manager",
    company: "SaaS Solutions",
    category: "customer-service",
    description:
      "Drive customer satisfaction and retention through proactive engagement...",
    requirements: [
      "3+ years in customer success",
      "SaaS experience",
      "Account management",
    ],
    salary: "$65,000 - $85,000",
    location: "Chicago",
  },
  {
    title: "Financial Analyst",
    company: "Investment Group",
    category: "finance",
    description:
      "Perform financial modeling and analysis to support investment decisions...",
    requirements: [
      "Bachelor's in Finance",
      "Excel expertise",
      "Financial modeling",
    ],
    salary: "$75,000 - $95,000",
    location: "New York",
  },
  {
    title: "Senior Accountant",
    company: "Corporate Finance LLC",
    category: "finance",
    description:
      "Manage monthly closing, financial reporting, and audit processes...",
    requirements: ["CPA", "5+ years accounting experience", "Advanced Excel"],
    salary: "$85,000 - $110,000",
    location: "Boston",
  },
  {
    title: "Registered Nurse",
    company: "City General Hospital",
    category: "healthcare",
    description:
      "Provide direct patient care in fast-paced hospital environment...",
    requirements: ["RN license", "BLS certification", "2+ years experience"],
    salary: "$70,000 - $90,000",
    location: "Los Angeles",
  },
  {
    title: "Healthcare Administrator",
    company: "Medical Center Group",
    category: "healthcare",
    description:
      "Oversee daily operations and staff management in healthcare facility...",
    requirements: [
      "Healthcare Administration degree",
      "5+ years management",
      "EMR systems",
    ],
    salary: "$95,000 - $120,000",
    location: "Houston",
  },
  {
    title: "Digital Marketing Manager",
    company: "Growth Marketing Inc",
    category: "marketing",
    description:
      "Lead digital marketing strategies across multiple channels including social media, email, and PPC campaigns...",
    requirements: [
      "5+ years digital marketing",
      "Google Analytics",
      "Meta Ads",
      "Email marketing",
    ],
    salary: "$75,000 - $95,000",
    location: "Chicago",
  },
  {
    title: "Content Marketing Specialist",
    company: "Content Solutions",
    category: "marketing",
    description:
      "Create engaging content across various formats including blog posts, whitepapers, and social media content...",
    requirements: [
      "3+ years content creation",
      "SEO knowledge",
      "Strong writing skills",
    ],
    salary: "$55,000 - $70,000",
    location: "Remote",
  },
  {
    title: "Social Media Manager",
    company: "Brand Builders",
    category: "marketing",
    description:
      "Develop and execute social media strategies to increase brand awareness and engagement across platforms...",
    requirements: [
      "Social media management",
      "Content creation",
      "Analytics tools",
      "Scheduling tools",
    ],
    salary: "$50,000 - $65,000",
    location: "Miami",
  },
  {
    title: "Marketing Analytics Manager",
    company: "Data Driven Marketing",
    category: "marketing",
    description:
      "Lead data-driven marketing decisions through comprehensive analytics and reporting across all marketing channels...",
    requirements: [
      "Google Analytics",
      "SQL",
      "Data visualization",
      "Statistical analysis",
    ],
    salary: "$85,000 - $110,000",
    location: "San Francisco",
  },
];

const seedJobs = async () => {
  try {
    // Replace these with the credentials you just created
    const email = "admin@jobboard.com"; // Use the email you created
    const password = "test123456"; // Use the password you created

    const auth = getAuth();
    console.log("Attempting to authenticate...");
    await signInWithEmailAndPassword(auth, email, password);
    console.log("Authentication successful!");

    const jobsRef = collection(db, "jobs");

    for (const job of sampleJobs) {
      try {
        const docRef = await addDoc(jobsRef, job);
        console.log("Added job:", job.title, "with ID:", docRef.id);
      } catch (error) {
        console.error("Error adding job:", error);
      }
    }
  } catch (error) {
    console.error("Authentication error:", error);
  }
};

// Run this script separately to seed your database
seedJobs();
