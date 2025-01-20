import React from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  const team = [
    {
      name: "Brandon Ross",
      role: "Product Lead",
      image: "/images/employee1.jpg",
    },
    {
      name: "Peter Bergman",
      role: "Tech Lead",
      image: "/images/employee2.jpg",
    },
    {
      name: "Kate Clark",
      role: "Design Director",
      image: "/images/employee3.jpg",
    },
    {
      name: "Sarah Davis",
      role: "Marketing Lead",
      image: "/images/employee4.jpg",
    },
  ];

  return (
    <main className="min-h-screen px-6 md:px-4 ">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="container mx-auto pt-32 pb-20"
      >
        <div className="flex flex-col md:flex-row justify-between items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full md:max-w-3xl"
          >
            <h1 className="text-5xl md:text-6xl font-semibold text-primary mb-4">
              We build bridges between
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-secondary block"
              >
                talent and opportunity
              </motion.span>
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="md:max-w-lg mt-8 md:mt-0"
          >
            <p className="text-xl text-gray-600">
              At SkillMatch, we create connections that last. Our platform
              brings together skilled professionals and forward-thinking
              companies to build teams that thrive.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Image Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.42, 0, 0.58, 1] }}
        className="container mx-auto pb-20"
      >
        <img
          src="/images/workplace.jpg"
          alt="Team Collaboration"
          className="w-full h-[500px] object-cover rounded-lg shadow-xl"
        />
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="container bg-primary mx-auto sm:px-6 lg:px-8 py-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { number: 290, text: "Successful matches per month" },
            { number: 12, text: "Years of experience" },
            { number: 20000, text: "Active users" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <span className="text-5xl font-bold text-white">
                {stat.number}+
              </span>
              <p className="text-white mt-2">{stat.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Team Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
        }}
        className="container mx-auto py-20"
      >
        <motion.h2
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }}
          className="text-4xl font-semibold mb-12 text-primary"
        >
          Meet our amazing team
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{
                duration: 0.8,
                type: "spring",
                damping: 20,
                stiffness: 40,
                delay: index * 0.2,
              }}
              whileHover={{ y: -10 }}
            >
              <div className="aspect-w-1 aspect-h-1 mb-4 overflow-hidden rounded-lg">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <h3 className="text-lg font-medium mt-4">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Join Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }}
        className="container mx-auto py-20"
      >
        <h2 className="text-4xl font-semibold text-primary mb-6">
          Join our team
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mb-8">
          We're always looking for great people to join us on our mission. Take
          a look at our open positions and become a part of something special.
        </p>
        <motion.button
          whileHover={{ x: 10 }}
          transition={{ type: "spring", stiffness: 400 }}
          className="text-secondary font-semibold hover:text-[#24558a]"
        >
          See open positions →
        </motion.button>
      </motion.div>
    </main>
  );
};

export default AboutUs;
