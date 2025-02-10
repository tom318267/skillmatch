import React, { useEffect, useState } from "react";
import { Job } from "../services/jobService.ts";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase.ts";
import { toast } from "react-hot-toast";

const MainJobsPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedJobs, setExpandedJobs] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    type: "",
    location: "",
  });
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const filteredJobs = jobs.filter((job) => {
    const matchesType = !filters.type || job.type === filters.type;
    const matchesLocation =
      !filters.location || job.location === filters.location;
    return matchesType && matchesLocation;
  });

  const handleApply = (job: Job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const handleSubmitApplication = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const loadingToast = toast.loading("Submitting your application...");

      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.dismiss(loadingToast);
      toast.success("Application submitted successfully!");
      setShowModal(false);
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to submit application. Please try again.");
      console.error("Error submitting application:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
          <h1 className="text-3xl md:text-4xl font-semibold text-primary">
            Browse Jobs
          </h1>

          {!loading && !error && jobs.length > 0 && (
            <div className="flex flex-wrap gap-4">
              <select
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className={`px-3 py-2 pr-8 border rounded-lg appearance-none focus-visible:outline-none focus-visible:border-2 focus-visible:border-secondary focus-visible:text-gray-700 ${
                  filters.type
                    ? "text-primary border-[currentColor] bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22currentColor%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.4-12.8z%22%2F%3E%3C%2Fsvg%3E')]"
                    : "text-gray-700 border-gray-300 bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.4-12.8z%22%2F%3E%3C%2Fsvg%3E')]"
                } bg-[length:0.7em] bg-[right_0.7rem_center] bg-no-repeat`}
              >
                <option value="">All Types</option>
                {getUniqueValues("type").map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

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
            {filteredJobs.length === 0 ? (
              <p className="text-center text-gray-600">
                No jobs match the selected filters.
              </p>
            ) : (
              filteredJobs.map((job) => (
                <article
                  key={job.id}
                  className="bg-white rounded-lg shadow p-6"
                >
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <h2 className="text-xl font-semibold mb-2">
                        {job.title}
                      </h2>
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
                        Posted on:{" "}
                        {new Date(job.postedDate).toLocaleDateString()}
                      </span>
                      <button
                        onClick={() => handleApply(job)}
                        className="mt-auto bg-secondary font-medium hover:bg-[#24558a] text-white px-4 py-2 rounded transition-colors"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </section>
        )}
      </div>

      {showModal && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">
              Apply for {selectedJob.title}
            </h2>
            <p className="text-gray-600 mb-4">at {selectedJob.company}</p>

            <form className="space-y-4" onSubmit={handleSubmitApplication}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="resume"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Resume
                </label>
                <input
                  type="file"
                  id="resume"
                  accept=".pdf,.doc,.docx"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
                  required
                />
              </div>
              <div className="flex gap-3 justify-end mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-secondary text-white rounded hover:bg-[#24558a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default MainJobsPage;
