import React, { useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import { Element } from "react-scroll";
import { collection, query, where } from "firebase/firestore";
import { db } from "../config/firebase.ts";

// Lazy load components
const TrustedBySection = React.lazy(
  () => import("../components/TrustedBySection.tsx")
);
const HowItWorksSection = React.lazy(
  () => import("../components/HowItWorksSection.tsx")
);
const CategoriesSection = React.lazy(
  () => import("../components/CategoriesSection.tsx")
);
const ContactSection = React.lazy(
  () => import("../components/ContactSection.tsx")
);

const Home: React.FC = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [jobQuery, setJobQuery] = React.useState("");
  const [locationQuery, setLocationQuery] = React.useState("");
  const [isSearching, setIsSearching] = React.useState(false);

  const handleSearch = async () => {
    setIsSearching(true);
    try {
      const jobsRef = collection(db, "jobs");
      let searchQuery = query(jobsRef);

      if (jobQuery) {
        searchQuery = query(
          jobsRef,
          where(
            "keywords",
            "array-contains-any",
            jobQuery.toLowerCase().split(" ")
          )
        );
      }

      navigate(`/jobs/search?q=${jobQuery}&location=${locationQuery}`);
    } catch (error) {
      console.error("Error searching jobs:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch();
  };

  useEffect(() => {
    const section = searchParams.get("section");

    if (section) {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  }, [searchParams, location.key]);

  return (
    <main>
      <Element name="home">
        <section
          id="home"
          className="relative text-white bg-cover bg-center bg-no-repeat py-20 md:py-[148px] scroll-mt-[70px]"
          style={{ backgroundImage: 'url("/images/bg-skillmatch.jpg")' }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Title Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <p className="text-base font-medium text-white mb-[28px]">
                #1 Job Board
              </p>
              <h1 className="text-4xl md:text-[58px] font-semibold md:leading-[65px] max-w-[588px] mx-auto">
                Find the Perfect Job for Your Skills
              </h1>
              <p className="mt-4 text-lg text-white">
                Connecting talent to opportunity by matching skilled
                professionals with the jobs they deserve
              </p>
            </motion.div>

            {/* Search Form */}
            <motion.form
              onSubmit={handleSubmit}
              className="mt-10 flex flex-col md:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            >
              <input
                type="text"
                value={jobQuery}
                onChange={(e) => setJobQuery(e.target.value)}
                placeholder="Search by job title, keyword, etc."
                className="px-4 py-3 w-full md:w-2/5 rounded border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                placeholder="Search by location"
                className="px-4 py-3 w-full md:w-2/5 rounded border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={isSearching}
                className="w-full md:w-auto px-6 py-3 bg-primary text-white font-medium rounded transition hover:outline hover:outline-1 hover:outline-white disabled:opacity-50"
              >
                {isSearching ? "Searching..." : "Search"}
              </button>
            </motion.form>

            {/* Reviews Section */}
            <motion.div
              className="mt-12 flex flex-col items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            >
              <div className="flex -space-x-3">
                <img
                  src="/images/avatar1.jpg"
                  alt="User 1"
                  className="w-16 h-16 rounded-full border-2 border-white"
                />
                <img
                  src="/images/avatar2.jpg"
                  alt="User 2"
                  className="w-16 h-16 rounded-full border-2 border-white"
                />
                <img
                  src="/images/avatar3.jpg"
                  alt="User 3"
                  className="w-16 h-16 rounded-full border-2 border-white"
                />
              </div>
              <div className="mt-4 flex items-center text-yellow-400 space-x-2">
                <div className="flex space-x-1">
                  <span>⭐</span>
                  <span>⭐</span>
                  <span>⭐</span>
                  <span>⭐</span>
                  <span>⭐</span>
                </div>
                <p className="text-white font-medium">Over 100+ Reviews</p>
              </div>
            </motion.div>
          </div>
        </section>
      </Element>

      <Suspense
        fallback={
          <div className="h-40 flex items-center justify-center">
            Loading...
          </div>
        }
      >
        <Element name="trusted">
          <section id="trusted">
            <TrustedBySection />
          </section>
        </Element>
        <Element name="howItWorks">
          <section id="howItWorks">
            <HowItWorksSection />
          </section>
        </Element>
        <Element name="categories">
          <section id="categories">
            <CategoriesSection />
          </section>
        </Element>
        <Element name="contact">
          <section id="contact">
            <ContactSection />
          </section>
        </Element>
      </Suspense>
    </main>
  );
};

export default Home;
