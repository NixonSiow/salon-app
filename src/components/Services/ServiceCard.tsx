import React from 'react';
import './ServiceCard.css';

interface Service {
    id: number;
    name: string;
    description: string;
    duration: string;
    price: string;
    image: string;
}

interface ServiceCardProps {
    service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
    return (
        <div className="service-card">
            <div className="service-image">
                <img src={service.image} alt={service.name} />
            </div>
            <div className="service-content">
                <h3 className="service-name">{service.name}</h3>
                <p className="service-description">{service.description}</p>
                <div className="service-details">
                    <span className="service-duration">{service.duration}</span>
                    <span className="service-price">{service.price}</span>
                </div>
                <button className="book-button">Book Now</button>
            </div>
        </div>
    );
};

export default ServiceCard; 