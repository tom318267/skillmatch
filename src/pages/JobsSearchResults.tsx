import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../config/firebase.ts";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salary?: string;
  category?: string;
  requirements?: string[];
  postedDate: string;
  type?: string;
  createdAt?: Date;
}

const JobSearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedJobs, setExpandedJobs] = useState<string[]>([]);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    const fetchJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const jobQuery = searchParams.get("q") || "";
        const locationQuery = searchParams.get("location") || "";

        const jobsRef = collection(db, "jobs");
        const querySnapshot = await getDocs(query(jobsRef));

        let filteredJobs = querySnapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as Job)
        );

        if (jobQuery) {
          const searchTerm = jobQuery.toLowerCase();
          filteredJobs = filteredJobs.filter((job) => {
            const matches =
              job.title?.toLowerCase().includes(searchTerm) ||
              job.description?.toLowerCase().includes(searchTerm) ||
              job.category?.toLowerCase().includes(searchTerm);
            return matches;
          });
        }

        if (locationQuery) {
          const locationTerm = locationQuery.toLowerCase();
          filteredJobs = filteredJobs.filter((job) =>
            job.location?.toLowerCase().includes(locationTerm)
          );
        }

        const jobsData = filteredJobs.map((job) => ({
          ...job,
          createdAt: job.postedDate ? new Date(job.postedDate) : new Date(),
        }));

        setJobs(jobsData);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to fetch jobs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [searchParams]);

  const toggleDescription = (jobId: string) => {
    setExpandedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId]
    );
  };

  return (
    <main className="container mx-auto py-8 px-6 md:px-4">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate("/")}
          className="mr-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          ← Back to Home
        </button>
        <h1 className="text-3xl md:text-4xl font-semibold text-primary">
          Search Results
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
          No jobs found matching your search criteria.
        </p>
      ) : (
        <section className="space-y-4">
          {jobs.map((job) => (
            <article key={job.id} className="bg-white rounded-lg shadow p-6">
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
                    Posted on: {job.createdAt?.toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => navigate(`/jobs/${job.id}`)}
                    className="mt-auto bg-secondary font-medium hover:bg-[#24558a] text-white px-4 py-2 rounded transition-colors"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
};

export default JobSearchResults;
