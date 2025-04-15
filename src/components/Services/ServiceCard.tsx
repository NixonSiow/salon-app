import React, { useState } from 'react';
import BookingModal from '../BookingModal';
import './ServiceCard.css';

interface ServiceCardProps {
    service: {
        name: string;
        description: string;
        duration: string;
        price: string;
        image: string;
    };
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
    const [showBookingModal, setShowBookingModal] = useState(false);

    const handleBookingClick = () => {
        setShowBookingModal(true);
    };

    return (
        <>
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
                    <button className="book-button" onClick={handleBookingClick}>Book Now</button>
                </div>
            </div>
            <BookingModal
                show={showBookingModal}
                onHide={() => setShowBookingModal(false)}
                serviceType={service.name}
            />
        </>
    );
};

export default ServiceCard; 