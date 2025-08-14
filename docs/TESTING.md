# Test Suite for CB Construction Web App

## Overview
This directory contains all test files for the CB Construction application.

## Test Files

### `supabase.test.ts`
- **Connection Test**: Verifies Supabase connection
- **Fetch Test**: Tests project data retrieval
- **Auto-run**: Runs automatically when imported

### `crud.test.ts`
- **CREATE**: Tests project creation
- **READ**: Tests project fetching
- **UPDATE**: Tests project updates
- **DELETE**: Tests project deletion

## Running Tests

### Method 1: Browser Console (Auto-run)
```typescript
// Import in your main.tsx or component
import '../tests/supabase.test';
```

### Method 2: Manual Testing
```typescript
// In browser console or component
import { runAllTests } from '../tests/supabase.test';
import testCRUDOperations from '../tests/crud.test';

// Run connection tests
await runAllTests();

// Run CRUD tests (be careful - this creates/deletes data)
await testCRUDOperations();
```

### Method 3: Node.js Testing
```bash
# Create a test runner script
npm run test
```

## Test Environment Setup

1. **Environment Variables**: Ensure `.env` has correct Supabase credentials
2. **Database**: Run the SQL script in `database/create_projects_table.sql`
3. **Permissions**: Verify RLS policies allow operations

## Expected Results

### Connection Test ✅
```
🧪 Testing Supabase connection...
✅ Connection test successful. Project count: [N]
```

### Fetch Test ✅
```
📋 Testing project fetch...
✅ Successfully fetched N projects: [data]
```

### CRUD Test ✅
```
🔧 Testing CRUD operations...
📖 Testing READ operation...
✅ READ: Found N projects
📝 Testing CREATE operation...
✅ CREATE: Project created successfully
✏️ Testing UPDATE operation...
✅ UPDATE: Project updated successfully
🗑️ Testing DELETE operation...
✅ DELETE: Project deleted successfully
```

## Troubleshooting

### Common Issues
1. **Missing Environment Variables**: Check `.env` file
2. **Database Not Created**: Run SQL script
3. **Permission Errors**: Check RLS policies
4. **Network Issues**: Verify Supabase URL

### Debug Steps
1. Check browser console for error messages
2. Verify Supabase dashboard shows correct data
3. Test connection in Supabase SQL editor
4. Check API key permissions
