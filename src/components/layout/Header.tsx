import React, { useState } from "react";
import {
  HardHat,
  X,
  Menu,
  User,
  LogIn,
  LogOut,
  UserPlus,
  ChevronDown,
  Sun,
  Moon,
  FolderOpen,
} from "lucide-react";
import { Link } from "react-router-dom";

interface HeaderProps {
  isDarkMode: boolean;
  scrollY: number;
  toggleTheme: () => void;
  scrollToSection: (sectionId: string) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  user: any | null;
  handleLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({
  isDarkMode,
  scrollY,
  toggleTheme,
  scrollToSection,
  isMenuOpen,
  setIsMenuOpen,
  user,
  handleLogout,
}) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Debug user state
  console.log("🔍 Header component render:", {
    hasUser: !!user,
    user: user,
    userMenuOpen: isUserMenuOpen,
  });

  const handleLogoutClick = () => {
    setIsUserMenuOpen(false);
    handleLogout();
  };

  const authButtonClass = `flex items-center px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium ${
    isDarkMode
      ? "text-gray-300 hover:bg-white/10 hover:text-white"
      : "text-gray-700 hover:bg-gray-100"
  }`;

  const primaryAuthButtonClass = `flex items-center px-4 py-2 rounded-full text-sm font-medium text-white transition-all duration-300 transform hover:-translate-y-0.5 ${
    isDarkMode
      ? "bg-cyan-500 hover:bg-cyan-400 shadow-lg shadow-cyan-500/20"
      : "bg-cyan-600 hover:bg-cyan-700 shadow-lg"
  }`;

  return (
    <header
      className="fixed top-0 w-full z-50 transition-all duration-300"
      style={{
        background:
          scrollY > 50
            ? isDarkMode
              ? "rgba(15, 23, 42, 0.95)"
              : "rgba(255, 255, 255, 0.98)"
            : "transparent",
        backdropFilter: scrollY > 50 ? "blur(20px)" : "none",
        borderBottom:
          scrollY > 50
            ? isDarkMode
              ? "1px solid rgba(255, 255, 255, 0.1)"
              : "1px solid rgba(0, 0, 0, 0.1)"
            : "none",
        boxShadow:
          scrollY > 50 && !isDarkMode
            ? "0 4px 20px rgba(0, 0, 0, 0.05)"
            : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center group">
            <div className="relative">
              <HardHat className="w-12 h-12 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" />
              <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full animate-pulse"></div>
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                CB Construction
              </h1>
              <p
                className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-700"}`}
              >
                Future Building Solutions
              </p>
            </div>
          </div>

          {/* Desktop Navigation & Auth */}
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex space-x-6">
              {["Home", "Services", "Projects", "Technology", "Contact"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`relative ${isDarkMode ? "text-gray-300 hover:text-cyan-400" : "text-gray-700 hover:text-cyan-600"} font-medium transition-all duration-300 group`}
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                  </button>
                )
              )}
            </nav>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${isDarkMode ? "text-gray-300 hover:bg-white/10" : "text-gray-700 hover:bg-gray-100"}`}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Auth Section */}
            <div className="flex items-center space-x-2">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className={`flex items-center space-x-3 px-4 py-2 rounded-full transition-all duration-300 ${
                      isDarkMode
                        ? "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-200"
                    } hover:shadow-lg`}
                  >
                    <div
                      className={`p-1.5 rounded-full ${isDarkMode ? "bg-cyan-500/20" : "bg-cyan-500/10"}`}
                    >
                      <User className="w-4 h-4 text-cyan-400" />
                    </div>
                    <span className="font-medium text-sm">
                      Hi, {user.username}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        isUserMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isUserMenuOpen && (
                    <div
                      className={`absolute right-0 mt-2 w-56 ${isDarkMode ? "bg-slate-800 border border-slate-700" : "bg-white border border-gray-200"} rounded-lg shadow-xl py-2 z-50`}
                    >
                      <div
                        className={`px-4 py-3 border-b ${isDarkMode ? "border-slate-700" : "border-gray-200"}`}
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`p-2 rounded-full ${isDarkMode ? "bg-cyan-500/20" : "bg-cyan-500/10"}`}
                          >
                            <User className="w-5 h-5 text-cyan-400" />
                          </div>
                          <div>
                            <p
                              className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}
                            >
                              {user.username}
                            </p>
                            {user.email && (
                              <p
                                className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                              >
                                {user.email}
                              </p>
                            )}
                            {user.role && (
                              <p
                                className={`text-xs px-2 py-1 rounded-full inline-block mt-1 ${
                                  isDarkMode
                                    ? "bg-purple-500/20 text-purple-300"
                                    : "bg-purple-100 text-purple-700"
                                }`}
                              >
                                {user.role}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      {/* Projects Link */}
                      <Link
                        to="/projects"
                        onClick={() => setIsUserMenuOpen(false)}
                        className={`flex items-center w-full text-left px-4 py-3 text-sm transition-colors ${isDarkMode ? "text-gray-300 hover:bg-white/10" : "text-gray-700 hover:bg-gray-100"}`}
                      >
                        <FolderOpen className="w-4 h-4 mr-3" />
                        View All Projects
                      </Link>
                      {/* Profile Link */}
                      <Link
                        to="/profile"
                        onClick={() => setIsUserMenuOpen(false)}
                        className={`flex items-center w-full text-left px-4 py-3 text-sm transition-colors ${isDarkMode ? "text-gray-300 hover:bg-white/10" : "text-gray-700 hover:bg-gray-100"}`}
                      >
                        <User className="w-4 h-4 mr-3" />
                        Profile
                      </Link>
                      <button
                        onClick={handleLogoutClick}
                        className={`flex items-center w-full text-left px-4 py-3 text-sm transition-colors ${
                          isDarkMode
                            ? "text-red-400 hover:bg-red-500/10"
                            : "text-red-600 hover:bg-red-50"
                        }`}
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link to="/signin" className={authButtonClass}>
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </Link>
                  <Link to="/signup" className={primaryAuthButtonClass}>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 rounded-lg ${isDarkMode ? "bg-white/10 hover:bg-white/20" : "bg-black/10 hover:bg-black/20"} transition-colors`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div
          className={`md:hidden ${isDarkMode ? "bg-slate-900/95" : "bg-white/98"} backdrop-blur-xl border-t ${isDarkMode ? "border-white/10" : "border-gray-200"} shadow-2xl`}
        >
          <div className="px-4 pt-4 pb-6 space-y-1">
            {["Home", "Services", "Projects", "Technology", "Contact"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() => {
                    scrollToSection(item.toLowerCase());
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 ${isDarkMode ? "text-gray-300 hover:text-cyan-400 hover:bg-white/5" : "text-gray-700 hover:text-cyan-600 hover:bg-gray-50"} rounded-xl transition-all duration-300`}
                >
                  {item}
                </button>
              )
            )}

            {/* Mobile Auth Section */}
            <div
              className={`pt-4 mt-2 border-t ${isDarkMode ? "border-white/10" : "border-gray-200"}`}
            >
              {user ? (
                <div className="space-y-2">
                  <div
                    className={`flex items-center px-4 py-4 rounded-xl ${isDarkMode ? "bg-white/10 border border-white/20" : "bg-gray-100 border border-gray-200"}`}
                  >
                    <div
                      className={`p-2 rounded-full mr-3 ${isDarkMode ? "bg-cyan-500/20" : "bg-cyan-500/10"}`}
                    >
                      <User className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div className="flex-1">
                      <p
                        className={`font-medium ${isDarkMode ? "text-white" : "text-gray-800"}`}
                      >
                        Hi, {user.username}
                      </p>
                      {user.email && (
                        <p
                          className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                        >
                          {user.email}
                        </p>
                      )}
                      {user.role && (
                        <p
                          className={`text-xs px-2 py-1 rounded-full inline-block mt-1 ${
                            isDarkMode
                              ? "bg-purple-500/20 text-purple-300"
                              : "bg-purple-100 text-purple-700"
                          }`}
                        >
                          {user.role}
                        </p>
                      )}
                    </div>
                  </div>
                  {/* Projects Link */}
                  <Link
                    to="/projects"
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center w-full text-left px-4 py-3 ${isDarkMode ? "text-gray-300 hover:text-cyan-400 hover:bg-white/5" : "text-gray-700 hover:text-cyan-600 hover:bg-gray-50"} rounded-xl transition-all duration-300`}
                  >
                    <FolderOpen className="w-5 h-5 mr-3" />
                    View All Projects
                  </Link>
                  {/* Profile Link */}
                  <Link
                    to="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center w-full text-left px-4 py-3 ${isDarkMode ? "text-gray-300 hover:text-cyan-400 hover:bg-white/5" : "text-gray-700 hover:text-cyan-600 hover:bg-gray-50"} rounded-xl transition-all duration-300`}
                  >
                    <User className="w-5 h-5 mr-3" />
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleLogout();
                    }}
                    className="flex items-center w-full text-left px-4 py-3 text-red-500 hover:bg-red-500/10 rounded-xl transition-all duration-300"
                  >
                    <LogOut className="w-5 h-5 mr-3" />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/signin"
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center w-full text-left px-4 py-3 ${isDarkMode ? "text-gray-300 hover:text-cyan-400 hover:bg-white/5" : "text-gray-700 hover:text-cyan-600 hover:bg-gray-50"} rounded-xl transition-all duration-300`}
                  >
                    <LogIn className="w-5 h-5 mr-3" />
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center w-full text-left px-4 py-3 bg-cyan-500 text-white hover:bg-cyan-600 rounded-xl transition-all duration-300"
                  >
                    <UserPlus className="w-5 h-5 mr-3" />
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
            {/* Mobile Theme Toggle */}
            <div
              className={`pt-4 mt-2 border-t ${isDarkMode ? "border-white/10" : "border-gray-200"}`}
            >
              <button
                onClick={toggleTheme}
                className={`flex items-center w-full text-left px-4 py-3 ${isDarkMode ? "text-gray-300 hover:text-cyan-400 hover:bg-white/5" : "text-gray-700 hover:text-cyan-600 hover:bg-gray-50"} rounded-xl transition-all duration-300`}
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 mr-3" />
                ) : (
                  <Moon className="w-5 h-5 mr-3" />
                )}
                <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
