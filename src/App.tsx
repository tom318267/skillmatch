import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
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

const App: React.FC = () => {
  const location = useLocation(); // Only available inside BrowserRouter

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
            <Route path="/jobs" element={<JobsPage />} />
            {/* Redirect to homepage sections */}
            <Route
              path="/contact"
              element={<Navigate to="/?section=contact" replace />}
            />
            <Route
              path="/how-it-works"
              element={<Navigate to="/?section=how-it-works" replace />}
            />
            <Route
              path="/categories"
              element={<Navigate to="/?section=categories" replace />}
            />
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
