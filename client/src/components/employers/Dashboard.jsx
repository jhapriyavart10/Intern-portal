import React, { useEffect, useState } from 'react';
import { getInternshipPostings } from '../../utils/api';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [postings, setPostings] = useState([]);

    useEffect(() => {
        const fetchPostings = async () => {
            const data = await getInternshipPostings();
            setPostings(data);
        };

        fetchPostings();
    }, []);

    return (
        <div>
            <h1>Employer Dashboard</h1>
            <Link to="/create-posting">Create New Posting</Link>
            <h2>Your Internship Postings</h2>
            <ul>
                {postings.map(posting => (
                    <li key={posting.id}>
                        <Link to={`/internships/${posting.id}`}>{posting.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;