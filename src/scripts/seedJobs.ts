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
    description:
      "We're looking for a senior UX designer to join our growing team. You'll be responsible for creating intuitive user experiences across our digital products, leading user research initiatives, and mentoring junior designers. The ideal candidate will have a strong portfolio demonstrating end-to-end design processes, experience with user testing methodologies, and the ability to translate complex problems into simple, elegant solutions. You'll work closely with product managers, developers, and stakeholders to ensure the highest quality user experience.",
    requirements: ["5+ years experience", "Figma proficiency"],
    salary: "$90,000 - $120,000",
    location: "Remote",
    postedDate: "2024-03-15",
  },
  {
    title: "Frontend Developer",
    company: "Tech Corp",
    category: "tech",
    description:
      "Join our frontend team in building responsive, performant web applications. You'll be working on our flagship product used by millions of users worldwide. We're seeking someone who's passionate about creating pixel-perfect interfaces and writing clean, maintainable code. You'll be involved in architectural decisions, implementing new features, and optimizing application performance. Experience with modern frontend testing frameworks and state management solutions is a plus.",
    requirements: ["React", "TypeScript"],
    salary: "$80,000 - $100,000",
    location: "New York",
    postedDate: "2024-03-14",
  },
  {
    title: "Full Stack Engineer",
    company: "Growth Startup",
    category: "tech",
    description:
      "Join our fast-paced team building scalable web applications. We're looking for a Full Stack Engineer who can handle everything from database design to frontend implementation. You'll be working on critical features that directly impact our user experience and business metrics. The ideal candidate will have experience with microservices architecture, API design, and modern frontend frameworks. You'll be involved in technical architecture decisions and have the opportunity to mentor junior developers.",
    requirements: ["Node.js", "React", "AWS", "MongoDB"],
    salary: "$100,000 - $140,000",
    location: "San Francisco",
    postedDate: "2024-03-13",
  },
  {
    title: "Product Manager",
    company: "Innovation Labs",
    category: "product",
    description:
      "Lead product strategy and development for our flagship product. We're seeking a strategic thinker who can identify market opportunities, define product vision, and execute on roadmap initiatives. You'll work closely with engineering, design, and marketing teams to deliver features that delight our users. The role involves conducting market research, analyzing user feedback, and making data-driven decisions. You'll also be responsible for stakeholder communication and ensuring alignment across teams.",
    requirements: [
      "3+ years PM experience",
      "Agile certification",
      "Technical background",
    ],
    salary: "$110,000 - $150,000",
    location: "Boston",
    postedDate: "2024-03-12",
  },
  {
    title: "DevOps Engineer",
    company: "Cloud Systems Inc",
    category: "tech",
    description:
      "We're seeking a DevOps Engineer to help us build and maintain our cloud infrastructure. You'll be responsible for implementing CI/CD pipelines, managing cloud resources, and ensuring system reliability. The ideal candidate will have strong experience with container orchestration, infrastructure as code, and automated testing. You'll work on improving system observability, implementing security best practices, and optimizing cloud costs. Experience with multi-cloud environments is a plus.",
    requirements: ["Kubernetes", "Docker", "Jenkins", "AWS/Azure"],
    salary: "$95,000 - $130,000",
    location: "Remote",
    postedDate: "2024-03-11",
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
