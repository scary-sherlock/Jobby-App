import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const NotFound = () => (
    <div className="not-found-container">
        <img
            src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
            alt="not found"
            className="not-found-image"
        />
        <h1 className="not-found-title">Oops! Page Not Found</h1>
        <p className="not-found-description">
            We're sorry, the page you requested could not be found. Please check the URL or try again later.
        </p>
        <Link to="/" className="home-button">
            Go to Home
        </Link>
    </div>
);

export default NotFound;