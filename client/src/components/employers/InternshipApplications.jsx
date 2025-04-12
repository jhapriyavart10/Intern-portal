import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchApplications } from '../../utils/api';

const InternshipApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const getApplications = async () => {
            try {
                const data = await fetchApplications(id);
                setApplications(data);
            } catch (err) {
                setError('Failed to load applications');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        getApplications();
    }, [id]);

    if (loading) {
        return <div className="loading">Loading applications...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="container applications-container">
            <h1>Applications for Internship</h1>
            
            {applications.length === 0 ? (
                <div className="empty-state">
                    <p>No applications received yet for this internship.</p>
                </div>
            ) : (
                <div className="applications-list">
                    {applications.map(app => (
                        <div key={app._id} className="application-card">
                            <div className="applicant-info">
                                <h3>{app.applicantName}</h3>
                                <p>{app.applicantEmail}</p>
                            </div>
                            
                            <div className="application-details">
                                <p><strong>Status:</strong> <span className={`status ${app.status}`}>{app.status}</span></p>
                                <div className="cover-letter">
                                    <h4>Cover Letter</h4>
                                    <p>{app.coverLetter}</p>
                                </div>
                            </div>
                            
                            <div className="application-actions">
                                {app.resume && (
                                    <a href={app.resume} target="_blank" rel="noopener noreferrer" className="btn-outline">
                                        View Resume
                                    </a>
                                )}
                                <div className="status-actions">
                                    <button className="btn btn-success">Accept</button>
                                    <button className="btn btn-danger">Reject</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default InternshipApplications;