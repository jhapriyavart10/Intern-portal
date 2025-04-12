import React from 'react';
import { Link } from 'react-router-dom';
import InternshipList from '../components/applicants/InternshipList';

const Home = () => {
    return (
        <div>
            {/* Hero section with gradient background */}
            <div className="hero">
                <div className="container">
                    <h1>Welcome to the Internship Portal</h1>
                    <p>Connect with top employers and find the perfect internship opportunity to kickstart your career</p>
                    <div className="hero-buttons">
                        <Link to="/login" className="btn">Login</Link>
                        <Link to="/register" className="btn btn-secondary">Register</Link>
                    </div>
                </div>
            </div>
            
            {/* Main content section */}
            <main>
                <div className="internship-list-container">
                    <div className="container">
                        <h2 className="section-title">Available Internships</h2>
                        <InternshipList />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;