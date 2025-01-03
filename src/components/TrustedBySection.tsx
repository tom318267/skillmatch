import React, { useEffect } from "react";
import AOS from "aos";

const TrustedBySection: React.FC = () => {
  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <section className="bg-primary text-white py-[148px]">
      <div className="container mx-auto text-center">
        {/* Title */}
        <h2
          className="text-xl font-medium mb-[75px]"
          data-aos="fade-up"
          data-aos-delay="0"
        >
          Trusted by 100+ world's best companies
        </h2>

        {/* Logos */}
        <div className="flex flex-wrap justify-between items-center gap-8">
          <img
            src="/images/coinbase.svg"
            alt="Coinbase"
            className="h-8 md:h-10"
            data-aos="fade-right"
            data-aos-delay="100"
          />
          <img
            src="/images/amazon.svg"
            alt="Amazon"
            className="h-8 md:h-10"
            data-aos="fade-right"
            data-aos-delay="200"
          />
          <img
            src="/images/stripe.svg"
            alt="Stripe"
            className="h-8 md:h-10"
            data-aos="fade-right"
            data-aos-delay="300"
          />
          <img
            src="/images/airbnb.svg"
            alt="Airbnb"
            className="h-8 md:h-10"
            data-aos="fade-right"
            data-aos-delay="400"
          />
          <img
            src="/images/medium.svg"
            alt="Medium"
            className="h-8 md:h-10"
            data-aos="fade-right"
            data-aos-delay="500"
          />
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;
