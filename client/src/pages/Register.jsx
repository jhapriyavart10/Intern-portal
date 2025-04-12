import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'applicant'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const { username, email, password, confirmPassword, role } = formData;
    
    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = async e => {
        e.preventDefault();
        setError('');
        
        // Basic validation
        if (!username || !email || !password) {
            setError('Please fill all required fields');
            return;
        }
        
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        
        setLoading(true);
        
        try {
            // Send only needed data to API
            const userData = { username, email, password, role };
            await register(userData);
            // Navigate is handled in AuthContext after successful registration
        } catch (err) {
            setError(err.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit}>
                <h2>Create an Account</h2>
                {error && <div className="error">{error}</div>}
                
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="role">I am a:</label>
                    <select
                        id="role"
                        name="role"
                        value={role}
                        onChange={handleChange}
                    >
                        <option value="applicant">Internship Applicant</option>
                        <option value="employer">Employer</option>
                    </select>
                </div>
                
                <button type="submit" className="btn" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
                
                <div className="auth-links">
                    Already have an account? <Link to="/login">Log in</Link>
                </div>
            </form>
        </div>
    );
};

export default Register;