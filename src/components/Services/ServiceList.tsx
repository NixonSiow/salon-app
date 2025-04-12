import React from 'react';
import './ServiceList.css';
import ServiceCard from './ServiceCard';
import haircutImage from '../../images/haircut.jpg';
import coloringImage from '../../images/coloring.jpg';
import manicureImage from '../../images/manicure.jpg';
import pedicureImage from '../../images/pedicure.jpg';

// Temporary mock data - this should be moved to a proper data file later
const services = [
    {
        id: 1,
        name: 'Haircut & Styling',
        description: 'Professional haircut and styling service tailored to your preferences',
        duration: '60 min',
        price: '$50',
        image: haircutImage
    },
    {
        id: 2,
        name: 'Hair Coloring',
        description: 'Full color, highlights, or balayage services',
        duration: '120 min',
        price: '$120',
        image: coloringImage
    },
    {
        id: 3,
        name: 'Manicure',
        description: 'Classic manicure with polish application',
        duration: '45 min',
        price: '$35',
        image: manicureImage
    },
    {
        id: 4,
        name: 'Pedicure',
        description: 'Relaxing pedicure with massage and scrub',
        duration: '60 min',
        price: '$45',
        image: pedicureImage
    }
];

const ServiceList: React.FC = () => {
    return (
        <div className="service-list">
            {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
            ))}
        </div>
    );
};

export default ServiceList; 