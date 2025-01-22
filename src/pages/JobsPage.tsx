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
  const [filters, setFilters] = useState({
    location: "",
  });

  const category = searchParams.get("category");

  const toggleDescription = (jobId: string) => {
    setExpandedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId]
    );
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getUniqueValues = (field: keyof Job): string[] => {
    return Array.from(new Set(jobs.map((job) => job[field]))).filter(
      Boolean
    ) as string[];
  };

  // Update filtered jobs logic to only use location
  const filteredJobs = jobs.filter((job) => {
    const matchesLocation =
      !filters.location || job.location === filters.location;
    return matchesLocation;
  });

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
    <main className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div className="flex items-center">
          <button
            onClick={() => navigate("/")}
            className="mr-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            ← Back to Home
          </button>
          <h1 className="text-3xl md:text-4xl font-semibold capitalize text-primary">
            {category} Jobs
          </h1>
        </div>

        {!loading && !error && jobs.length > 0 && (
          <div className="flex flex-wrap gap-4">
            <select
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              className={`px-3 py-2 pr-8 border rounded-lg appearance-none focus-visible:outline-none focus-visible:border-2 focus-visible:border-secondary focus-visible:text-gray-700 ${
                filters.location
                  ? "text-primary border-[currentColor] bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22currentColor%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.4-12.8z%22%2F%3E%3C%2Fsvg%3E')]"
                  : "text-gray-700 border-gray-300 bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.4-12.8z%22%2F%3E%3C%2Fsvg%3E')]"
              } bg-[length:0.7em] bg-[right_0.7rem_center] bg-no-repeat`}
            >
              <option value="">Filter by Location</option>
              {getUniqueValues("location").map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
        )}
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
          {filteredJobs.length === 0 ? (
            <p className="text-center text-gray-600">
              No jobs match the selected filters.
            </p>
          ) : (
            filteredJobs.map((job) => (
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
                      {expandedJobs.includes(job.id)
                        ? "Show Less"
                        : "Read More"}
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
            ))
          )}
        </div>
      )}
    </main>
  );
};

export default JobsPage;
