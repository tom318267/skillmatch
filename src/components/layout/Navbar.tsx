import React from "react";
import { Link } from "react-scroll";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { handleSignOut } from "../../utils/auth.ts";
import { auth } from "../../config/firebase.ts";
import { useAuthState } from "react-firebase-hooks/auth";
import { scroller } from "react-scroll";

const Navbar: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const handleSectionNavigation = (section: string) => {
    if (location.pathname !== "/") {
      navigate(`/?section=${section}`); // Navigate to the homepage with query parameter
    } else {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  const onSignOut = async () => {
    await handleSignOut(navigate);
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
          {isHomePage ? (
            <>
              <Link
                to="home"
                spy={true}
                smooth={true}
                duration={500}
                offset={-70} // Adjust for fixed navbar
                className="text-base font-medium text-primary transition relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full cursor-pointer"
              >
                Home
              </Link>
              <Link
                to="howItWorks"
                spy={true}
                smooth={true}
                duration={500}
                offset={-70}
                className="text-base font-medium text-primary transition relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full cursor-pointer"
              >
                How It Works
              </Link>
              <Link
                to="categories"
                spy={true}
                smooth={true}
                duration={500}
                offset={-70}
                className="text-base font-medium text-primary transition relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full cursor-pointer"
              >
                Browse Jobs
              </Link>
              <Link
                to="contact"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="text-base font-medium text-primary transition relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full cursor-pointer"
              >
                Contact
              </Link>
            </>
          ) : (
            <>
              <RouterLink
                to="/"
                onClick={() => handleSectionNavigation("home")}
                className="text-base font-medium text-primary transition relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full cursor-pointer"
              >
                Home
              </RouterLink>
              <RouterLink
                to="/"
                onClick={() => handleSectionNavigation("howItWorks")}
                className="text-base font-medium text-primary transition relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full cursor-pointer"
              >
                How It Works
              </RouterLink>

              <RouterLink
                to="/"
                onClick={() => handleSectionNavigation("categories")}
                className="text-base font-medium text-primary transition relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full cursor-pointer"
              >
                Browse Jobs
              </RouterLink>
              <RouterLink
                to="/"
                onClick={() => handleSectionNavigation("contact")}
                className="text-base font-medium text-primary transition relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full cursor-pointer"
              >
                Contact
              </RouterLink>
            </>
          )}
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
