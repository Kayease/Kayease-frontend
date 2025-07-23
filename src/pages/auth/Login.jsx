import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { toast } from 'react-toastify';
import { login, isAuthenticated, AUTH_CREDENTIALS } from '../../utils/auth';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [animatedElements, setAnimatedElements] = useState(new Set());

  // Check if user is already authenticated
  useEffect(() => {
    const { isAuth } = isAuthenticated();
    if (isAuth) {
      const redirectTo = location.state?.from?.pathname || '/admin';
      navigate(redirectTo, { replace: true });
    }
  }, [navigate, location]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimatedElements(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Debug: Log the credentials being used
      // console.log('Attempting login with:', {
      //   email: formData.email,
      //   password: formData.password,
      //   expectedEmail: AUTH_CREDENTIALS.email,
      //   expectedPassword: AUTH_CREDENTIALS.password
      // });
      
      // Attempt login with new auth system
      const result = login(formData.email, formData.password);
      
      console.log('Login result:', result);
      
      if (result.success) {
        toast.success('Login successful! Welcome back.');
        
        // Redirect to intended page or admin dashboard
        const redirectTo = location.state?.from?.pathname || '/admin';
        setTimeout(() => {
          navigate(redirectTo, { replace: true });
        }, 500);
      } else {
        setErrors({ general: result.error });
        toast.error(result.error);
      }
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = 'Login failed. Please try again.';
      setErrors({ general: errorMessage });
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Test function to verify correct credentials
  const testCorrectCredentials = () => {
    setFormData({
      email: AUTH_CREDENTIALS.email,
      password: AUTH_CREDENTIALS.password
    });
    toast.info('Correct credentials loaded! Click Sign In to test.');
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-primary/10 rounded-full geometric-float"></div>
        <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-secondary/10 rounded-full geometric-float animation-delay-200"></div>
        <div className="absolute bottom-1/4 left-1/3 w-5 h-5 bg-primary/10 rounded-full geometric-float animation-delay-400"></div>
      </div>

      <div className="relative z-10 max-w-md w-full space-y-8">
        {/* Header */}
        <div 
          data-animate
          id="login-header"
          className={`text-center transition-all duration-700 ${
            animatedElements.has('login-header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-block mb-6">
            <img
              src="/Kayease-logo.png"
              alt="Kayease Logo"
              className="h-12 mx-auto cursor-pointer"
              onClick={() => navigate('/')}
            />
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2">
            Admin Login
          </h2>
          <p className="text-slate-600">
            Sign in to access the admin dashboard
          </p>
        </div>

        {/* Login Form */}
        <div 
          data-animate
          id="login-form"
          className={`bg-white rounded-2xl shadow-lg border border-slate-200/50 p-8 transition-all duration-700 delay-100 ${
            animatedElements.has('login-form') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* General Error */}
          {errors.general && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <Icon name="AlertCircle" size={16} className="text-red-500" />
                <span className="text-sm text-red-600">{errors.general}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon name="Mail" size={16} className="text-slate-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200 ${
                    errors.email 
                      ? 'border-red-300 bg-red-50' 
                      : 'border-slate-300 bg-white hover:border-slate-400'
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                  <Icon name="AlertCircle" size={12} />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon name="Lock" size={16} className="text-slate-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200 ${
                    errors.password 
                      ? 'border-red-300 bg-red-50' 
                      : 'border-slate-300 bg-white hover:border-slate-400'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <Icon 
                    name={showPassword ? "EyeOff" : "Eye"} 
                    size={16} 
                    className="text-slate-400 hover:text-slate-600 transition-colors duration-200" 
                  />
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                  <Icon name="AlertCircle" size={12} />
                  <span>{errors.password}</span>
                </p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary/20 border-slate-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-700">
                Keep me signed in for 30 minutes
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="default"
              size="lg"
              className="w-full cta-button text-white font-medium"
              disabled={isLoading}
              iconName={isLoading ? "Loader2" : "LogIn"}
              iconPosition="right"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-sm text-slate-600 hover:text-primary transition-colors duration-200"
            >
              ← Back to Homepage
            </button>
          </div>
        </div>

             
      </div>
    </div>
  );
};

export default Login;