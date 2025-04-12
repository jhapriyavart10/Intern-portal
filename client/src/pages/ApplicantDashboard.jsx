import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FilterContext } from '../context/FilterContext';
import InternshipList from '../components/applicants/InternshipList';
import { Navigate, useNavigate } from 'react-router-dom';

const ApplicantDashboard = () => {
    const { user, loading } = useContext(AuthContext);
    const { filters, setFilters } = useContext(FilterContext);
    const navigate = useNavigate();

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!loading && !user) {
            navigate('/login');
        }
    }, [user, loading, navigate]);
    
    // Show loading state while checking authentication
    if (loading) {
        return <div className="loading-container">Loading dashboard...</div>;
    }
    
    // If not loading and no user, show nothing (the useEffect will redirect)
    if (!user) {
        return null;
    }
    
    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>Welcome, {user.username || user.email || 'Applicant'}</h1>
                <p>Find and apply to the best internship opportunities</p>
            </div>
            
            <div className="dashboard-section">
                <h2 className="section-title">Available Internships</h2>
                <InternshipList filters={filters} setFilters={setFilters} />
            </div>
        </div>
    );
};

export default ApplicantDashboard;