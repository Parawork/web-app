-- Create projects table in Supabase
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'Planning',
  rating DECIMAL(2,1) DEFAULT 0.0 CHECK (rating >= 0 AND rating <= 5),
  investment VARCHAR(100),
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  tech TEXT[] DEFAULT '{}',
  completion VARCHAR(100),
  image TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on status for faster queries
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);

-- Create an index on category for faster queries
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);

-- Insert sample data
INSERT INTO projects (title, description, category, status, rating, investment, progress, tech, completion, image) VALUES
('Smart Office Complex Colombo', 'A revolutionary 20-story smart building featuring AI-powered energy management, automated climate control, and integrated IoT sensors throughout.', 'Commercial', 'Completed', 4.8, '$12M', 100, '{"AI Systems", "IoT Sensors", "Smart HVAC", "Energy Management"}', 'December 2023', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop'),

('Eco-Residential Tower Kandy', 'Sustainable 15-floor residential complex with solar panels, rainwater harvesting, and smart home automation for 120 families.', 'Residential', 'In Progress', 4.6, '$8.5M', 75, '{"Solar Energy", "Water Recycling", "Smart Home", "Green Building"}', 'March 2024', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop'),

('Tech Hub Galle', 'Modern technology park with co-working spaces, innovation labs, and sustainable design elements for startups and tech companies.', 'Commercial', 'Planning', 4.9, '$15M', 25, '{"Smart Infrastructure", "Co-working Tech", "Innovation Labs", "Sustainable Design"}', 'August 2024', 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop'),

('Smart Hospital Complex', 'State-of-the-art medical facility with AI-assisted diagnostics, smart patient monitoring, and energy-efficient operations.', 'Healthcare', 'In Progress', 4.7, '$20M', 60, '{"Medical AI", "Patient Monitoring", "Smart Operations", "Energy Efficiency"}', 'June 2024', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop'),

('Green Shopping Mall', 'Eco-friendly retail complex with smart lighting, waste management systems, and renewable energy integration.', 'Retail', 'Completed', 4.5, '$10M', 100, '{"Smart Lighting", "Waste Management", "Renewable Energy", "Retail Tech"}', 'October 2023', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop'),

('Smart Education Campus', 'Intelligent university campus with digital classrooms, IoT-enabled facilities, and sustainable infrastructure.', 'Education', 'Planning', 4.8, '$18M', 15, '{"Digital Classrooms", "IoT Facilities", "Sustainable Infrastructure", "Education Tech"}', 'November 2024', 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop');

-- Enable Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access on projects" ON projects
FOR SELECT USING (true);

-- Create policy to allow authenticated users to insert
CREATE POLICY "Allow authenticated insert on projects" ON projects
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Create policy to allow authenticated users to update
CREATE POLICY "Allow authenticated update on projects" ON projects
FOR UPDATE USING (auth.role() = 'authenticated');

-- Create policy to allow authenticated users to delete
CREATE POLICY "Allow authenticated delete on projects" ON projects
FOR DELETE USING (auth.role() = 'authenticated');
