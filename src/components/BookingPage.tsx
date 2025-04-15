import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import axios from 'axios';
import './BookingPage.css';

interface Booking {
    id?: number;
    customer_name: string;
    service_type: string;
    booking_datetime: string;
    contact_info: string;
}

const BookingPage: React.FC = () => {
    const navigate = useNavigate();
    const auth = getAuth();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [formData, setFormData] = useState<Booking>({
        customer_name: '',
        service_type: '',
        booking_datetime: '',
        contact_info: ''
    });

    const serviceTypes = [
        'Haircut',
        'Hair Coloring',
        'Styling',
        'Treatment',
        'Manicure',
        'Pedicure',
        'Facial',
        'Massage'
    ];

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) {
                navigate('/login');
            } else {
                fetchBookings();
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    const fetchBookings = async () => {
        try {
            const response = await axios.get('https://3f50e881-ad66-4834-9311-f7f4dbdce99a-00-vm40553jknlf.sisko.replit.dev/api/bookings');
            setBookings(response.data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('https://3f50e881-ad66-4834-9311-f7f4dbdce99a-00-vm40553jknlf.sisko.replit.dev//api/bookings', formData);
            fetchBookings();
            setFormData({
                customer_name: '',
                service_type: '',
                booking_datetime: '',
                contact_info: ''
            });
        } catch (error) {
            console.error('Error creating booking:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="booking-container">
            <h2>Book an Appointment</h2>
            <form onSubmit={handleSubmit} className="booking-form">
                <div className="form-group">
                    <label htmlFor="customer_name">Name:</label>
                    <input
                        type="text"
                        id="customer_name"
                        name="customer_name"
                        value={formData.customer_name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="service_type">Service Type:</label>
                    <select
                        id="service_type"
                        name="service_type"
                        value={formData.service_type}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a service</option>
                        {serviceTypes.map((service) => (
                            <option key={service} value={service}>
                                {service}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="booking_datetime">Date and Time:</label>
                    <input
                        type="datetime-local"
                        id="booking_datetime"
                        name="booking_datetime"
                        value={formData.booking_datetime}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="contact_info">Contact Information:</label>
                    <input
                        type="text"
                        id="contact_info"
                        name="contact_info"
                        value={formData.contact_info}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="submit-btn">Book Appointment</button>
            </form>

            <div className="bookings-list">
                <h3>Your Bookings</h3>
                {bookings.map((booking) => (
                    <div key={booking.id} className="booking-card">
                        <h4>{booking.service_type}</h4>
                        <p>Name: {booking.customer_name}</p>
                        <p>Date: {new Date(booking.booking_datetime).toLocaleString()}</p>
                        <p>Contact: {booking.contact_info}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookingPage; 