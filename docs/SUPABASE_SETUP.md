# Supabase Setup Instructions

## Prerequisites
1. Supabase account
2. Project created in Supabase

## Database Setup

### 1. Create the Projects Table
Execute the SQL script in your Supabase SQL editor:

```sql
-- Run the contents of database/create_projects_table.sql
```

This will:
- Create the `projects` table with all necessary columns
- Insert sample project data
- Set up Row Level Security (RLS) policies
- Create performance indexes

### 2. Configure Environment Variables
Your `.env` file should contain:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Database Schema

The `projects` table structure:

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key (auto-generated) |
| title | VARCHAR(255) | Project title |
| description | TEXT | Project description |
| category | VARCHAR(100) | Project category (Commercial, Residential, etc.) |
| status | VARCHAR(50) | Project status (Planning, In Progress, Completed) |
| rating | DECIMAL(2,1) | Project rating (0.0-5.0) |
| investment | VARCHAR(100) | Investment amount |
| progress | INTEGER | Progress percentage (0-100) |
| tech | TEXT[] | Array of technologies used |
| completion | VARCHAR(100) | Expected completion date |
| image | TEXT | Project image URL |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

### 4. Security Policies

- **Public Read**: Anyone can view projects
- **Authenticated Write**: Only authenticated users can create/update/delete projects

### 5. API Usage

The project automatically fetches data from Supabase using:

```typescript
import { useProjects } from '../hooks/useProjects';

const { projects, loading, error } = useProjects();
```

### 6. Testing the Connection

1. Start your development server: `npm run dev`
2. Navigate to the projects section
3. You should see the sample projects loaded from Supabase

### 7. Adding New Projects

You can add new projects through:
1. Supabase dashboard (SQL editor or table editor)
2. API calls using the provided helper functions in `src/config/supabase.ts`

### 8. Troubleshooting

- **Connection Issues**: Check your Supabase URL and API key
- **Permission Errors**: Verify RLS policies are correctly set
- **Data Not Loading**: Check browser console for error messages
