import React from "react";

const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      img: "/images/cprofile.png",
      alt: "Create profile and add skills",
      title: "Create a profile and add your skills",
      description:
        "Build your professional profile by showcasing your skills, experience, and certifications. The more detailed your profile, the better your matches.",
      delay: "200",
    },
    {
      img: "/images/searchjob.png",
      alt: "Get matched with job opportunities",
      title: "Get matched with top jobs",
      description:
        "Our AI-powered algorithm analyzes your profile to find the perfect job matches. Receive personalized recommendations based on your unique skill set.",
      delay: "400",
    },
    {
      img: "/images/apply.png",
      alt: "Apply directly to top companies",
      title: "Apply directly to top companies",
      description:
        "Skip the lengthy application process. Apply with one click to vetted companies that are actively seeking candidates with your qualifications.",
      delay: "600",
    },
  ];

  return (
    <section
      id="howItWorks"
      className="bg-white py-[148px] px-4 sm:px-6 lg:px-8"
    >
      <div className="container mx-auto text-center">
        <h2
          data-aos="fade-up"
          className="text-4xl md:text-[50px] font-semibold text-primary"
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.title}
              data-aos="fade-up"
              data-aos-delay={step.delay}
              className="flex flex-col items-center"
            >
              <img
                src={step.img}
                alt={step.alt}
                className="w-40 md:w-52 h-52 mb-6 object-contain"
                loading="lazy"
                width="208"
                height="208"
                data-aos="zoom-in"
                data-aos-delay={String(Number(step.delay) + 100)}
              />
              <h3
                data-aos="fade-up"
                data-aos-delay={String(Number(step.delay) + 200)}
                className="text-xl font-semibold text-primary mb-4"
              >
                {step.title}
              </h3>
              <p
                data-aos="fade-up"
                data-aos-delay={String(Number(step.delay) + 300)}
                className="text-md text-gray-600 max-w-xs"
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
