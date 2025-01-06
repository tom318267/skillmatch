import React from "react";
import { Link } from "react-router-dom";
import { FaTwitter, FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <img
                src="/images/skillwhite.svg"
                alt="Company Logo"
                className="h-18 w-auto"
              />
            </Link>
            <p className="text-white">
              Making the world a better place through innovative solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white hover:text-white">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-white hover:text-white">
                  Find Jobs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xl font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-white hover:text-white">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-white hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-white hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-white hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com"
                className="text-white hover:text-white"
              >
                <FaTwitter className="text-2xl" />
              </a>
              <a
                href="https://facebook.com"
                className="text-white hover:text-white"
              >
                <FaFacebook className="text-2xl" />
              </a>
              <a
                href="https://linkedin.com"
                className="text-white hover:text-white"
              >
                <FaLinkedin className="text-2xl" />
              </a>
              <a
                href="https://instagram.com"
                className="text-white hover:text-white"
              >
                <FaInstagram className="text-2xl" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white mt-8 pt-8 text-center text-white">
          <p>© {new Date().getFullYear()} SkillMatch. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
