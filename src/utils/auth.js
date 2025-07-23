// Authentication utilities
export const AUTH_CREDENTIALS = {
  email: 'contact@kayease.com',
  password: 'Kayease@123'
};

// Cookie utilities
export const setCookie = (name, value, minutes) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (minutes * 60 * 1000));
  const secure = window.location.protocol === 'https:' ? ';Secure' : '';
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict${secure}`;
};

export const getCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export const deleteCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

// Authentication functions
export const login = (email, password) => {
  // Case-insensitive email comparison
  const normalizedEmail = email.toLowerCase().trim();
  const expectedEmail = AUTH_CREDENTIALS.email.toLowerCase();
  
  if (normalizedEmail === expectedEmail && password === AUTH_CREDENTIALS.password) {
    const userData = {
      name: 'Admin User',
      email: AUTH_CREDENTIALS.email, // Use the original case
      role: 'Admin',
      loginTime: new Date().toISOString()
    };
    
    // Store in cookies for 30 minutes
    setCookie('authToken', 'Kayease-admin-token', 30);
    setCookie('userData', JSON.stringify(userData), 30);
    
    // Also store in localStorage as backup
    localStorage.setItem('authToken', 'Kayease-admin-token');
    localStorage.setItem('user', JSON.stringify(userData));
    
    return { success: true, user: userData };
  }
  
  return { success: false, error: 'Invalid email or password' };
};

export const logout = () => {
  // Clear cookies
  deleteCookie('authToken');
  deleteCookie('userData');
  
  // Clear localStorage
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
};

// Helper function to check if session is expired
const isSessionExpired = (loginTime) => {
  const loginDate = new Date(loginTime);
  const now = new Date();
  const diffMinutes = (now - loginDate) / (1000 * 60);
  return diffMinutes > 30;
};

// Helper function to refresh session
const refreshSession = (userData) => {
  const updatedUserData = {
    ...userData,
    loginTime: new Date().toISOString()
  };
  
  // Update cookies
  setCookie('authToken', 'Kayease-admin-token', 30);
  setCookie('userData', JSON.stringify(updatedUserData), 30);
  
  // Update localStorage
  localStorage.setItem('authToken', 'Kayease-admin-token');
  localStorage.setItem('user', JSON.stringify(updatedUserData));
  
  return updatedUserData;
};

export const isAuthenticated = () => {
  try {
    // Check cookies first
    const cookieToken = getCookie('authToken');
    const cookieUserData = getCookie('userData');
    
    if (cookieToken && cookieUserData) {
      try {
        const userData = JSON.parse(cookieUserData);
        
        // Ensure userData has required fields
        if (!userData.loginTime || !userData.email || !userData.name) {
          logout();
          return { isAuth: false, user: null };
        }
        
        // Check if session is expired
        if (isSessionExpired(userData.loginTime)) {
          logout();
          return { isAuth: false, user: null };
        }
        
        // Refresh session if it's still valid (but getting close to expiry)
        const loginDate = new Date(userData.loginTime);
        const now = new Date();
        const diffMinutes = (now - loginDate) / (1000 * 60);
        
        if (diffMinutes > 25) { // Refresh if more than 25 minutes have passed
          const refreshedUserData = refreshSession(userData);
          return { isAuth: true, user: refreshedUserData };
        }
        
        return { isAuth: true, user: userData };
      } catch (error) {
        console.error('Error parsing cookie user data:', error);
        logout();
        return { isAuth: false, user: null };
      }
    }
    
    // Fallback to localStorage (for backward compatibility)
    const localToken = localStorage.getItem('authToken');
    const localUserData = localStorage.getItem('user');
    
    if (localToken && localUserData) {
      try {
        const userData = JSON.parse(localUserData);
        
        // Ensure userData has required fields
        if (!userData.email || !userData.name) {
          logout();
          return { isAuth: false, user: null };
        }
        
        // Check if session is expired (for localStorage fallback)
        if (userData.loginTime && isSessionExpired(userData.loginTime)) {
          logout();
          return { isAuth: false, user: null };
        }
        
        // If localStorage data is valid but no cookies, refresh cookies
        if (!cookieToken || !cookieUserData) {
          const refreshedUserData = refreshSession(userData);
          return { isAuth: true, user: refreshedUserData };
        }
        
        return { isAuth: true, user: userData };
      } catch (error) {
        console.error('Error parsing localStorage user data:', error);
        logout();
        return { isAuth: false, user: null };
      }
    }
    
    return { isAuth: false, user: null };
  } catch (error) {
    console.error('Error in isAuthenticated:', error);
    return { isAuth: false, user: null };
  }
};

export const requireAuth = (navigate) => {
  const { isAuth } = isAuthenticated();
  if (!isAuth) {
    navigate('/login');
    return false;
  }
  return true;
};