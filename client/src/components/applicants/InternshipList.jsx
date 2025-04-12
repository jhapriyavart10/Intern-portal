import React, { useEffect, useState, useContext } from 'react';
import { FilterContext } from '../../context/FilterContext.jsx';
import useInternships from '../../hooks/useInternships';
import InternshipCard from './InternshipCard.jsx';

const InternshipList = () => {
    const { internships, fetchInternships } = useInternships();
    const { filters } = useContext(FilterContext);
    const [filteredInternships, setFilteredInternships] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadInternships = async () => {
            setLoading(true);
            await fetchInternships();
            setLoading(false);
        };
        
        loadInternships();
    }, [fetchInternships]);

    useEffect(() => {
        const applyFilters = () => {
            if (!internships) return;
            
            let filtered = internships;

            if (filters.location) {
                filtered = filtered.filter(internship =>
                    internship.location?.toLowerCase().includes(filters.location.toLowerCase())
                );
            }

            if (filters.role) {
                filtered = filtered.filter(internship =>
                    internship.role?.toLowerCase().includes(filters.role.toLowerCase())
                );
            }

            setFilteredInternships(filtered);
        };

        applyFilters();
    }, [internships, filters]);

    if (loading) {
        return <div className="loading">Loading internships...</div>;
    }

    return (
        <div className="internship-grid">
            {filteredInternships && filteredInternships.length > 0 ? (
                <div className="internship-cards">
                    {filteredInternships.map(internship => (
                        <InternshipCard key={internship.id || internship._id} internship={internship} />
                    ))}
                </div>
            ) : (
                <div className="empty-state">
                    <p>No internships found. Please try adjusting your filters.</p>
                </div>
            )}
        </div>
    );
};

export default InternshipList;