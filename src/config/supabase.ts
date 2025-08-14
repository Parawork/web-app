import { createClient } from '@supabase/supabase-js';
import type { Project } from "../types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('🔧 Supabase Configuration:', {
  url: supabaseUrl,
  hasKey: !!supabaseAnonKey,
  keyLength: supabaseAnonKey?.length
});

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Function to fetch all projects
export const fetchProjects = async (): Promise<Project[]> => {
  try {
    console.log('📡 Making Supabase query to projects table...');
    const { data, error } = await supabase
      .from("prj")
      .select("*")
      .order("created_at", { ascending: false });

    console.log('📊 Supabase response:', { data, error });

    if (error) {
      console.error('❌ Supabase error:', error);
      throw error;
    }

    console.log(`✅ Successfully fetched ${data?.length || 0} projects`);
    return data || [];
  } catch (error) {
    console.error('💥 Error in fetchProjects:', error);
    return [];
  }
};

// Function to fetch a specific project by ID
export const fetchProjectById = async (id: string): Promise<Project | null> => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching project:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in fetchProjectById:', error);
    return null;
  }
};

// Function to create a new project
export const createProject = async (project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<Project | null> => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .insert([project])
      .select()
      .single();

    if (error) {
      console.error('Error creating project:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in createProject:', error);
    return null;
  }
};

// Function to update a project
export const updateProject = async (id: string, updates: Partial<Project>): Promise<Project | null> => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating project:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in updateProject:', error);
    return null;
  }
};

// Function to delete a project
export const deleteProject = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting project:', error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteProject:', error);
    return false;
  }
};
