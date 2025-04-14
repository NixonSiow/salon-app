import React from 'react';
import { Link } from 'react-router-dom';
import './Services.css';
import ServiceList from './ServiceList';

const Services: React.FC = () => {
    return (
        <div className="services-container">
            <div className="home-button-container">
                <Link to="/" className="home-button">
                    <img
                        src="/barber.png"
                        alt="SilveryCutSalon"
                        height="40"
                        className="d-inline-block align-top"
                    />
                    {' '}SilveryCut Salon
                </Link>
            </div>
            <h1 className="services-title">Our Services</h1>
            <p className="services-description">
                Discover our range of professional salon services designed to enhance your beauty and well-being.
            </p>
            <ServiceList />
        </div>
    );
};

export default Services; 