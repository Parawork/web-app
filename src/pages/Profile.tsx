import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  getUserData,
  clearAuthCookies,
  isAuthenticated,
} from "../utils/cookies";
import {
  Mail,
  Shield,
  LogOut,
  Edit,
  Settings,
  ArrowLeft,
  User,
  Building,
  Award,
  Star,
  TrendingUp,
  ChevronRight,
  Download,
  Bell,
  Zap,
  Cpu,
  Layers,
  ChevronLeft,
} from "lucide-react";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [servicesPage, setServicesPage] = useState(1);
  const [servicesPerPage, setServicesPerPage] = useState(5);

  // Sample projects data - in real app this would come from API
  const allProjects = [
    {
      name: "Luxury Villa - Beverly Hills",
      status: "Construction Phase",
      progress: 75,
      budget: "$850K",
      completion: "Mar 2025",
      statusColor: "blue",
    },
    {
      name: "Office Complex Downtown",
      status: "Design Review",
      progress: 45,
      budget: "$1.2M",
      completion: "Jun 2025",
      statusColor: "orange",
    },
    {
      name: "Smart Home Project",
      status: "Planning",
      progress: 20,
      budget: "$380K",
      completion: "Aug 2025",
      statusColor: "purple",
    },
    {
      name: "Corporate Headquarters",
      status: "Foundation",
      progress: 35,
      budget: "$2.1M",
      completion: "Oct 2025",
      statusColor: "blue",
    },
    {
      name: "Eco-Friendly Residence",
      status: "Design Phase",
      progress: 15,
      budget: "$650K",
      completion: "Dec 2025",
      statusColor: "green",
    },
    {
      name: "Tech Campus Extension",
      status: "Planning",
      progress: 10,
      budget: "$1.8M",
      completion: "Feb 2026",
      statusColor: "purple",
    },
  ];

  const allServices = [
    {
      label: "AI Project Analysis",
      icon: Cpu,
      color: "blue",
      description: "Smart analytics & predictions",
    },
    {
      label: "Virtual 3D Tours",
      icon: Layers,
      color: "green",
      description: "Immersive project previews",
    },
    {
      label: "Real-time Updates",
      icon: Zap,
      color: "purple",
      description: "Live progress tracking",
    },
    {
      label: "Expert Consultation",
      icon: User,
      color: "orange",
      description: "Direct architect access",
    },
    {
      label: "Smart Building Tech",
      icon: Building,
      color: "indigo",
      description: "IoT & automation solutions",
    },
    {
      label: "Sustainable Design",
      icon: Star,
      color: "green",
      description: "Eco-friendly architecture",
    },
    {
      label: "Project Management",
      icon: TrendingUp,
      color: "blue",
      description: "End-to-end coordination",
    },
    {
      label: "Quality Assurance",
      icon: Award,
      color: "purple",
      description: "Premium quality control",
    },
  ];

  // Pagination logic for projects
  const totalPages = Math.ceil(allProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProjects = allProjects.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Pagination logic for services
  const totalServicesPages = Math.ceil(allServices.length / servicesPerPage);
  const servicesStartIndex = (servicesPage - 1) * servicesPerPage;
  const currentServices = allServices.slice(
    servicesStartIndex,
    servicesStartIndex + servicesPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const handleServicesPageChange = (page: number) => {
    setServicesPage(page);
  };

  const handleServicesPerPageChange = (items: number) => {
    setServicesPerPage(items);
    setServicesPage(1);
  };

  // Pagination Component
  const PaginationControls = ({
    currentPage,
    totalPages,
    onPageChange,
    itemsPerPage,
    onItemsPerPageChange,
    itemOptions = [3, 5, 10],
  }: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    itemsPerPage: number;
    onItemsPerPageChange: (items: number) => void;
    itemOptions?: number[];
  }) => (
    <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/20">
      <div className="flex items-center space-x-2">
        <span className="text-sm text-white/70">Show:</span>
        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className="bg-white/10 backdrop-blur border border-white/20 rounded-lg px-3 py-1 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {itemOptions.map((option) => (
            <option
              key={option}
              value={option}
              className="bg-gray-800 text-white"
            >
              {option}
            </option>
          ))}
        </select>
        <span className="text-sm text-white/70">per page</span>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg bg-white/10 backdrop-blur border border-white/20 text-white/60 hover:text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center space-x-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 rounded-lg text-sm transition-all ${
                page === currentPage
                  ? "bg-blue-500 text-white"
                  : "bg-white/10 backdrop-blur border border-white/20 text-white/70 hover:text-white hover:bg-white/20"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg bg-white/10 backdrop-blur border border-white/20 text-white/60 hover:text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/signin");
    } else {
      const data = getUserData();
      setUser(data);
    }
  }, [navigate]);

  const handleLogout = () => {
    clearAuthCookies();
    navigate("/signin");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-50"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-indigo-500/20 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>

      {/* Glassmorphism Header */}
      <div className="relative z-10 backdrop-blur-xl bg-white/10 border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-all duration-300 group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Back to Dashboard</span>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-white/60 hover:text-white transition-colors relative">
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-sm font-semibold">
                    {user.username?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-white">
                    {user.username}
                  </p>
                  <p className="text-xs text-white/60">{user.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Futuristic Profile Card */}
          <div className="lg:col-span-1">
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl border border-white/20 overflow-hidden relative">
              {/* Gradient Border Animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-2xl opacity-20 animate-pulse"></div>

              {/* Profile Header */}
              <div className="relative px-6 py-8 text-center">
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl ring-4 ring-white/30 backdrop-blur">
                    <User className="w-12 h-12 text-white" />
                  </div>
                  <button className="absolute bottom-1 right-1 w-7 h-7 bg-white/20 backdrop-blur border border-white/30 rounded-full flex items-center justify-center shadow-lg hover:bg-white/30 transition-all duration-300 group">
                    <Edit className="w-3 h-3 text-white group-hover:scale-110 transition-transform" />
                  </button>
                </div>

                <h1 className="text-xl font-bold text-white mb-2">
                  {user.username}
                </h1>

                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Shield className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-medium text-blue-300 bg-blue-500/20 px-3 py-1 rounded-full backdrop-blur">
                    {user.role}
                  </span>
                </div>

                <div className="flex items-center justify-center text-white/70 text-sm bg-white/10 rounded-lg p-2 backdrop-blur">
                  <Mail className="w-4 h-4 mr-2" />
                  {user.email}
                </div>
              </div>

              {/* Client Status */}
              <div className="px-6 py-4 space-y-4 border-t border-white/20">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/70">Membership</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-300 font-medium">
                      Gold Elite
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/70">Client Since</span>
                  <span className="text-white">
                    {new Date().getFullYear() - 2}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/70">Projects</span>
                  <span className="text-green-400 font-medium">11 Total</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-6 py-4 border-t border-white/20 space-y-3">
                <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105">
                  <Settings className="w-4 h-4" />
                  <span>Manage Profile</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 bg-white/10 hover:bg-white/20 text-white/90 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 backdrop-blur border border-white/20"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content - Futuristic Dashboard */}
          <div className="lg:col-span-3">
            <div className="space-y-8">
              {/* Enhanced Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="group backdrop-blur-xl bg-white/10 p-6 rounded-2xl shadow-xl border border-white/20 hover:bg-white/20 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white/70">
                        Active Projects
                      </p>
                      <p className="text-3xl font-bold text-white mt-1">3</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Building className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="relative flex items-center mt-4 text-sm">
                    <span className="text-blue-300 font-medium">
                      In Progress
                    </span>
                    <span className="text-white/60 ml-2">
                      Multi-tier Projects
                    </span>
                  </div>
                </div>

                <div className="group backdrop-blur-xl bg-white/10 p-6 rounded-2xl shadow-xl border border-white/20 hover:bg-white/20 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white/70">
                        Portfolio Value
                      </p>
                      <p className="text-3xl font-bold text-white mt-1">
                        $2.4M
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="relative flex items-center mt-4 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-green-300 font-medium">+15.2%</span>
                    <span className="text-white/60 ml-2">growth</span>
                  </div>
                </div>

                <div className="group backdrop-blur-xl bg-white/10 p-6 rounded-2xl shadow-xl border border-white/20 hover:bg-white/20 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white/70">
                        Completed
                      </p>
                      <p className="text-3xl font-bold text-white mt-1">8</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="relative flex items-center mt-4 text-sm">
                    <span className="text-purple-300 font-medium">
                      100% Success
                    </span>
                  </div>
                </div>

                <div className="group backdrop-blur-xl bg-white/10 p-6 rounded-2xl shadow-xl border border-white/20 hover:bg-white/20 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white/70">
                        Satisfaction
                      </p>
                      <p className="text-3xl font-bold text-white mt-1">
                        4.9/5
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="relative flex items-center mt-4 text-sm">
                    <span className="text-orange-300 font-medium">
                      Elite Rating
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Current Projects Overview */}
                <div className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-xl border border-white/20 overflow-hidden">
                  <div className="px-6 py-4 border-b border-white/20 bg-gradient-to-r from-blue-500/20 to-purple-500/20">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-white">
                        Active Projects
                      </h3>
                      <Building className="w-5 h-5 text-white/60" />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {currentProjects.map((project, index) => (
                        <div
                          key={index}
                          className="backdrop-blur-sm bg-white/5 border border-white/20 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 group"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium text-white group-hover:text-blue-300 transition-colors">
                              {project.name}
                            </h4>
                            <span
                              className={`px-3 py-1 text-xs font-medium rounded-full backdrop-blur ${
                                project.statusColor === "blue"
                                  ? "bg-blue-500/30 text-blue-200 border border-blue-400/30"
                                  : project.statusColor === "orange"
                                    ? "bg-orange-500/30 text-orange-200 border border-orange-400/30"
                                    : project.statusColor === "purple"
                                      ? "bg-purple-500/30 text-purple-200 border border-purple-400/30"
                                      : "bg-green-500/30 text-green-200 border border-green-400/30"
                              }`}
                            >
                              {project.status}
                            </span>
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-sm text-white/70 mb-3">
                            <div>
                              <span className="font-medium text-white/90">
                                Budget:
                              </span>
                              <br />
                              <span className="text-green-300">
                                {project.budget}
                              </span>
                            </div>
                            <div>
                              <span className="font-medium text-white/90">
                                Progress:
                              </span>
                              <br />
                              <span className="text-blue-300">
                                {project.progress}%
                              </span>
                            </div>
                            <div>
                              <span className="font-medium text-white/90">
                                Due:
                              </span>
                              <br />
                              <span className="text-purple-300">
                                {project.completion}
                              </span>
                            </div>
                          </div>
                          <div className="w-full bg-white/20 rounded-full h-2 backdrop-blur">
                            <div
                              className={`h-2 rounded-full transition-all duration-1000 ${
                                project.statusColor === "blue"
                                  ? "bg-gradient-to-r from-blue-400 to-blue-600"
                                  : project.statusColor === "orange"
                                    ? "bg-gradient-to-r from-orange-400 to-orange-600"
                                    : project.statusColor === "purple"
                                      ? "bg-gradient-to-r from-purple-400 to-purple-600"
                                      : "bg-gradient-to-r from-green-400 to-green-600"
                              } shadow-lg`}
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Pagination for Projects */}
                    <PaginationControls
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                      itemsPerPage={itemsPerPage}
                      onItemsPerPageChange={handleItemsPerPageChange}
                      itemOptions={[2, 3, 5, 10]}
                    />
                  </div>
                </div>

                {/* Client Services & Support */}
                <div className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-xl border border-white/20 overflow-hidden">
                  <div className="px-6 py-4 border-b border-white/20 bg-gradient-to-r from-purple-500/20 to-blue-500/20">
                    <h3 className="text-lg font-semibold text-white">
                      Premium Services
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-3">
                      {currentServices.map((service, index) => (
                        <button
                          key={index}
                          className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-white/10 transition-all duration-300 group backdrop-blur-sm bg-white/5 border border-white/20"
                        >
                          <div className="flex items-center space-x-4">
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur shadow-lg ${
                                service.color === "blue"
                                  ? "bg-blue-500/30 border border-blue-400/30"
                                  : service.color === "green"
                                    ? "bg-green-500/30 border border-green-400/30"
                                    : service.color === "purple"
                                      ? "bg-purple-500/30 border border-purple-400/30"
                                      : service.color === "orange"
                                        ? "bg-orange-500/30 border border-orange-400/30"
                                        : "bg-indigo-500/30 border border-indigo-400/30"
                              }`}
                            >
                              <service.icon
                                className={`w-5 h-5 ${
                                  service.color === "blue"
                                    ? "text-blue-300"
                                    : service.color === "green"
                                      ? "text-green-300"
                                      : service.color === "purple"
                                        ? "text-purple-300"
                                        : service.color === "orange"
                                          ? "text-orange-300"
                                          : "text-indigo-300"
                                } group-hover:scale-110 transition-transform`}
                              />
                            </div>
                            <div className="text-left">
                              <p className="text-sm font-medium text-white group-hover:text-blue-300 transition-colors">
                                {service.label}
                              </p>
                              <p className="text-xs text-white/60">
                                {service.description}
                              </p>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" />
                        </button>
                      ))}
                    </div>

                    {/* Pagination for Services */}
                    <PaginationControls
                      currentPage={servicesPage}
                      totalPages={totalServicesPages}
                      onPageChange={handleServicesPageChange}
                      itemsPerPage={servicesPerPage}
                      onItemsPerPageChange={handleServicesPerPageChange}
                      itemOptions={[3, 5, 8]}
                    />
                  </div>
                </div>
              </div>

              {/* Simplified Client Profile Information */}
              <div className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-xl border border-white/20 overflow-hidden">
                <div className="px-6 py-4 border-b border-white/20 bg-gradient-to-r from-indigo-500/20 to-purple-500/20">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">
                      Account Overview
                    </h3>
                    <button className="flex items-center space-x-2 text-sm text-blue-300 hover:text-white transition-colors">
                      <Download className="w-4 h-4" />
                      <span>Export Data</span>
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/20">
                      <h4 className="text-sm font-medium text-white mb-2">
                        Membership Tier
                      </h4>
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <p className="text-sm text-yellow-300 font-medium">
                          Gold Elite Member
                        </p>
                      </div>
                    </div>
                    <div className="backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/20">
                      <h4 className="text-sm font-medium text-white mb-2">
                        Project Focus
                      </h4>
                      <p className="text-sm text-white/70">
                        Luxury Residential & Commercial
                      </p>
                    </div>
                    <div className="backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/20">
                      <h4 className="text-sm font-medium text-white mb-2">
                        Next Meeting
                      </h4>
                      <p className="text-sm text-blue-300">
                        Jan 15, 2025 - 2:00 PM
                      </p>
                    </div>
                  </div>

                  {/* Premium Benefits */}
                  <div className="mt-8 pt-6 border-t border-white/20">
                    <h4 className="text-sm font-medium text-white mb-4">
                      Elite Member Benefits
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        "Priority project scheduling",
                        "Dedicated project manager",
                        "24/7 premium support",
                        "Advanced AI consultations",
                        "VR/AR project previews",
                        "Smart building integration",
                      ].map((benefit, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3"
                        >
                          <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full shadow-lg"></div>
                          <span className="text-sm text-white/80">
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
