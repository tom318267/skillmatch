import React, { useEffect, useState } from "react";
import { Job } from "../services/jobService.ts";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase.ts";

const MainJobsPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedJobs, setExpandedJobs] = useState<string[]>([]);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        setLoading(true);
        setError(null);

        const jobsRef = collection(db, "jobs");
        const querySnapshot = await getDocs(jobsRef);

        const jobsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Job[];

        setJobs(jobsData);
      } catch (err) {
        setError("Failed to load jobs. Please try again later.");
        console.error("Error loading jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllJobs();
  }, []);

  const toggleDescription = (jobId: string) => {
    setExpandedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId]
    );
  };

  return (
    <main className="container mx-auto py-8 px-6 md:px-4">
      <header className="flex items-center mb-6">
        <h1 className="text-3xl md:text-4xl font-semibold text-primary">
          Browse Jobs
        </h1>
      </header>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center p-4">{error}</div>
      ) : jobs.length === 0 ? (
        <p className="text-center text-gray-600">
          No jobs available at the moment.
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
                    Posted on: {new Date(job.postedDate).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => {
                      console.log(`Applied to job ${job.id}`);
                    }}
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

export default MainJobsPage;
