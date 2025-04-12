import React from 'react';

const Footer = () => {
    return (
        <footer style={{ textAlign: 'center', padding: '1rem', background: '#f1f1f1' }}>
            <p>&copy; {new Date().getFullYear()} Internship Portal. All rights reserved.</p>
            <p>
                <a href="/terms">Terms of Service</a> | <a href="/privacy">Privacy Policy</a>
            </p>
        </footer>
    );
};

export default Footer;