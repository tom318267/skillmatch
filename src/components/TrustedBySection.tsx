import React from "react";

const TrustedBySection: React.FC = () => {
  return (
    <section className="bg-primary text-white py-[148px] px-6 sm:px-0">
      <div className="container mx-auto text-center">
        <h2
          className="text-xl font-medium mb-[75px]"
          data-aos="fade-up"
          data-aos-delay="0"
        >
          Trusted by 100+ world's best companies
        </h2>

        <div className="flex flex-wrap justify-center sm:justify-between items-center gap-8">
          {[
            { src: "/images/coinbase.svg", alt: "Coinbase", delay: "100" },
            { src: "/images/amazon.svg", alt: "Amazon", delay: "200" },
            { src: "/images/stripe.svg", alt: "Stripe", delay: "300" },
            { src: "/images/airbnb.svg", alt: "Airbnb", delay: "400" },
            { src: "/images/medium.svg", alt: "Medium", delay: "500" },
          ].map((logo) => (
            <img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              className="h-12 md:h-16"
              loading="lazy"
              width="85"
              height="85"
              data-aos="fade-right"
              data-aos-delay={logo.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;
