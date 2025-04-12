import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import api from '../../utils/api';

const InternshipCard = ({ internship }) => {
    const { user } = useContext(AuthContext);
    const [applying, setApplying] = useState(false);
    const [applied, setApplied] = useState(false);
    const [error, setError] = useState(null);
    
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    
    const handleApply = async () => {
        if (!user) {
            // Redirect to login if not authenticated
            window.location.href = '/login';
            return;
        }
        
        setApplying(true);
        setError(null);
        
        try {
            // In a real app, this would submit an application to your API
            // await api.post('/applications', { internshipId: internship._id });
            
            // Simulate API call with timeout
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            setApplied(true);
            setTimeout(() => {
                setApplied(false);
            }, 5000); // Reset after 5 seconds
        } catch (err) {
            setError('Failed to submit application. Please try again.');
        } finally {
            setApplying(false);
        }
    };
    
    return (
        <div className="internship-card">
            <div className="internship-card-content">
                <h3>{internship.title}</h3>
                <div className="company">{internship.company}</div>
                
                <div className="details">
                    <span><i className="fas fa-map-marker-alt"></i> {internship.location}</span>
                    <span><i className="fas fa-money-bill"></i> {internship.stipend}</span>
                    <span><i className="fas fa-calendar"></i> {internship.duration}</span>
                </div>
                
                <div className="description">
                    {internship.description.substring(0, 150)}
                    {internship.description.length > 150 ? '...' : ''}
                </div>
                
                <div className="skills">
                    {internship.skills && internship.skills.map((skill, index) => (
                        <span key={index} className="skill-tag">{skill}</span>
                    ))}
                </div>
                
                <div className="date">
                    <span>Posted: {formatDate(internship.postedDate)}</span>
                    <span>Deadline: {formatDate(internship.deadline)}</span>
                </div>
                
                {error && <div className="error">{error}</div>}
                
                <div className="actions">
                    <Link to={`/internships/${internship._id}`} className="btn-outline">View Details</Link>
                    <button 
                        onClick={handleApply} 
                        className={`btn ${applied ? 'btn-success' : ''}`} 
                        disabled={applying || applied}>
                        {applying ? 'Applying...' : applied ? 'Applied!' : 'Apply Now'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InternshipCard;