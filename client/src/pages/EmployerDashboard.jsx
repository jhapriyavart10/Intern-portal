import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getInternshipPostings } from '../utils/api';
import { Link } from 'react-router-dom';

const EmployerDashboard = () => {
    const { user, loading } = useContext(AuthContext);
    const [internships, setInternships] = useState([]);
    const [loadingInternships, setLoadingInternships] = useState(true);

    useEffect(() => {
        const fetchInternships = async () => {
            if (!user) return;
            try {
                const data = await getInternshipPostings();
                setInternships(data);
            } catch (error) {
                console.error('Error fetching employer internships:', error);
            } finally {
                setLoadingInternships(false);
            }
        };
        
        fetchInternships();
    }, [user]);

    if (loading || !user) {
        return <div className="loading-container">Loading...</div>;
    }

    return (
        <div className="dashboard employer-dashboard">
            <div className="dashboard-header">
                <h1>Welcome, {user.username || 'Employer'}</h1>
                <p>Manage your internship postings and applications</p>
            </div>

            <div className="actions-panel">
                <Link to="/employer/create-internship" className="btn">
                    Post New Internship
                </Link>
            </div>

            <div className="dashboard-section">
                <h2>Your Internship Postings</h2>
                {loadingInternships ? (
                    <p>Loading your internships...</p>
                ) : (
                    <div className="internship-list employer-list">
                        {internships.length > 0 ? (
                            internships.map(internship => (
                                <div key={internship._id || internship.id} className="internship-item">
                                    <div className="internship-info">
                                        <h3>{internship.title}</h3>
                                        <p>{internship.location} • {internship.applicants || 0} Applications</p>
                                    </div>
                                    <div className="internship-actions">
                                        <Link to={`/employer/internship/${internship._id || internship.id}`} className="btn-outline">
                                            View Details
                                        </Link>
                                        <Link to={`/employer/applications/${internship._id || internship.id}`} className="btn">
                                            View Applications
                                        </Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="empty-state">
                                <p>You haven't posted any internships yet.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmployerDashboard;