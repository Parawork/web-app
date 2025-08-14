import { useState, useEffect } from 'react';
import { fetchProjects } from "../config/supabase";
import type { Project } from "../types";



export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔍 Starting to fetch projects from Supabase...');
      const data = await fetchProjects();
      console.log('✅ Projects fetched successfully:', data);
      setProjects(data);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load projects';
      setError(errorMessage);
      console.error('❌ Error loading projects, using fallback data:', err);
      
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  return {
    projects,
    loading,
    error,
    refetch: loadProjects
  };
};
