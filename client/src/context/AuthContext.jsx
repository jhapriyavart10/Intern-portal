import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get('/auth/me');
                setUser(response.data);
            } catch (error) {
                console.error('Failed to fetch user:', error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const login = async (credentials) => {
        const response = await api.post('/auth/login', credentials);
        setUser(response.data);
        navigate('/dashboard');
    };

    const logout = async () => {
        await api.post('/auth/logout');
        setUser(null);
        navigate('/');
    };

    // In your register function:

    const register = async (userData) => {
        try {
            const response = await api.post('/auth/register', userData);
            setUser(response.data);
            
            // Navigate based on user role
            if (response.data.role === 'employer') {
                navigate('/employer/dashboard');
            } else {
                navigate('/applicant/dashboard');
            }
            
            return response.data;
        } catch (error) {
            console.error('Registration failed:', error);
            throw error.response?.data || error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};