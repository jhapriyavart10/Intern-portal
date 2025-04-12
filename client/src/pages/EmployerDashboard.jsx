import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Dashboard from '../components/employers/Dashboard';
import Applications from '../components/employers/Applications';

const EmployerDashboard = () => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <h1>Welcome, {user.name}</h1>
            <Dashboard />
            <Applications />
        </div>
    );
};

export default EmployerDashboard;