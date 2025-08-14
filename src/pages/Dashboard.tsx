import { useState, useEffect } from "react";
// Removed incomplete import statement

import {
  FuturisticParticles,
  Project,
  Contact,
  ChatBot,
  Header,
  SlideShowBackground,
} from "../components";
import {
  TrendingUp,
  Eye,
  ArrowRight,
  CheckCircle,
  Phone,
  Mail,
  HardHat,
} from "lucide-react";
import {
  stats,
  services,
  projects,
  achievements,
  constructionStack,
  innovationList,
} from "../constants/index.tsx";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import {
  getUserData,
  clearAuthCookies,
  isAuthenticated,
} from "../utils/cookies";

const Dashboard = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme, getGlassCardClass } = useTheme();
  const [user, setUser] = useState<any | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeProject, setActiveProject] = useState(0);

  // Authentication check
  useEffect(() => {
    const userData = getUserData();
    const authenticated = isAuthenticated();

    if (authenticated && userData) {
      setUser(userData);
    } else {
      setUser(null);
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    clearAuthCookies();
    setUser(null);
    navigate("/signin");
  };

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to section function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.history.pushState(null, "", `#${sectionId}`);
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Auto-rotate featured projects
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveProject((prev) => (prev + 1) % projects.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Handle hash navigation
  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }, 100);
      }
    };

    handleHashNavigation();
    window.addEventListener("popstate", handleHashNavigation);
    return () => window.removeEventListener("popstate", handleHashNavigation);
  }, []);

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        isDarkMode
          ? "bg-transparent text-white"
          : "bg-gradient-to-br from-white via-gray-50 to-gray-100 text-gray-900"
      } overflow-x-hidden`}
    >
      {/* Professional Construction Slideshow Background */}
      <SlideShowBackground isDarkMode={isDarkMode} />

      {/* Futuristic Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <FuturisticParticles />
      </div>
      {/* Header */}
      <Header
        isDarkMode={isDarkMode}
        scrollY={scrollY}
        toggleTheme={toggleTheme}
        scrollToSection={scrollToSection}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        user={user}
        handleLogout={handleLogout}
      />
      {/* Enhanced Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center pt-24"
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Main Heading */}
          <div className="mb-12">
            <h1 className="text-6xl lg:text-8xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                Building
              </span>
              <br />
              <span className={isDarkMode ? "text-white" : "text-gray-800"}>
                Tomorrow's
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Sri Lanka
              </span>
            </h1>
            <p
              className={`text-xl lg:text-2xl max-w-4xl mx-auto mb-12 leading-relaxed ${
                isDarkMode ? "text-gray-300" : "text-gray-800"
              }`}
            >
              Pioneering the future of construction with modern building
              techniques, sustainable materials, and innovative design solutions
              that enhance the way we live, work, and connect.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button
              onClick={() => scrollToSection("projects")}
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full font-semibold text-white shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
            >
              <span className="relative z-10 flex items-center">
                Explore Our Projects
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className={`group relative px-8 py-4 ${getGlassCardClass()} rounded-full font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 ${
                isDarkMode
                  ? "text-white hover:bg-white/20"
                  : "text-gray-800 hover:bg-gray-50 hover:shadow-xl"
              }`}
            >
              <span className="relative z-10 flex items-center">
                Our Services
                <Eye className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
              </span>
            </button>
          </div>

          {/* Enhanced Technology Stack Preview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {constructionStack.map((tech, index) => (
              <div
                key={index}
                className={`group p-6 ${getGlassCardClass()} rounded-2xl transition-all duration-300 hover:scale-105 ${
                  isDarkMode
                    ? "hover:bg-white/10"
                    : "hover:bg-gray-50 hover:shadow-xl"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-cyan-400 mb-3 flex justify-center group-hover:scale-110 transition-transform">
                  {tech.icon}
                </div>
                <h3
                  className={`text-sm font-semibold mb-2 ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  {tech.name}
                </h3>
                <p
                  className={`text-xs ${
                    isDarkMode ? "text-gray-400" : "text-gray-800"
                  }`}
                >
                  {tech.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Enhanced Stats Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div
                  className={`relative p-8 ${getGlassCardClass()} rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                    isDarkMode
                      ? "hover:shadow-cyan-500/20"
                      : "hover:shadow-cyan-500/10"
                  }`}
                >
                  <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <div className="p-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full border border-cyan-400/30">
                      <div className="text-cyan-400">{stat.icon()}</div>
                    </div>
                  </div>
                  <div className="text-4xl lg:text-5xl font-bold mb-2">
                    <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                      {stat.number}
                    </span>
                    <span className="text-cyan-400">{stat.suffix}</span>
                  </div>
                  <div
                    className={`font-medium mb-2 ${
                        isDarkMode ? "text-gray-300" : "text-gray-800"
                      }`}
                  >
                    {stat.label}
                  </div>
                  {stat.change && (
                    <div className="flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-emerald-400 mr-1" />
                      <span className="text-sm text-emerald-400 font-semibold">
                        {stat.change}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Achievements Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Awards & Recognition
              </span>
            </h2>
            <p
              className={`text-lg max-w-2xl mx-auto ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Celebrating excellence and innovation in construction technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`group relative p-6 ${getGlassCardClass()} rounded-2xl transition-all duration-300 hover:scale-105`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {achievement.icon()}
                </div>
                <h3
                  className={`text-lg font-bold mb-2 text-center ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  {achievement.title}
                </h3>
                <p
                  className={`text-sm text-center ${
                    isDarkMode ? "text-gray-400" : "text-gray-800"
                  }`}
                >
                  {achievement.organization}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Enhanced Services Section */}
      <section id="services" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Future Services
              </span>
            </h2>
            <p
              className={`text-xl max-w-3xl mx-auto ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Revolutionary construction solutions powered by cutting-edge
              technology and sustainable innovation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`group relative p-8 ${getGlassCardClass()} rounded-3xl transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                  isDarkMode
                    ? "hover:shadow-cyan-500/20"
                    : "hover:shadow-cyan-500/10"
                }`}
              >
                <div className="relative">
                  <div className="flex justify-between items-start mb-6">
                    <div className="group-hover:scale-110 transition-transform duration-300">
                      {service.icon()}
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-lg font-bold ${
                          service.color === "cyan"
                            ? "text-cyan-400"
                            : service.color === "purple"
                              ? "text-purple-400"
                              : service.color === "emerald"
                                ? "text-emerald-400"
                                : "text-orange-400"
                        }`}
                      >
                        {service.metric}
                      </div>
                      <div className="flex items-center text-emerald-400 text-sm">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        {service.growth}
                      </div>
                    </div>
                  </div>
                  <h3
                    className={`text-2xl font-bold mb-4 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {service.title}
                  </h3>
                  <p
                    className={`leading-relaxed mb-6 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                          isDarkMode ? "bg-white/10" : "bg-gray-100"
                        } ${
                          service.color === "cyan"
                            ? "text-cyan-400 border-cyan-400/20 hover:bg-cyan-400/10"
                            : service.color === "purple"
                              ? "text-purple-400 border-purple-400/20 hover:bg-purple-400/10"
                              : service.color === "emerald"
                                ? "text-emerald-400 border-emerald-400/20 hover:bg-emerald-400/10"
                                : "text-orange-400 border-orange-400/20 hover:bg-orange-400/10"
                        }`}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <button
                    className={`flex items-center font-semibold group/btn transition-colors ${
                      service.color === "cyan"
                        ? "text-cyan-400 hover:text-cyan-300"
                        : service.color === "purple"
                          ? "text-purple-400 hover:text-purple-300"
                          : service.color === "emerald"
                            ? "text-emerald-400 hover:text-emerald-300"
                            : "text-orange-400 hover:text-orange-300"
                    }`}
                  >
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Projects Section */}
      <Project
        activeProject={activeProject}
        setActiveProject={setActiveProject}
        isDarkMode={isDarkMode}
        getGlassCardClass={getGlassCardClass}
        defaultItemsPerPage={3}
      />
      <div className="flex items-center justify-center ">
        {" "}
        <Link
          to="/#projects"
          className={`inline-flex items-center px-8 py-4 ${getGlassCardClass()} border border-cyan-400/30 rounded-full hover:border-cyan-400/60 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 group ${
            isDarkMode
              ? "text-cyan-400 hover:text-cyan-300"
              : "text-cyan-600 hover:text-cyan-500"
          }`}
        >
          <span className="font-semibold mr-2">View All Projects</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
      {/* Technology Section */}
      <section id="technology" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-bold mb-8">
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Innovation Since 1999
                </span>
              </h2>
              <p
                className={`text-lg mb-8 leading-relaxed ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                At CB Construction, we're not just building structures—we're
                shaping the future. Our use of sustainable materials, innovative
                designs, and expert engineering creates buildings that stand the
                test of time and enhance the way people live and work.
              </p>
              <div className="space-y-6">
                {innovationList.map((item, index) => (
                  <div key={index} className="flex items-center group">
                    <div
                      className={`p-3 rounded-full border mr-4 group-hover:scale-110 transition-all ${
                        item.color === "emerald"
                          ? "bg-emerald-500/20 border-emerald-400/30"
                          : item.color === "cyan"
                            ? "bg-cyan-500/20 border-cyan-400/30"
                            : "bg-purple-500/20 border-purple-400/30"
                      }`}
                    >
                      <CheckCircle
                        className={`w-6 h-6 ${
                          item.color === "emerald"
                            ? "text-emerald-400"
                            : item.color === "cyan"
                              ? "text-cyan-400"
                              : "text-purple-400"
                        }`}
                      />
                    </div>
                    <div>
                      <span
                        className={`font-semibold ${
                          isDarkMode ? "text-white" : "text-gray-800"
                        }`}
                      >
                        {item.title}
                      </span>
                      <p
                        className={`text-sm ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div
                className={`relative p-8 rounded-3xl border ${
                  isDarkMode
                    ? "bg-white/5 border-white/10"
                    : "bg-white/80 border-black/10"
                }`}
              >
                <img
                  src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=400&fit=crop"
                  alt="Future construction technology"
                  className="rounded-2xl w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-3xl blur-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <Contact isDarkMode={isDarkMode} />
      {/* AI ChatBot */}
      <ChatBot isDarkMode={isDarkMode} />
      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-row space-x-4">
        <a
          href="tel:+778811562"
          className="group block p-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:-translate-y-1 hover:scale-110"
          aria-label="Call +778811562"
        >
          <Phone className="w-6 h-6 text-white group-hover:animate-pulse" />
        </a>
        <a
          href="mailto:parakramawork@gmail.com"
          className="group block p-4 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:-translate-y-1 hover:scale-110"
          aria-label="Email parakramawork@gmail.com"
        >
          <Mail className="w-6 h-6 text-white group-hover:animate-bounce" />
        </a>
      </div>
      {/* Enhanced Footer */}
      <footer
        className={`py-16 relative border-t ${
          isDarkMode ? "border-white/10" : "border-gray-200/40"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-6">
                <div className="relative">
                  <HardHat className="w-10 h-10 text-cyan-400 mr-3" />
                  <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-xl"></div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    CB Construction
                  </h3>
                  <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
                    Future Building Solutions
                  </p>
                </div>
              </div>
              <p
                className={`mb-6 max-w-md ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Pioneering the future of construction with modern building
                techniques, sustainable materials, and innovative design
                solutions that enhance the way we live, work, and connect.
              </p>
            </div>

            <div>
              <h4
                className={`text-lg font-semibold mb-6 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Future Services
              </h4>
              <ul
                className={`space-y-3 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {[
                  "Commercial Buildings",
                  "Residential Projects",
                  "Sustainable Construction",
                  "Infrastructure Development",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="hover:text-cyan-400 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4
                className={`text-lg font-semibold mb-6 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Expertise & Excellence
              </h4>
              <ul
                className={`space-y-3 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {[
                  "Engineering",
                  "Quality Control",
                  "Project Management",
                  "Skilled Workforce",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="hover:text-cyan-400 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className={`border-t mt-12 pt-8 text-center ${
              isDarkMode ? "border-white/10" : "border-gray-200"
            }`}
          >
            <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
              &copy; 2025 CB Construction Sri Lanka. Building Tomorrow, Today.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
