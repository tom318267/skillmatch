import React, { useState } from "react";
import { toast } from "react-hot-toast";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    toast.success("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="flex flex-col bg-geo bg-cover bg-center items-center justify-center min-h-screen py-[148px]">
      <div className="max-w-4xl w-full px-4 sm:px-6 lg:px-8">
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-[50px] font-semibold text-primary">
            Let's{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Connect
            </span>
          </h2>
          <p className="text-gray-600 mb-20 max-w-2xl mx-auto text-lg mt-8">
            Need help with your job search? We're here to assist you.
          </p>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="1000"
          className="bg-white/90 backdrop-blur-md rounded-xl shadow-xl p-10 border border-secondary/10 hover:shadow-2xl hover:scale-[1.01] transition-all duration-300"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label
                htmlFor="name"
                className="block text-md font-medium text-gray-700 mb-2"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-2 block w-full rounded-lg border-2 border-secondary/30 shadow-sm focus:border-secondary focus:ring-secondary px-5 py-3 text-md transition-all duration-200 hover:border-secondary/50"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-md font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-2 block w-full rounded-lg border-2 border-secondary/30 shadow-sm focus:border-secondary focus:ring-secondary px-5 py-3 text-md transition-all duration-200 hover:border-secondary/50"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-md font-medium text-gray-700 mb-2"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="mt-2 block w-full rounded-lg border-2 border-secondary/30 shadow-sm focus:border-secondary focus:ring-secondary px-5 py-4 text-md transition-all duration-200 hover:border-secondary/50"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-4 px-6 border border-transparent rounded-lg shadow-md text-md font-medium text-white bg-secondary  hover:bg-[#24558a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
