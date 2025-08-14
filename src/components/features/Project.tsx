import React, { useState, useCallback, useMemo } from "react";
import {
  Star,
  ArrowRight,
  Loader2,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { useProjects } from "../../hooks/useProjects";

/**
 * Professional Project Portfolio Component
 * 
 * A sophisticated project showcase component featuring:
 * - Advanced pagination with customizable options
 * - Professional card layouts with hover animations
 * - Comprehensive project metadata display
 * - Responsive design with accessibility features
 * - Error boundaries and loading states
 * - Performance optimizations
 *
 * @version 2.0.0
 * @author Professional Development Team
 */

interface ProjectComponentProps {
  /** Index of currently active/highlighted project */
  activeProject: number;
  /** Function to set active project index */
  setActiveProject: (index: number) => void;
  /** Whether dark mode is enabled */
  isDarkMode: boolean;
  /** Function returning glassmorphism CSS classes */
  getGlassCardClass: () => string;
  /** Array of options for items per page selector */
  itemsPerPageOptions?: number[];
  /** Default number of items per page */
  defaultItemsPerPage?: number;
  /** Whether to show page info like "Page 1 of 3 (15 total projects)" */
  showPaginationInfo?: boolean;
  /** Whether to show items per page dropdown */
  enableItemsPerPageSelector?: boolean;
  /** Maximum number of page buttons to show */
  maxPaginationButtons?: number;
  /** Callback function called when page or items per page changes */
  onPageChange?: (page: number, itemsPerPage: number) => void;
  /** External control of items per page (overrides internal state) */
  customItemsPerPage?: number;
  /** Custom CSS classes for additional styling */
  className?: string;
}

const Project: React.FC<ProjectComponentProps> = ({
  activeProject,
  setActiveProject,
  isDarkMode,
  getGlassCardClass,
  itemsPerPageOptions = [3, 6, 9, 12],
  defaultItemsPerPage = 6,
  showPaginationInfo = true,
  enableItemsPerPageSelector = true,
  maxPaginationButtons = 5,
  onPageChange,
  customItemsPerPage,
  className = "",
}) => {
  const { projects, loading, error, refetch } = useProjects();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(
    customItemsPerPage || defaultItemsPerPage
  );

  // Memoized calculations for better performance
  const paginationData = useMemo(() => {
    const totalPages = Math.ceil(projects.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProjects = projects.slice(startIndex, startIndex + itemsPerPage);
    
    return {
      totalPages,
      startIndex,
      currentProjects,
      hasProjects: projects.length > 0,
      showPagination: projects.length > itemsPerPage,
    };
  }, [projects, currentPage, itemsPerPage]);

  // Update items per page if customItemsPerPage changes
  React.useEffect(() => {
    if (customItemsPerPage && customItemsPerPage !== itemsPerPage) {
      setItemsPerPage(customItemsPerPage);
      setCurrentPage(1);
    }
  }, [customItemsPerPage, itemsPerPage]);

  // Optimized handlers with useCallback
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    setActiveProject(0);
    onPageChange?.(page, itemsPerPage);
  }, [itemsPerPage, onPageChange, setActiveProject]);

  const handleItemsPerPageChange = useCallback((items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
    setActiveProject(0);
    onPageChange?.(1, items);
  }, [onPageChange, setActiveProject]);

  // Enhanced Pagination Component with better accessibility
  const PaginationControls = () => (
    <div className="flex flex-col sm:flex-row items-center justify-between mt-12 pt-8 border-t border-cyan-400/20">
      {/* Items per page selector */}
      {enableItemsPerPageSelector && (
        <div className="flex items-center space-x-3 mb-4 sm:mb-0">
          <label
            htmlFor="items-per-page"
            className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
          >
            Show:
          </label>
          <select
            id="items-per-page"
            value={itemsPerPage}
            onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
            className={`${getGlassCardClass()} border border-cyan-400/30 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
            aria-label="Items per page"
          >
            {itemsPerPageOptions.map((option) => (
              <option
                key={option}
                value={option}
                className={isDarkMode ? "bg-gray-800" : "bg-white"}
              >
                {option}
              </option>
            ))}
          </select>
          <span
            className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
          >
            projects per page
          </span>
        </div>
      )}

      {/* Pagination info and controls */}
      <div className="flex items-center space-x-2">
        {showPaginationInfo && (
          <span
            className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"} mr-4`}
            role="status"
            aria-live="polite"
          >
            Page {currentPage} of {paginationData.totalPages} ({projects.length} total
            projects)
          </span>
        )}

        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-2 rounded-lg ${getGlassCardClass()} border border-cyan-400/30 transition-all duration-300 ${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:border-cyan-400/60 hover:shadow-lg hover:shadow-cyan-500/20"
          }`}
          aria-label="Previous page"
        >
          <ChevronLeft
            className={`w-4 h-4 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
          />
        </button>

        <nav role="navigation" aria-label="Pagination Navigation">
          <div className="flex items-center space-x-1">
            {Array.from(
              { length: Math.min(paginationData.totalPages, maxPaginationButtons) },
              (_, i) => {
                let pageNum;
                if (paginationData.totalPages <= maxPaginationButtons) {
                  pageNum = i + 1;
                } else if (
                  currentPage <=
                  Math.floor(maxPaginationButtons / 2) + 1
                ) {
                  pageNum = i + 1;
                } else if (
                  currentPage >=
                  paginationData.totalPages - Math.floor(maxPaginationButtons / 2)
                ) {
                  pageNum = paginationData.totalPages - maxPaginationButtons + 1 + i;
                } else {
                  pageNum =
                    currentPage - Math.floor(maxPaginationButtons / 2) + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 py-1 rounded-lg text-sm transition-all duration-300 ${
                      pageNum === currentPage
                        ? "bg-gradient-to-r from-cyan-500 to-emerald-500 text-white shadow-lg"
                        : `${getGlassCardClass()} border border-cyan-400/30 hover:border-cyan-400/60 hover:shadow-lg hover:shadow-cyan-500/20 ${
                            isDarkMode ? "text-gray-300" : "text-gray-600"
                          }`
                    }`}
                    aria-label={`Go to page ${pageNum}`}
                    aria-current={pageNum === currentPage ? "page" : undefined}
                  >
                    {pageNum}
                  </button>
                );
              }
            )}
          </div>
        </nav>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === paginationData.totalPages}
          className={`p-2 rounded-lg ${getGlassCardClass()} border border-cyan-400/30 transition-all duration-300 ${
            currentPage === paginationData.totalPages
              ? "opacity-50 cursor-not-allowed"
              : "hover:border-cyan-400/60 hover:shadow-lg hover:shadow-cyan-500/20"
          }`}
          aria-label="Next page"
        >
          <ChevronRight
            className={`w-4 h-4 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
          />
        </button>
      </div>
    </div>
  );

  // Professional Loading State Component
  const LoadingState = () => (
    <section className={`py-24 relative ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p
            className={`text-xl ${isDarkMode ? "text-gray-300" : "text-gray-600"} max-w-3xl mx-auto mb-8`}
          >
            Showcasing our commitment to innovation and excellence in every
            smart building we create
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className={`${getGlassCardClass()} rounded-3xl overflow-hidden animate-pulse`}
            >
              <div className="h-48 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20"></div>
              <div className="p-8">
                <div className="h-4 bg-cyan-400/30 rounded mb-3"></div>
                <div className="h-6 bg-gray-400/30 rounded mb-3"></div>
                <div className="h-4 bg-gray-300/30 rounded mb-4"></div>
                <div className="h-2 bg-gradient-to-r from-cyan-400/30 to-emerald-400/30 rounded mb-4"></div>
                <div className="flex gap-2 mb-4">
                  <div className="h-6 w-16 bg-emerald-400/30 rounded"></div>
                  <div className="h-6 w-20 bg-emerald-400/30 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center items-center mt-12 pt-8">
          <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
          <span
            className={`ml-3 text-lg font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
          >
            Loading amazing projects...
          </span>
        </div>
      </div>
    </section>
  );

  // Professional Error State Component
  const ErrorState = () => (
    <section className={`py-24 relative ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p
            className={`text-xl ${isDarkMode ? "text-gray-300" : "text-gray-600"} max-w-3xl mx-auto mb-8`}
          >
            Showcasing our commitment to innovation and excellence in every
            smart building we create
          </p>
        </div>
        
        <div className={`text-center py-20 ${getGlassCardClass()} rounded-3xl border border-red-400/30`}>
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-red-500/10 rounded-full">
              <AlertCircle className="w-12 h-12 text-red-400" />
            </div>
          </div>
          
          <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
            Unable to Load Projects
          </h3>
          
          <div className={`text-lg ${isDarkMode ? "text-red-400" : "text-red-600"} mb-4`}>
            {error}
          </div>
          
          <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"} mb-6 max-w-md mx-auto`}>
            We're experiencing difficulties connecting to our project database. 
            Please check your internet connection and try again.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={refetch}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              aria-label="Retry loading projects"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Retry Loading
            </button>
            
            <button
              onClick={() => window.location.reload()}
              className={`inline-flex items-center px-6 py-3 ${getGlassCardClass()} border border-cyan-400/30 hover:border-cyan-400/60 text-cyan-400 font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20`}
            >
              Refresh Page
            </button>
          </div>
        </div>
      </div>
    </section>
  );

  // Render appropriate state
  if (loading) return <LoadingState />;
  if (error) return <ErrorState />;

  // Main component render
  return (
    <section id="projects" className={`py-24 relative ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p
            className={`text-xl ${isDarkMode ? "text-gray-300" : "text-gray-600"} max-w-3xl mx-auto mb-8`}
          >
            Showcasing our commitment to innovation and excellence in every
            smart building we create
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" role="grid">
          {paginationData.currentProjects.map((project: any, index: number) => (
            <article
              key={paginationData.startIndex + index}
              className={`group relative ${getGlassCardClass()} rounded-3xl overflow-hidden card-hover hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 ${
                paginationData.startIndex + index === activeProject
                  ? "ring-2 ring-cyan-400/50 shadow-xl shadow-cyan-500/30 animate-glow"
                  : ""
              }`}
              onMouseEnter={() => setActiveProject(paginationData.startIndex + index)}
              role="gridcell"
              tabIndex={0}
              aria-label={`Project: ${project.title}`}
            >
              {/* Project Image and Badges */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={`${project.title} project showcase`}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                
                {/* Status and Rating Badges */}
                <div className="absolute top-4 left-4 flex space-x-2">
                  <div className="px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-sm">
                    <span
                      className={`${
                        project.status === "Completed" 
                          ? "text-emerald-400" 
                          : project.status === "In Progress" 
                          ? "text-cyan-400" 
                          : "text-purple-400"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <div className="px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-sm text-yellow-400 flex items-center">
                    <Star className="w-3 h-3 mr-1 fill-current" aria-hidden="true" />
                    <span aria-label={`Rating: ${project.rating} stars`}>{project.rating}</span>
                  </div>
                </div>
                
                {/* Investment Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-sm text-emerald-400 font-semibold">
                  {project.investment}
                </div>
              </div>

              {/* Project Content */}
              <div className="p-8">
                <div className="text-sm text-cyan-400 font-semibold mb-2 uppercase tracking-wide">
                  {project.category}
                </div>
                
                <h3
                  className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"} mb-3 line-clamp-2`}
                >
                  {project.title}
                </h3>
                
                <p
                  className={`${isDarkMode ? "text-gray-300" : "text-gray-600"} mb-4 text-sm leading-relaxed line-clamp-3`}
                >
                  {project.description}
                </p>

                {/* Enhanced Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span
                      className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                    >
                      Progress
                    </span>
                    <span className="text-sm font-bold text-cyan-400">
                      {project.progress}%
                    </span>
                  </div>
                  <div
                    className={`w-full ${isDarkMode ? "bg-gray-700" : "bg-gradient-to-r from-orange-100 to-amber-100"} rounded-full h-2.5 overflow-hidden`}
                  >
                    <div
                      className="bg-gradient-to-r from-cyan-400 to-emerald-400 h-full rounded-full progress-bar transition-all duration-1000 ease-out"
                      style={{ width: `${project.progress}%` }}
                      role="progressbar"
                      aria-valuenow={project.progress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`Project progress: ${project.progress}%`}
                    ></div>
                  </div>
                </div>

                {/* Technology Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech: string, idx: number) => (
                    <span
                      key={idx}
                      className={`px-2 py-1 ${
                        isDarkMode 
                          ? "bg-white/10 hover:bg-white/15" 
                          : "bg-gradient-to-r from-orange-50 to-amber-50 shadow-sm hover:shadow-md"
                      } rounded-lg text-xs text-emerald-400 border border-emerald-400/20 hover:border-emerald-400/40 transition-all duration-300 cursor-default`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project Footer */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-200/10">
                  <div className="flex flex-col">
                    <span
                      className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"} font-medium`}
                    >
                      Completion
                    </span>
                    <span className="text-sm font-semibold text-cyan-400">
                      {project.completion}
                    </span>
                  </div>
                  
                  <button 
                    className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center text-sm group/btn transition-all duration-300 hover:scale-105"
                    aria-label={`View details for ${project.title}`}
                  >
                    View Details
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Enhanced Pagination */}
        {paginationData.showPagination && <PaginationControls />}

        {/* Empty State */}
        {!paginationData.hasProjects && (
          <div className="text-center py-20">
            <div className="mb-6">
              <TrendingUp className={`w-16 h-16 mx-auto ${isDarkMode ? "text-gray-600" : "text-gray-400"}`} />
            </div>
            <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
              No Projects Available
            </h3>
            <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"} max-w-md mx-auto`}>
              We're currently working on exciting new projects. Check back soon to see our latest innovations!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Project;
