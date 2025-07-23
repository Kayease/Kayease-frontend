import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuth, user } = isAuthenticated();
  
  // console.log('ProtectedRoute auth check:', { isAuth, user, pathname: location.pathname });

  useEffect(() => {
    if (!isAuth) {
      console.log('User not authenticated, redirecting to login');
      toast.warning('Please login to access admin area');
      navigate('/login', { 
        state: { from: location },
        replace: true 
      });
    } else {
      console.log('User authenticated, allowing access to:', location.pathname);
    }
  }, [isAuth, navigate, location]);

  if (!isAuth) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-slate-600 text-sm">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;