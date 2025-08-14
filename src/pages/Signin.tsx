import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import {
  setAuthToken,
  setUserData,
  clearAuthCookies,
  isAuthenticated,
} from "../utils/cookies";
import { AuthService } from "../services/authService";

interface SigninFormData {
  username: string;
  password: string;
  rememberMe: boolean;
}

const Signin: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/profile");
    }
  }, [navigate]);

  const [formData, setFormData] = useState<SigninFormData>({
    username: "",
    password: "",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isFacebookLoading, setIsFacebookLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError(""); // Clear error when user types
  };

  const validateForm = () => {
    if (!formData.username.trim()) return "Username is required";
    if (!formData.password) return "Password is required";

    if (formData.username.length < 3)
      return "Username must be at least 3 characters";

    if (formData.password.length < 6)
      return "Password must be at least 6 characters";

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      console.log("🔄 Authenticating with API...");

      // Clear any existing auth data
      clearAuthCookies();

      // Call the real signin API
      const response = await AuthService.signin({
        username: formData.username,
        password: formData.password,
      });

      if (!response.success || !response.data) {
        throw new Error(
          response.message || response.error || "Authentication failed"
        );
      }

      const { token, user, expiresIn } = response.data;

      console.log("✅ Authentication successful");
      console.log("  - User:", user.username);
      console.log("  - Role:", user.role);
      console.log("  - Token expires:", expiresIn);

      // Store authentication data
      setAuthToken(token);
      setUserData(user);

      // Update user's last login if remember me is checked
      if (formData.rememberMe) {
        console.log("🍪 Remember me enabled - storing persistent session");
      }

      // Verify authentication was successful
      const isAuth = isAuthenticated();
      if (!isAuth) {
        throw new Error("Failed to establish authenticated session");
      }

      console.log("🎉 Login successful, redirecting...");

      // Navigate to dashboard or intended destination
      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (err: any) {
      console.error("❌ Authentication failed:", err);

      // Handle specific error cases
      if (
        err.message?.includes("401") ||
        err.message?.includes("Unauthorized")
      ) {
        setError("Invalid username or password. Please try again.");
      } else if (
        err.message?.includes("429") ||
        err.message?.includes("Too Many Requests")
      ) {
        setError("Too many login attempts. Please try again later.");
      } else if (
        err.message?.includes("500") ||
        err.message?.includes("Server Error")
      ) {
        setError("Server error. Please try again later or contact support.");
      } else if (err.message?.includes("fetch")) {
        setError("Network error. Please check your connection and try again.");
      } else {
        setError(err.message || "Authentication failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignin = async () => {
    setIsGoogleLoading(true);
    setError("");

    try {
      console.log("🔄 Initiating Google OAuth...");

      const response = await AuthService.googleAuth();

      if (!response.success || !response.data) {
        throw new Error(
          response.message ||
            response.error ||
            "Failed to initiate Google authentication"
        );
      }

      // Redirect to Google OAuth URL
      window.location.href = response.data.redirectUrl;
    } catch (err: any) {
      console.error("❌ Google OAuth error:", err);
      setError(
        "Google sign-in failed. Please try again or use email/password."
      );
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleFacebookSignin = async () => {
    setIsFacebookLoading(true);
    setError("");

    try {
      console.log("🔄 Initiating Facebook OAuth...");

      const response = await AuthService.facebookAuth();

      if (!response.success || !response.data) {
        throw new Error(
          response.message ||
            response.error ||
            "Failed to initiate Facebook authentication"
        );
      }

      // Redirect to Facebook OAuth URL
      window.location.href = response.data.redirectUrl;
    } catch (err: any) {
      console.error("❌ Facebook OAuth error:", err);
      setError(
        "Facebook sign-in failed. Please try again or use email/password."
      );
    } finally {
      setIsFacebookLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.username.trim()) {
      setError("Please enter your username first to reset your password.");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      console.log("🔄 Sending password reset request...");

      const response = await AuthService.forgotPassword({
        username: formData.username,
      });

      if (response.success) {
        setError(""); // Clear any errors
        alert(
          `Password reset instructions have been sent to your email. ${response.message || ""}`
        );
      } else {
        throw new Error(
          response.message || "Failed to send password reset email"
        );
      }
    } catch (err: any) {
      console.error("❌ Forgot password error:", err);
      setError(
        err.message || "Failed to send password reset email. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              to="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              create a new account
            </Link>
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Social Sign In */}
          <div className="space-y-3 mb-6">
            <button
              onClick={handleGoogleSignin}
              disabled={isGoogleLoading || isLoading}
              className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isGoogleLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
                  Connecting to Google...
                </div>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </>
              )}
            </button>

            <button
              onClick={handleFacebookSignin}
              disabled={isFacebookLoading || isLoading}
              className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isFacebookLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
                  Connecting to Facebook...
                </div>
              ) : (
                <>
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="#1877F2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Continue with Facebook
                </>
              )}
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 rounded-md bg-red-50 border border-red-200">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Signin Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Username or Email
              </label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={formData.username}
                  onChange={handleInputChange}
                  disabled={isLoading || isGoogleLoading || isFacebookLoading}
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  placeholder="Enter your username or email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={isLoading || isGoogleLoading || isFacebookLoading}
                  className="pl-10 pr-10 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading || isGoogleLoading || isFacebookLoading}
                  className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  disabled={isLoading || isGoogleLoading || isFacebookLoading}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <label
                  htmlFor="rememberMe"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  disabled={isLoading || isGoogleLoading || isFacebookLoading}
                  className="font-medium text-indigo-600 hover:text-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Forgot your password?
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading || isGoogleLoading || isFacebookLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  "Sign in"
                )}
              </button>
            </div>
          </form>

          {/* Additional Options */}
          <div className="mt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
                >
                  Sign up now
                </Link>
              </p>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-2">Need help?</p>
              <div className="flex justify-center space-x-4 text-xs">
                <a
                  href="#"
                  className="text-indigo-600 hover:text-indigo-500 transition-colors"
                >
                  Contact Support
                </a>
                <span className="text-gray-300">|</span>
                <a
                  href="#"
                  className="text-indigo-600 hover:text-indigo-500 transition-colors"
                >
                  Privacy Policy
                </a>
                <span className="text-gray-300">|</span>
                <a
                  href="#"
                  className="text-indigo-600 hover:text-indigo-500 transition-colors"
                >
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
