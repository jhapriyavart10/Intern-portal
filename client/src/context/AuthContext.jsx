import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { registerUser, loginUser } from '../utils/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Check if user is already logged in when app loads
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get('/auth/me');
                setUser(response.data);
                setError(null);
            } catch (err) {
                // Don't log 401 errors as they're expected for not logged-in users
                if (err.response?.status !== 401) {
                    console.error('Failed to fetch user:', err);
                }
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const register = async (userData) => {
        try {
            const response = await registerUser(userData);
            setUser(response);
            
            // Navigate based on user role
            if (response.role === 'employer') {
                navigate('/employer/dashboard');
            } else {
                navigate('/applicant/dashboard');
            }
            
            return response;
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Registration failed';
            setError(errorMessage);
            throw new Error(errorMessage);
        }
    };

    const login = async (credentials) => {
        try {
            const response = await loginUser(credentials);
            setUser(response);
            setError(null);
            
            // Navigate based on user role
            if (response.role === 'employer') {
                navigate('/employer/dashboard');
            } else {
                navigate('/applicant/dashboard');
            }
            
            return response;
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Login failed';
            setError(errorMessage);
            throw new Error(errorMessage);
        }
    };

    const logout = async () => {
        try {
            await api.post('/auth/logout');
        } catch (err) {
            console.error('Logout error:', err);
        } finally {
            setUser(null);
            navigate('/');
        }
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            loading, 
            error,
            register,
            login,
            logout,
            setError
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;