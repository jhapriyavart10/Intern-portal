import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import  useInternships  from '../../hooks/useInternships';
import  Button  from '../common/Button';

const Applications = () => {
    const { user } = useContext(AuthContext);
    const { fetchApplications } = useInternships();
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const getApplications = async () => {
            const apps = await fetchApplications(user.id);
            setApplications(apps);
        };
        getApplications();
    }, [fetchApplications, user.id]);

    return (
        <div>
            <h1>Applications for Your Internships</h1>
            {applications.length === 0 ? (
                <p>No applications submitted yet.</p>
            ) : (
                <ul>
                    {applications.map((application) => (
                        <li key={application.id}>
                            <h2>{application.internshipTitle}</h2>
                            <p>Applicant: {application.applicantName}</p>
                            <p>Status: {application.status}</p>
                            <Button onClick={() => {/* Handle view details */}}>View Details</Button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Applications;