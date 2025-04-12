import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav>
            <div className="container">
                <Link to="/" className="logo">Internship Portal</Link>
                
                <div className="nav-links">
                    <NavLink to="/" className={({isActive}) => isActive ? 'active' : ''}>
                        Home
                    </NavLink>
                    
                    {!user ? (
                        <>
                            <NavLink to="/login" className={({isActive}) => isActive ? 'active' : ''}>
                                Login
                            </NavLink>
                            <NavLink to="/register" className={({isActive}) => isActive ? 'active' : ''}>
                                Register
                            </NavLink>
                        </>
                    ) : (
                        <>
                            {user.role === 'employer' && (
                                <NavLink to="/employer/dashboard" className={({isActive}) => isActive ? 'active' : ''}>
                                    Dashboard
                                </NavLink>
                            )}
                            
                            {user.role === 'applicant' && (
                                <NavLink to="/applicant/dashboard" className={({isActive}) => isActive ? 'active' : ''}>
                                    Dashboard
                                </NavLink>
                            )}
                            
                            <NavLink to="/internships" className={({isActive}) => isActive ? 'active' : ''}>
                                Internships
                            </NavLink>
                            
                            <button onClick={logout} className="btn btn-outline">
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;