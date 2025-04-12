import React, { useState } from 'react';

const ApplicationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        resume: null,
        coverLetter: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            resume: e.target.files[0]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSubmit = new FormData();
        for (const key in formData) {
            formDataToSubmit.append(key, formData[key]);
        }

        try {
            const response = await fetch('/api/applications', {
                method: 'POST',
                body: formDataToSubmit
            });
            if (response.ok) {
                // Handle successful submission
                alert('Application submitted successfully!');
            } else {
                // Handle errors
                alert('Failed to submit application.');
            }
        } catch (error) {
            console.error('Error submitting application:', error);
            alert('An error occurred while submitting the application.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
                <label>Resume:</label>
                <input type="file" name="resume" onChange={handleFileChange} required />
            </div>
            <div>
                <label>Cover Letter:</label>
                <textarea name="coverLetter" value={formData.coverLetter} onChange={handleChange} />
            </div>
            <button type="submit">Submit Application</button>
        </form>
    );
};

export default ApplicationForm;