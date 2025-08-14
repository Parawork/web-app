# Authentication API Documentation

This document describes the expected backend API endpoints that the signin component integrates with.

## Base URL
```
/api/auth
```

## Endpoints

### 1. Sign In
**POST** `/api/auth/signin`

Authenticates a user with username/email and password.

**Request Body:**
```json
{
  "username": "string", // Username or email
  "password": "string"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "token": "string", // JWT token
    "user": {
      "id": "string",
      "username": "string",
      "email": "string",
      "role": "string", // e.g., "Client", "Admin", "User"
      "createdAt": "string", // ISO date
      "lastLogin": "string", // ISO date (optional)
      "profile": {
        "firstName": "string",
        "lastName": "string",
        "avatar": "string" // URL (optional)
      }
    },
    "expiresIn": "string", // e.g., "24h", "7d"
    "refreshToken": "string" // Optional
  },
  "message": "Login successful"
}
```

**Response (Error - 401):**
```json
{
  "success": false,
  "error": "Invalid credentials",
  "message": "Username or password is incorrect"
}
```

**Response (Error - 429):**
```json
{
  "success": false,
  "error": "Too many requests",
  "message": "Too many login attempts. Please try again in 15 minutes."
}
```

### 2. Google OAuth
**GET** `/api/auth/google`

Initiates Google OAuth flow.

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "redirectUrl": "string", // Google OAuth URL
    "state": "string", // CSRF protection token
    "codeChallenge": "string" // PKCE challenge (optional)
  }
}
```

### 3. Facebook OAuth
**GET** `/api/auth/facebook`

Initiates Facebook OAuth flow.

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "redirectUrl": "string", // Facebook OAuth URL
    "state": "string" // CSRF protection token
  }
}
```

### 4. OAuth Callback
**POST** `/api/auth/oauth/{provider}/callback`

Handles OAuth callback from Google/Facebook.

**Parameters:**
- `provider`: "google" or "facebook"

**Request Body:**
```json
{
  "code": "string", // OAuth authorization code
  "state": "string" // CSRF protection token
}
```

**Response:** Same as signin response

### 5. Forgot Password
**POST** `/api/auth/forgot-password`

Sends password reset email.

**Request Body:**
```json
{
  "username": "string" // Username or email
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Password reset instructions have been sent to your email"
}
```

**Response (Error - 404):**
```json
{
  "success": false,
  "error": "User not found",
  "message": "No account found with that username or email"
}
```

### 6. Reset Password
**POST** `/api/auth/reset-password`

Resets password using token from email.

**Request Body:**
```json
{
  "token": "string", // Reset token from email
  "password": "string" // New password
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Password has been reset successfully"
}
```

### 7. Verify Token
**GET** `/api/auth/verify`

Verifies if a JWT token is valid.

**Headers:**
```
Authorization: Bearer {token}
```

**Response (Success - 200):**
```json
{
  "valid": true,
  "user": {
    "id": "string",
    "username": "string",
    "email": "string",
    "role": "string"
  },
  "expiresIn": "string"
}
```

**Response (Error - 401):**
```json
{
  "valid": false,
  "error": "Invalid or expired token"
}
```

### 8. Refresh Token
**POST** `/api/auth/refresh`

Refreshes an expired JWT token.

**Request Body:**
```json
{
  "refreshToken": "string"
}
```

**Response:** Same as signin response

### 9. Sign Out
**POST** `/api/auth/signout`

Invalidates user session and tokens.

**Headers:**
```
Authorization: Bearer {token}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Signed out successfully"
}
```

### 10. Get Profile
**GET** `/api/auth/profile`

Gets current user profile information.

**Headers:**
```
Authorization: Bearer {token}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "username": "string",
    "email": "string",
    "role": "string",
    "profile": {
      "firstName": "string",
      "lastName": "string",
      "avatar": "string",
      "bio": "string",
      "location": "string",
      "website": "string"
    },
    "createdAt": "string",
    "lastLogin": "string",
    "emailVerified": false,
    "twoFactorEnabled": false
  }
}
```

## Error Responses

All endpoints may return these common error responses:

**400 Bad Request:**
```json
{
  "success": false,
  "error": "Invalid request data",
  "message": "Request validation failed",
  "details": {
    "field": "error description"
  }
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "error": "Internal server error",
  "message": "An unexpected error occurred"
}
```

**503 Service Unavailable:**
```json
{
  "success": false,
  "error": "Service temporarily unavailable",
  "message": "The service is temporarily down for maintenance"
}
```

## Security Considerations

1. **Rate Limiting:** Implement rate limiting on signin attempts
2. **CSRF Protection:** Use state parameter for OAuth flows
3. **Token Security:** Use short-lived JWTs with refresh tokens
4. **Password Policy:** Enforce strong password requirements
5. **Account Lockout:** Lock accounts after failed attempts
6. **Audit Logging:** Log all authentication events

## Frontend Integration

The React component automatically handles:
- Token storage in secure cookies
- Error message display
- Loading states
- Form validation
- OAuth redirects
- Password reset flows

## Testing

You can test the authentication flow with:

```bash
# Test signin
curl -X POST /api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "password123"}'

# Test token verification
curl -X GET /api/auth/verify \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```
