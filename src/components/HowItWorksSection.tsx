import React, { useEffect } from "react";
import AOS from "aos";

const HowItWorksSection: React.FC = () => {
  return (
    <section id="howItWorks" className="bg-white py-[148px]">
      <div className="container mx-auto text-center">
        {/* Title */}
        <h2
          data-aos="fade-up"
          className="text-2xl md:text-[50px] font-semibold text-primary"
        >
          How SkillMatch Works
        </h2>
        <p
          data-aos="fade-up"
          data-aos-delay="100"
          className="text-gray-600 mb-[80px] text-lg max-w-2xl mx-auto mt-8"
        >
          Getting started is simple. Create a profile, add your skills, and let
          SkillMatch connect you with opportunities tailored to your expertise.
        </p>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="flex flex-col items-center"
          >
            <img
              data-aos="zoom-in"
              data-aos-delay="300"
              src="/images/profile3.svg"
              alt="Create profile and add skills"
              className="w-52 h-52 mb-6"
            />
            <h3
              data-aos="fade-up"
              data-aos-delay="400"
              className="text-xl font-semibold text-primary mb-4"
            >
              Create a profile and add your skills
            </h3>
            <p
              data-aos="fade-up"
              data-aos-delay="500"
              className="text-md text-gray-600 max-w-xs"
            >
              Build your professional profile by showcasing your skills,
              experience, and certifications. The more detailed your profile,
              the better your matches.
            </p>
          </div>

          {/* Step 2 */}
          <div
            data-aos="fade-up"
            data-aos-delay="400"
            className="flex flex-col items-center"
          >
            <img
              data-aos="zoom-in"
              data-aos-delay="500"
              src="/images/job.svg"
              alt="Get matched with job opportunities"
              className="w-52 h-52 mb-6"
            />
            <h3
              data-aos="fade-up"
              data-aos-delay="600"
              className="text-xl font-semibold text-primary mb-4"
            >
              Get matched with top jobs
            </h3>
            <p
              data-aos="fade-up"
              data-aos-delay="700"
              className="text-md text-gray-600 max-w-xs"
            >
              Our AI-powered algorithm analyzes your profile to find the perfect
              job matches. Receive personalized recommendations based on your
              unique skill set.
            </p>
          </div>

          {/* Step 3 */}
          <div
            data-aos="fade-up"
            data-aos-delay="600"
            className="flex flex-col items-center"
          >
            <img
              data-aos="zoom-in"
              data-aos-delay="700"
              src="/images/apply.svg"
              alt="Apply directly to top companies"
              className="w-52 h-52 mb-6"
            />
            <h3
              data-aos="fade-up"
              data-aos-delay="800"
              className="text-xl font-semibold text-primary mb-4"
            >
              Apply directly to top companies
            </h3>
            <p
              data-aos="fade-up"
              data-aos-delay="900"
              className="text-md text-gray-600 max-w-xs"
            >
              Skip the lengthy application process. Apply with one click to
              vetted companies that are actively seeking candidates with your
              qualifications.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
