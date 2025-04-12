import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createInternship } from '../../utils/api';

const CreatePosting = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createInternship({ title, description, location, role });
            navigate.push('/employer/dashboard');
        } catch (error) {
            console.error('Error creating internship:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Create Internship Posting</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Location:</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Role:</label>
                    <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Posting'}
                </button>
            </form>
        </div>
    );
};

export default CreatePosting;