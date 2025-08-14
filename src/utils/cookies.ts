// Cookie utility functions for authentication
import type { CookieOptions } from "../types";

// Set a cookie
export const setCookie = (name: string, value: string, options: CookieOptions = {}): void => {
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  // Set default options
  const defaultOptions: CookieOptions = {
    expires: 7, // 7 days default
    path: '/',
    secure: window.location.protocol === 'https:',
    sameSite: 'lax'
  };

  const finalOptions = { ...defaultOptions, ...options };

  if (finalOptions.expires) {
    const date = new Date();
    date.setTime(date.getTime() + (finalOptions.expires * 24 * 60 * 60 * 1000));
    cookieString += `; expires=${date.toUTCString()}`;
  }

  if (finalOptions.path) {
    cookieString += `; path=${finalOptions.path}`;
  }

  if (finalOptions.domain) {
    cookieString += `; domain=${finalOptions.domain}`;
  }

  if (finalOptions.secure) {
    cookieString += `; secure`;
  }

  if (finalOptions.sameSite) {
    cookieString += `; samesite=${finalOptions.sameSite}`;
  }

  document.cookie = cookieString;
  console.log(`🍪 Cookie set: ${name}`, { value, options: finalOptions });
};

// Get a cookie
export const getCookie = (name: string): string | null => {
  const encodedName = encodeURIComponent(name);
  const cookies = document.cookie.split(';');
  
  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith(`${encodedName}=`)) {
      const value = cookie.substring(encodedName.length + 1);
      const decodedValue = decodeURIComponent(value);
      console.log(`🍪 Cookie retrieved: ${name}`, decodedValue);
      return decodedValue;
    }
  }
  
  console.log(`🍪 Cookie not found: ${name}`);
  return null;
};

// Remove a cookie
export const removeCookie = (name: string, options: Omit<CookieOptions, 'expires'> = {}): void => {
  const deleteOptions = {
    ...options,
    expires: -1 // Set to past date to delete
  };
  
  setCookie(name, '', deleteOptions);
  console.log(`🍪 Cookie removed: ${name}`);
};

// Check if a cookie exists
export const hasCookie = (name: string): boolean => {
  return getCookie(name) !== null;
};

// Get all cookies as an object
export const getAllCookies = (): Record<string, string> => {
  const cookies: Record<string, string> = {};
  
  if (document.cookie) {
    document.cookie.split(';').forEach(cookie => {
      const [name, value] = cookie.trim().split('=');
      if (name && value) {
        cookies[decodeURIComponent(name)] = decodeURIComponent(value);
      }
    });
  }
  
  console.log('🍪 All cookies:', cookies);
  return cookies;
};

// Authentication-specific cookie functions
export const setAuthToken = (token: string): void => {
  setCookie('authToken', token, {
    expires: 7, // 7 days
    secure: true,
    sameSite: 'strict'
  });
};

export const getAuthToken = (): string | null => {
  return getCookie('authToken');
};

export const setUserData = (userData: any): void => {
  setCookie('userData', JSON.stringify(userData), {
    expires: 7, // 7 days
    secure: true,
    sameSite: 'strict'
  });
};

export const getUserData = (): any | null => {
  const userDataString = getCookie('userData');
  if (userDataString) {
    try {
      return JSON.parse(userDataString);
    } catch (error) {
      console.error('❌ Failed to parse user data from cookie:', error);
      removeCookie('userData');
      return null;
    }
  }
  return null;
};

export const clearAuthCookies = (): void => {
  removeCookie('authToken');
  removeCookie('userData');
  console.log('🍪 Authentication cookies cleared');
};

export const isAuthenticated = (): boolean => {
  const token = getAuthToken();
  const userData = getUserData();
  return !!(token && userData);
};
