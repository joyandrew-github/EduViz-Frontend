import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import HomePage from './pages/HomePage/HomePage.jsx';
import ModelPage from './pages/ModelPage/ModelPage.jsx';
import LearnerDashboard from './pages/LearnerDashboard/LearnerDashboard.jsx';
import RoleSelection from './pages/RoleSelection/RoleSelection.jsx';
import LoginPage from './pages/SignUp/LoginPage.jsx';
import SignUpPage from './pages/SignUp/SignUpPage.jsx';
import InstructorDashboard from './pages/InstructorDashboard/InstructorDashboardPage.jsx';
import LearningPage from './pages/LearningPage/LearningPage.jsx';
import ModelEnrollPage from './pages/ModelEnrollPage/ModelEnrollPage.jsx';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard.jsx';

// PrivateRoute component to handle authentication and role-based access
const PrivateRoute = ({ children, allowedRole }) => {
  const [authStatus, setAuthStatus] = useState({ isAuthenticated: false, role: null, loading: true });
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setAuthStatus({ isAuthenticated: false, role: null, loading: false });
        return;
      }

      try {
        const response = await axios.get('https://eduviz-backend-1.onrender.com/api/users/me', {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        const userRole = response.data.role; // Assuming API returns { role: "learner" | "instructor" | null }
        setAuthStatus({ isAuthenticated: true, role: userRole, loading: false });
      } catch (error) {
        console.error('Error fetching user data:', error);
        localStorage.removeItem('token'); // Clear invalid token
        setAuthStatus({ isAuthenticated: false, role: null, loading: false });
      }
    };

    checkAuth();
  }, []);

  if (authStatus.loading) {
    return <div>Loading...</div>;
  }

  if (!authStatus.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && authStatus.role !== allowedRole) {
    return <Navigate to={authStatus.role === 'learner' ? '/learner' : '/instructor'} replace />;
  }

  return children;
};

// Component to protect public routes (login, signup) and RoleSelection
const PublicRoute = ({ children, restrictToNoRole = false }) => {
  const [authStatus, setAuthStatus] = useState({ isAuthenticated: false, role: null, loading: true });
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setAuthStatus({ isAuthenticated: false, role: null, loading: false });
        return;
      }

      try {
        const response = await axios.get('https://eduviz-backend-1.onrender.com/api/users/me', {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        const userRole = response.data.role; // Role could be "learner", "instructor", or null
        setAuthStatus({ isAuthenticated: true, role: userRole, loading: false });
      } catch (error) {
        console.error('Error fetching user data:', error);
        localStorage.removeItem('token');
        setAuthStatus({ isAuthenticated: false, role: null, loading: false });
      }
    };

    checkAuth();
  }, []);

  if (authStatus.loading) {
    return <div>Loading...</div>;
  }

  if (authStatus.isAuthenticated) {
    if (restrictToNoRole && authStatus.role) {
      // If restrictToNoRole is true and user has a role, redirect to their dashboard
      return <Navigate to={authStatus.role === 'learner' ? '/learner' : '/instructor'} replace />;
    } else if (!restrictToNoRole && authStatus.role) {
      // For login/signup, redirect authenticated users with a role to their dashboard
      return <Navigate to={authStatus.role === 'learner' ? '/learner' : '/instructor'} replace />;
    }
  }

  return children;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:modelId" element={<ModelPage />} />
        {/* Protect login and signup routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignUpPage />
            </PublicRoute>
          }
        />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/model/:modelId" element={<ModelEnrollPage />} />
        <Route path="/learning/:modelId" element={<LearningPage />} />
        {/* Protect RoleSelection to only allow users without a role */}
        <Route
          path="/RoleSelection"
          element={
            <PublicRoute restrictToNoRole={true}>
              <RoleSelection />
            </PublicRoute>
          }
        />
        {/* Protect learner and instructor routes with role-based access */}
        <Route
          path="/learner"
          element={
            <PrivateRoute allowedRole="learner">
              <LearnerDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/instructor"
          element={
            <PrivateRoute allowedRole="instructor">
              <InstructorDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;