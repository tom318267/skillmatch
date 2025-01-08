import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, useSearchParams } from "react-router-dom";
import { Element } from "react-scroll";
import TrustedBySection from "../components/TrustedBySection.tsx";
import HowItWorksSection from "../components/HowItWorksSection.tsx";
import CategoriesSection from "../components/CategoriesSection.tsx";
import ContactSection from "../components/ContactSection.tsx";

const Home: React.FC = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();

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
    <>
      <Element name="home">
        <section
          id="home"
          className="relative text-white min-h-screen bg-cover bg-center bg-no-repeat py-[148px] scroll-mt-[70px]"
          style={{ backgroundImage: 'url("/images/bg-skillmatch.jpg")' }}
        >
          <div className="container mx-auto text-center">
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
            <motion.div
              className="mt-10 flex flex-col md:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            >
              <input
                type="text"
                placeholder="Search by job title, keyword, etc."
                className="px-4 py-3 w-full md:w-2/5 rounded border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Search by location"
                className="px-4 py-3 w-full md:w-2/5 rounded border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-6 py-3 bg-primary text-white font-medium rounded transition hover:outline hover:outline-1 hover:outline-white">
                Search
              </button>
            </motion.div>

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
      <Element name="trusted">
        <section id="trusted" className="scroll-mt-[70px]">
          <TrustedBySection />
        </section>
      </Element>
      <Element name="howItWorks">
        <section id="howItWorks" className="scroll-mt-20">
          <HowItWorksSection />
        </section>
      </Element>
      <Element name="categories">
        <section id="categories" className="scroll-mt-[70px]">
          <CategoriesSection />
        </section>
      </Element>
      <Element name="contact">
        <section id="contact" className="scroll-mt-[70px]">
          <ContactSection />
        </section>
      </Element>
    </>
  );
};

export default Home;
