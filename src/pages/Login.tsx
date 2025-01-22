import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase.ts";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-hot-toast";

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    const loadingToast = toast.loading("Logging in...");

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      toast.success("Successfully logged in!");
      navigate("/dashboard");
    } catch (err: any) {
      const errorMessage =
        err.code === "auth/user-not-found"
          ? "No account found with this email"
          : err.code === "auth/wrong-password" ||
            err.code === "auth/invalid-credential"
          ? "Incorrect email or password"
          : err.code === "auth/invalid-email"
          ? "Invalid email address"
          : err.code === "auth/too-many-requests"
          ? "Too many failed attempts. Please try again later."
          : `Error: ${err.message}`;

      toast.error(errorMessage);
      setError(errorMessage);
      console.error("Login error:", err);
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  return (
    <main className="h-[80vh] md:min-h-screen flex items-center justify-center bg-gray-100 py-2 md:py-12 px-4 md:px-6">
      <div className="max-w-md w-full space-y-4 md:space-y-6 bg-white p-4 md:p-8 rounded-lg shadow-md">
        {/* Header */}
        <div>
          <img
            src="/images/smlogo2.png"
            alt="SkillMatch Logo"
            className="mx-auto h-16 md:h-20 w-auto"
          />
          <h2 className="mt-6 text-center text-3xl font-semibold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Welcome back to SkillMatch
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-secondary hover:text-secondary"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-secondary hover:bg-[#24558a]"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;
