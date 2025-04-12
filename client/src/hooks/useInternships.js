import { useState, useEffect, useCallback } from 'react';
import { fetchInternships as fetchInternshipsAPI } from '../utils/api';

const useInternships = () => {
    const [internships, setInternships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchInternships = useCallback(async () => {
        setLoading(true);
        try {
            const data = await fetchInternshipsAPI();
            setInternships(data);
            setError(null);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchInternships(); // Call directly, don't wrap in another function
    }, [fetchInternships]);

    const filterInternships = (location, role) => {
        return internships.filter(internship => {
            return (
                (location ? internship.location.includes(location) : true) &&
                (role ? internship.role.includes(role) : true)
            );
        });
    };

    const sortInternshipsByDate = () => {
        return [...internships].sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
    };

    return { internships, loading, error, fetchInternships, filterInternships, sortInternshipsByDate };
};

export default useInternships;