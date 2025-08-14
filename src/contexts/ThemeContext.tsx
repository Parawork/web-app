import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
  isManualOverride: boolean;
  toggleTheme: () => void;
  getGlassCardClass: () => string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Set default mode based on device preference
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return true; // fallback to dark mode
  });
  const [isManualOverride, setIsManualOverride] = useState(false);

  // Listen for system theme changes (only if not manually overridden)
  useEffect(() => {
    if (isManualOverride) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, [isManualOverride]);

  // Manual theme toggle function
  const toggleTheme = () => {
    setIsManualOverride(true);
    setIsDarkMode(!isDarkMode);
  };

  // Utility function for glass card styling
  const getGlassCardClass = () => {
    return isDarkMode
      ? "bg-white/5 backdrop-blur-sm border border-white/10"
      : "bg-white backdrop-blur-sm border border-gray-200 shadow-lg";
  };

  const value = {
    isDarkMode,
    isManualOverride,
    toggleTheme,
    getGlassCardClass,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
