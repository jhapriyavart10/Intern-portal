import React from 'react';
import { useParams } from 'react-router-dom';
import useInternships from '../../hooks/useInternships';

const InternshipDetails = () => {
    const { id } = useParams();
    const { internships } = useInternships();
    const internship = internships.find(internship => internship._id === id);

    if (!internship) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{internship.title}</h1>
            <p><strong>Company:</strong> {internship.company}</p>
            <p><strong>Location:</strong> {internship.location}</p>
            <p><strong>Description:</strong> {internship.description}</p>
            <p><strong>Posted on:</strong> {new Date(internship.createdAt).toLocaleDateString()}</p>
        </div>
    );
};

export default InternshipDetails;