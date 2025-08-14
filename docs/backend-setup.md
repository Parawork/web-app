# Backend Setup Guide

## Quick Express.js Backend for Authentication

### 1. Create a new backend directory:
```bash
mkdir backend
cd backend
npm init -y
```

### 2. Install dependencies:
```bash
npm install express cors bcryptjs jsonwebtoken body-parser
npm install -D nodemon
```

### 3. Create server.js:
```javascript
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8090;

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173', // Allow Vite dev server
  credentials: true
}));

app.use(bodyParser.json());

// Mock user database (replace with real database)
const users = [
  {
    id: 1,
    username: 'john_doe',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password123
    email: 'john@example.com'
  }
];

// Sign in endpoint
app.post('/api/auth/signin', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    console.log('Signin request:', { username, password: '***' });
    
    // Find user
    const user = users.find(u => u.username === username);
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    
    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      'your-secret-key',
      { expiresIn: '24h' }
    );
    
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
    
  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', port: PORT });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  console.log(`CORS enabled for: http://localhost:5173`);
});
```

### 4. Update package.json scripts:
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

### 5. Run the server:
```bash
npm run dev
```

## Test Credentials:
- **Username**: `john_doe`
- **Password**: `password123`

## Alternative: Change Backend Port

If you have an existing backend on a different port, update the configuration in Signin.tsx:

```typescript
const API_BASE_URL = 'http://localhost:YOUR_PORT';
```

## CORS Configuration for Other Backends:

### Python/Flask:
```python
from flask_cors import CORS
CORS(app, origins=['http://localhost:5173'])
```

### Java/Spring Boot:
```java
@CrossOrigin(origins = "http://localhost:5173")
```

### .NET Core:
```csharp
services.AddCors(options => {
    options.AddPolicy("AllowVite", 
        builder => builder.WithOrigins("http://localhost:5173"));
});
```
