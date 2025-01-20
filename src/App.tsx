import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Home from "./pages/Home.tsx";
import Navbar from "./components/layout/Navbar.tsx";
import Footer from "./components/layout/Footer.tsx";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import JobsPage from "./pages/JobsPage.tsx";
import { Toaster } from "react-hot-toast";
import MainJobsPage from "./pages/MainJobsPage.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Blogs from "./pages/Blogs.tsx";
import AboutUs from "./pages/AboutUs.tsx";
import JobsSearchResults from "./pages/JobsSearchResults.tsx";
import BlogPost from "./pages/BlogPost.tsx";

const App: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [location]);

  return (
    <>
      <Toaster position="top-right" />
      <AuthProvider>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/jobs/search" element={<JobsSearchResults />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/jobs/all" element={<MainJobsPage />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about-us" element={<AboutUs />} />
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </>
  );
};

// Wrap App with BrowserRouter
const RootApp = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default RootApp;
