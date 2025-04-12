import React from 'react';
import { Link } from 'react-router-dom';

const InternshipCard = ({ internship }) => {
  const { id, title, company, location, role, duration, postedDate } = internship;
  
  return (
    <div className="internship-card">
      <h3>{title}</h3>
      <div className="company">{company}</div>
      <div className="details">
        <span className="location">📍 {location}</span>
        <span className="role">🧩 {role}</span>
        <span className="duration">⏱️ {duration}</span>
      </div>
      {postedDate && (
        <div className="date">Posted: {new Date(postedDate).toLocaleDateString()}</div>
      )}
      <div className="actions">
        <Link to={`/internships/${id}`}>View Details</Link>
      </div>
    </div>
  );
};

export default InternshipCard;