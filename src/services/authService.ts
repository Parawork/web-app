/**
 * Authentication Service
 * 
 * Handles all authentication-related API calls and token management
 * for the application. This service provides a clean interface for
 * authentication operations including signin, OAuth, and password reset.
 * 
 * @version 1.0.0
 */

// API Response Types
export interface AuthResponse {
  success: boolean;
  data?: {
    token: string;
    user: {
      id: string;
      username: string;
      email: string;
      role: string;
      createdAt: string;
      lastLogin?: string;
      profile?: {
        firstName?: string;
        lastName?: string;
        avatar?: string;
        bio?: string;
        location?: string;
        website?: string;
      };
    };
    expiresIn: string;
    refreshToken?: string;
  };
  message?: string;
  error?: string;
}

export interface OAuthResponse {
  success: boolean;
  data?: {
    redirectUrl: string;
    state: string;
    codeChallenge?: string;
  };
  message?: string;
  error?: string;
}

export interface UserProfileResponse {
  success: boolean;
  data?: {
    id: string;
    username: string;
    email: string;
    role: string;
    profile: {
      firstName?: string;
      lastName?: string;
      avatar?: string;
      bio?: string;
      location?: string;
      website?: string;
    };
    createdAt: string;
    lastLogin?: string;
    emailVerified: boolean;
    twoFactorEnabled: boolean;
  };
  message?: string;
  error?: string;
}

// Request Types
export interface SigninCredentials {
  username: string;
  password: string;
}

export interface SignupData {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface PasswordResetRequest {
  username: string;
}

export interface PasswordResetConfirm {
  token: string;
  password: string;
}

// API Configuration
const API_BASE_URL = '/api/auth';
const DEFAULT_TIMEOUT = 10000; // 10 seconds

/**
 * Makes an authenticated API request with proper error handling
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    // Create an AbortController for timeout handling
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT);
    
    const response = await fetch(url, {
      ...config,
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    // Handle different HTTP status codes
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      switch (response.status) {
        case 400:
          throw new Error(errorData.message || 'Invalid request data');
        case 401:
          throw new Error(errorData.message || 'Invalid credentials');
        case 403:
          throw new Error(errorData.message || 'Access denied');
        case 404:
          throw new Error(errorData.message || 'Service not found');
        case 429:
          throw new Error(errorData.message || 'Too many requests. Please try again later.');
        case 500:
          throw new Error(errorData.message || 'Internal server error');
        case 503:
          throw new Error(errorData.message || 'Service temporarily unavailable');
        default:
          throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout. Please try again.');
    }
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network error. Please check your connection and try again.');
    }
    throw error;
  }
}

/**
 * Authentication Service Class
 */
export class AuthService {
  /**
   * Authenticate user with username/email and password
   */
  static async signin(credentials: SigninCredentials): Promise<AuthResponse> {
    return apiRequest<AuthResponse>('/signin', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  /**
   * Register a new user account
   */
  static async signup(userData: SignupData): Promise<AuthResponse> {
    return apiRequest<AuthResponse>('/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  /**
   * Sign out user and invalidate tokens
   */
  static async signout(token?: string): Promise<{ success: boolean; message?: string }> {
    const headers: Record<string, string> = {};
    
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return apiRequest<{ success: boolean; message?: string }>('/signout', {
      method: 'POST',
      headers,
    });
  }

  /**
   * Initiate Google OAuth flow
   */
  static async googleAuth(): Promise<OAuthResponse> {
    return apiRequest<OAuthResponse>('/google', {
      method: 'GET',
    });
  }

  /**
   * Initiate Facebook OAuth flow
   */
  static async facebookAuth(): Promise<OAuthResponse> {
    return apiRequest<OAuthResponse>('/facebook', {
      method: 'GET',
    });
  }

  /**
   * Handle OAuth callback (for Google/Facebook)
   */
  static async oauthCallback(
    provider: 'google' | 'facebook',
    code: string,
    state: string
  ): Promise<AuthResponse> {
    return apiRequest<AuthResponse>(`/oauth/${provider}/callback`, {
      method: 'POST',
      body: JSON.stringify({ code, state }),
    });
  }

  /**
   * Request password reset
   */
  static async forgotPassword(request: PasswordResetRequest): Promise<{ 
    success: boolean; 
    message: string; 
  }> {
    return apiRequest<{ success: boolean; message: string }>('/forgot-password', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  /**
   * Confirm password reset with token
   */
  static async resetPassword(data: PasswordResetConfirm): Promise<{ 
    success: boolean; 
    message: string; 
  }> {
    return apiRequest<{ success: boolean; message: string }>('/reset-password', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * Verify token validity
   */
  static async verifyToken(token: string): Promise<{ 
    valid: boolean; 
    user?: any; 
    expiresIn?: string; 
  }> {
    try {
      const response = await apiRequest<{ 
        valid: boolean; 
        user: any; 
        expiresIn: string; 
      }>('/verify', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return { valid: true, user: response.user, expiresIn: response.expiresIn };
    } catch (error) {
      console.error('Token verification failed:', error);
      return { valid: false };
    }
  }

  /**
   * Refresh authentication token
   */
  static async refreshToken(refreshToken: string): Promise<AuthResponse> {
    return apiRequest<AuthResponse>('/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
  }

  /**
   * Get current user profile
   */
  static async getProfile(token: string): Promise<UserProfileResponse> {
    return apiRequest<UserProfileResponse>('/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  /**
   * Update user profile
   */
  static async updateProfile(
    token: string, 
    profileData: Partial<SignupData>
  ): Promise<UserProfileResponse> {
    return apiRequest<UserProfileResponse>('/profile', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });
  }

  /**
   * Change user password
   */
  static async changePassword(
    token: string,
    currentPassword: string,
    newPassword: string
  ): Promise<{ success: boolean; message: string }> {
    return apiRequest<{ success: boolean; message: string }>('/change-password', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  }

  /**
   * Request email verification
   */
  static async requestEmailVerification(token: string): Promise<{ 
    success: boolean; 
    message: string; 
  }> {
    return apiRequest<{ success: boolean; message: string }>('/verify-email', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  /**
   * Confirm email verification
   */
  static async confirmEmailVerification(verificationToken: string): Promise<{ 
    success: boolean; 
    message: string; 
  }> {
    return apiRequest<{ success: boolean; message: string }>('/verify-email/confirm', {
      method: 'POST',
      body: JSON.stringify({ token: verificationToken }),
    });
  }
}

export default AuthService;
