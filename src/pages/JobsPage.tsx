import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Job } from "../services/jobService.ts";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase.ts";

const JobsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const category = searchParams.get("category");
  console.log("Category from URL:", category);

  useEffect(() => {
    const fetchJobs = async () => {
      if (!category) return;

      try {
        setLoading(true);
        setError(null);

        // Normalize the category name
        let searchCategory = category.toLowerCase();

        // Handle different category name variations
        switch (searchCategory) {
          case "technology":
            searchCategory = "tech";
            break;
          case "design & creative":
            searchCategory = "design";
            break;
          case "marketing & sales":
            searchCategory = "marketing";
            break;
          case "customer service":
            searchCategory = "customer";
            break;
        }

        console.log("Searching for category:", searchCategory); // Debug log

        const jobsRef = collection(db, "jobs");
        const q = query(jobsRef, where("category", "==", searchCategory));
        const querySnapshot = await getDocs(q);

        const jobsData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          console.log("Found job:", data); // Debug log
          return {
            id: doc.id,
            ...data,
          };
        }) as Job[];

        setJobs(jobsData);
      } catch (err) {
        setError("Failed to load jobs. Please try again later.");
        console.error("Error loading jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [category]);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate("/")}
          className="mr-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-semibold capitalize">{category} Jobs</h1>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center p-4">{error}</div>
      ) : jobs.length === 0 ? (
        <p className="text-center text-gray-600">
          No jobs found in this category.
        </p>
      ) : (
        <div className="grid gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p className="text-gray-600">{job.company}</p>
              <p className="text-gray-500 mt-1">{job.location}</p>
              <p className="mt-2">{job.description}</p>
              <div className="mt-4">
                <span className="text-blue-600">{job.salary}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobsPage;
