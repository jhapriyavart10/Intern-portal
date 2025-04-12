import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FilterContext } from '../context/FilterContext';
import InternshipList from '../components/applicants/InternshipList';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const ApplicantDashboard = () => {
    const { user } = useContext(AuthContext);
    const { filters, setFilters } = useContext(FilterContext);

    return (
        <div>
            <Navbar />
            <h1>Welcome, {user.name}</h1>
            <h2>Available Internships</h2>
            <InternshipList filters={filters} setFilters={setFilters} />
            <Footer />
        </div>
    );
};

export default ApplicantDashboard;