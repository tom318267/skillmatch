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
  const [expandedJobs, setExpandedJobs] = useState<string[]>([]);

  const category = searchParams.get("category");

  const toggleDescription = (jobId: string) => {
    setExpandedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId]
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
          case "tech":
            searchCategory = "tech";
            break;
          case "healthcare":
          case "health":
            searchCategory = "health";
            break;
          case "design":
          case "design & creative":
            searchCategory = "design";
            break;
          case "marketing":
          case "marketing & sales":
            searchCategory = "marketing";
            break;
          case "customer":
          case "customer service":
            searchCategory = "customer";
            break;
        }

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
          ← Back to Home
        </button>
        <h1 className="text-3xl font-semibold capitalize text-primary">
          {category} Jobs
        </h1>
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
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow p-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
                  <p className="text-gray-600 mb-2">
                    {job.company} • {job.location}
                  </p>
                  <p className="text-gray-700">
                    {expandedJobs.includes(job.id)
                      ? job.description
                      : `${job.description?.slice(0, 150)}...`}
                  </p>
                  <button
                    onClick={() => toggleDescription(job.id)}
                    className="text-secondary font-semibold hover:text-[#24558a] text-sm mt-2"
                  >
                    {expandedJobs.includes(job.id) ? "Show Less" : "Read More"}
                  </button>
                </div>
                <div className="flex flex-col gap-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm border border-secondary text-secondary w-fit">
                    {job.type ?? "Full-time"}
                  </span>
                  <span className="text-sm text-gray-500">
                    Posted on: {new Date(job.postedDate).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => {
                      console.log(`Applied to job ${job.id}`);
                    }}
                    className="mt-auto bg-secondary hover:bg-[#24558a] text-white font-medium px-4 py-2 rounded transition-colors"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobsPage;
