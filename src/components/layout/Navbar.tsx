import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { handleSignOut } from "../../utils/auth.ts";
import { auth } from "../../config/firebase.ts";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

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
      <div className="container mx-auto py-2 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center">
          <RouterLink to="/">
            <div className="flex-shrink-0">
              <img
                src="/images/skillmatchlogo.svg"
                alt="SkillMatch Logo"
                className="h-[100px] w-[100px]"
              />
            </div>
          </RouterLink>
        </div>

        {/* Links Section */}
        <div className="hidden md:flex space-x-14">
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
        <div className="flex space-x-4">
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
