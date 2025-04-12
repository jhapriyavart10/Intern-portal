import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import { createInternship } from '../../utils/api';

const CreateInternship = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        description: '',
        requirements: '',
        stipend: '',
        duration: '',
        skills: '',
        deadline: '',
        openPositions: 1
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    if (!user || user.role !== 'employer') {
        navigate('/login');
        return null;
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Convert skills string to array
            const internshipData = {
                ...formData,
                company: user.company || formData.company,
                skills: formData.skills.split(',').map(skill => skill.trim()),
                openPositions: Number(formData.openPositions),
                postedDate: new Date().toISOString()
            };

            await createInternship(internshipData);
            navigate('/employer/dashboard');
        } catch (err) {
            setError('Failed to create internship posting');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="form-container create-internship">
                <h1>Post New Internship</h1>
                {error && <div className="error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Position Title*</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="company">Company Name*</label>
                        <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="location">Location*</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                            placeholder="City, Remote, etc."
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description*</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows="5"
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="requirements">Requirements</label>
                        <textarea
                            id="requirements"
                            name="requirements"
                            value={formData.requirements}
                            onChange={handleChange}
                            rows="3"
                        ></textarea>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="stipend">Stipend*</label>
                            <input
                                type="text"
                                id="stipend"
                                name="stipend"
                                value={formData.stipend}
                                onChange={handleChange}
                                required
                                placeholder="₹10,000/month"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="duration">Duration*</label>
                            <input
                                type="text"
                                id="duration"
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                                required
                                placeholder="3 months"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="skills">Skills (comma-separated)*</label>
                        <input
                            type="text"
                            id="skills"
                            name="skills"
                            value={formData.skills}
                            onChange={handleChange}
                            required
                            placeholder="React, JavaScript, CSS"
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="deadline">Application Deadline*</label>
                            <input
                                type="date"
                                id="deadline"
                                name="deadline"
                                value={formData.deadline}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="openPositions">Number of Positions*</label>
                            <input
                                type="number"
                                id="openPositions"
                                name="openPositions"
                                min="1"
                                value={formData.openPositions}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn" disabled={loading}>
                        {loading ? 'Posting...' : 'Post Internship'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateInternship;