import { useState, useEffect, useCallback } from 'react';
import { fetchInternships } from '../utils/api';

const useInternships = () => {
    const [internships, setInternships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchInternshipsData = useCallback(async () => {
        setLoading(true);
        try {
            // Your API utility function that should return dummy data when API fails
            const data = await fetchInternships();
            console.log('Fetched internships data:', data);
            
            if (data && Array.isArray(data)) {
                setInternships(data);
            } else {
                console.warn('Internships data is not an array:', data);
                // Set to empty array if data is invalid
                setInternships([]);
            }
        } catch (err) {
            console.error('Error fetching internships:', err);
            setError('Failed to fetch internships');
            // Don't set internships to empty here - keep previous data if any
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchInternshipsData();
    }, [fetchInternshipsData]);

    return { internships, loading, error, fetchInternships: fetchInternshipsData };
};

export default useInternships;