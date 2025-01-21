import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { handleSignOut } from "../../utils/auth.ts";
import { auth } from "../../config/firebase.ts";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onSignOut = async () => {
    try {
      await handleSignOut(navigate);
      toast.success("Successfully signed out!");
    } catch (error) {
      toast.error("Error signing out. Please try again.");
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto py-2 px-6 sm:px-4 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center">
          <RouterLink to="/">
            <div className="flex-shrink-0">
              <img
                src="/images/skillmatchlogo-mobile.svg"
                srcSet="/images/skillmatchlogo-mobile.svg 60w, /images/skillmatchlogo.svg 100w"
                sizes="(max-width: 768px) 60px, 100px"
                alt="SkillMatch Logo"
                className="h-[60px] w-[60px] md:h-[100px] md:w-[100px]"
              />
            </div>
          </RouterLink>
        </div>

        {/* Hamburger Menu Button */}
        <button
          className="lg:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="w-6 h-0.5 bg-primary mb-1.5"></div>
          <div className="w-6 h-0.5 bg-primary mb-1.5"></div>
          <div className="w-6 h-0.5 bg-primary"></div>
        </button>

        {/* Mobile Menu */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } lg:hidden absolute top-[76px] md:top-[116px] left-0 right-0 bg-white shadow-md z-50`}
        >
          <div className="flex flex-col space-y-4 px-6 py-4">
            <RouterLink
              to="/"
              className="text-base font-medium text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </RouterLink>
            {user && (
              <RouterLink
                to="/dashboard"
                className="text-base font-medium text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </RouterLink>
            )}
            <RouterLink
              to="/jobs/all"
              className="text-base font-medium text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Browse Jobs
            </RouterLink>
            <RouterLink
              to="/blogs"
              className="text-base font-medium text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Blogs
            </RouterLink>
            <RouterLink
              to="/about-us"
              className="text-base font-medium text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </RouterLink>

            {/* Auth buttons in mobile menu with desktop styling */}
            {user ? (
              <button
                onClick={() => {
                  onSignOut();
                  setIsMenuOpen(false);
                }}
                className="px-4 py-2 text-sm font-medium text-secondary border border-secondary rounded transition hover:bg-secondary/10 w-fit"
              >
                Sign Out
              </button>
            ) : (
              <div className="flex flex-col space-y-2">
                <RouterLink to="/login" onClick={() => setIsMenuOpen(false)}>
                  <button className="px-4 py-2 text-sm font-medium text-secondary border border-secondary rounded transition hover:bg-secondary/10 w-full">
                    Log In
                  </button>
                </RouterLink>
                <RouterLink to="/signup" onClick={() => setIsMenuOpen(false)}>
                  <button className="px-4 py-2 text-sm font-medium text-white bg-secondary rounded hover:bg-[#24558a] transition w-full">
                    Sign Up
                  </button>
                </RouterLink>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Links Section */}
        <div className="hidden lg:flex space-x-14">
          <>
            <RouterLink
              to="/"
              className="text-base font-medium text-primary transition relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full cursor-pointer"
            >
              Home
            </RouterLink>

            {user && (
              <RouterLink
                to="/dashboard"
                className="text-base font-medium text-primary transition relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full cursor-pointer"
              >
                Dashboard
              </RouterLink>
            )}

            <RouterLink
              to="/jobs/all"
              className="text-base font-medium text-primary transition relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full cursor-pointer"
            >
              Browse Jobs
            </RouterLink>
            <RouterLink
              to="/blogs"
              className="text-base font-medium text-primary transition relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full cursor-pointer"
            >
              Blogs
            </RouterLink>
            <RouterLink
              to="/about-us"
              className="text-base font-medium text-primary transition relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full cursor-pointer"
            >
              About Us
            </RouterLink>
          </>
        </div>

        {/* Buttons Section */}
        <div className="hidden lg:flex space-x-4">
          {user ? (
            <button
              onClick={onSignOut}
              className="px-4 py-2 text-sm font-medium text-secondary border border-secondary rounded transition hover:bg-secondary/10"
            >
              Sign Out
            </button>
          ) : (
            <>
              <RouterLink to="/login">
                <button className="px-4 py-2 text-sm font-medium text-secondary border border-secondary rounded transition hover:bg-secondary/10">
                  Log In
                </button>
              </RouterLink>
              <RouterLink to="/signup">
                <button className="px-4 py-2 text-sm font-medium text-white bg-secondary rounded hover:bg-[#24558a] transition">
                  Sign Up
                </button>
              </RouterLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
