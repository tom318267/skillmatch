import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    icon: "/images/art.svg",
    title: "design & creative",
    description:
      "Bring ideas to life with jobs in graphic design, UX/UI, and video production.",
  },
  {
    icon: "/images/tech.svg",
    title: "technology",
    description:
      "Build the future with roles in software development, IT, and engineering.",
  },
  {
    icon: "/images/health.svg",
    title: "healthcare",
    description:
      "Make an impact with jobs in nursing, research, and health administration.",
  },
  {
    icon: "/images/marketing.svg",
    title: "marketing & sales",
    description:
      "Drive growth and innovation with roles in digital marketing, branding, and sales.",
  },
  {
    icon: "/images/finance.svg",
    title: "finance",
    description:
      "Shape strategies and manage resources in finance, accounting, and analysis.",
  },
  {
    icon: "/images/customer.svg",
    title: "customer-service",
    description:
      "Connect with clients and solve problems in customer support and client success.",
  },
];

const CategoriesSection: React.FC = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category: string) => {
    navigate(`/jobs?category=${encodeURIComponent(category)}`);
  };

  return (
    <section
      className="bg-category bg-cover bg-center py-[148px]"
      aria-labelledby="categories-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2
          id="categories-heading"
          data-aos="fade-up"
          className="text-4xl md:text-[50px] font-semibold text-primary"
        >
          Browse Job Categories
        </h2>
        <p
          data-aos="fade-up"
          className="text-gray-600 mb-20 max-w-2xl mx-auto text-lg mt-8"
        >
          Discover opportunities across various industries and find your perfect
          career match. Browse our curated categories to explore roles that
          align with your skills and interests.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div
              key={category.title}
              data-aos="fade-up"
              data-aos-delay={String(index * 100)}
              onClick={() => handleCategoryClick(category.title)}
              className="bg-white h-[373px] rounded-lg p-6 flex flex-col items-center justify-center 
              transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl
              cursor-pointer"
            >
              <img
                src={category.icon}
                alt={category.title}
                className="w-[102px] h-auto mb-4"
                loading="lazy"
                width="102"
                height="102"
              />
              <h3 className="text-[32px] font-medium text-primary mb-2 w-[290px] capitalize">
                {category.title}
              </h3>
              <p className="text-gray-500 text-center w-[290px]">
                {category.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
