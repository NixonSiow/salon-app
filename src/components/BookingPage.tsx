import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { ENDPOINTS } from '../config/api';
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
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [editingBooking, setEditingBooking] = useState<Booking | null>(null);

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
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(ENDPOINTS.BOOKINGS);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setBookings(data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
            setError('Failed to fetch bookings. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (booking: Booking) => {
        setEditingBooking(booking);
        setFormData({
            customer_name: booking.customer_name,
            service_type: booking.service_type,
            booking_datetime: booking.booking_datetime.slice(0, 16), // Format for datetime-local input
            contact_info: booking.contact_info
        });
        // Scroll to form
        document.querySelector('.booking-form')?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleDelete = async (bookingId: number) => {
        if (!window.confirm('Are you sure you want to delete this booking?')) {
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${ENDPOINTS.BOOKINGS}/${bookingId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            await fetchBookings();
            setSuccess('Booking deleted successfully!');
        } catch (error) {
            console.error('Error deleting booking:', error);
            setError('Failed to delete booking. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);
        console.log('Submitting to endpoint:', ENDPOINTS.BOOKINGS);
        try {
            const url = editingBooking
                ? `${ENDPOINTS.BOOKINGS}/${editingBooking.id}`
                : ENDPOINTS.BOOKINGS;

            const response = await fetch(url, {
                method: editingBooking ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                console.error('Response not OK:', response.status, response.statusText);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            await fetchBookings();
            setFormData({
                customer_name: '',
                service_type: '',
                booking_datetime: '',
                contact_info: ''
            });
            setEditingBooking(null);
            setSuccess(editingBooking ? 'Booking updated successfully!' : 'Booking created successfully!');
        } catch (error) {
            console.error('Error creating booking:', error);
            setError(editingBooking ? 'Failed to update booking. Please try again later.' : 'Failed to create booking. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="booking-container">
            <div className="booking-header">
                <Link to="/" className="logo-link">
                    <img
                        src="/barber.png"
                        alt="SilveryCutSalon"
                        height="40"
                        className="booking-logo"
                    />
                    <span className="logo-text">SilveryCut Salon</span>
                </Link>
            </div>

            <h2>Book an Appointment</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
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
                        placeholder="Enter your full name"
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
                        placeholder="Phone number or email"
                    />
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? 'Processing...' : 'Book Appointment'}
                </button>
            </form>

            <div className="bookings-list">
                <h3>Bookings</h3>
                {loading ? (
                    <p>Loading bookings...</p>
                ) : bookings.length === 0 ? (
                    <p>No bookings found.</p>
                ) : (
                    <div className="booking-cards">
                        {bookings.map((booking) => (
                            <div key={booking.id} className="booking-card">
                                <div className="booking-card-header">
                                    <h4>{booking.service_type}</h4>
                                    <div className="booking-card-actions">
                                        <button
                                            className="edit-btn"
                                            onClick={() => handleEdit(booking)}
                                            title="Edit booking"
                                        >
                                            <i className="bi bi-pencil"></i>
                                        </button>
                                        <button
                                            className="delete-btn"
                                            onClick={() => handleDelete(booking.id!)}
                                            title="Delete booking"
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="booking-card-body">
                                    <p><strong>Name:</strong> {booking.customer_name}</p>
                                    <p><strong>Date:</strong> {formatDate(booking.booking_datetime)}</p>
                                    <p><strong>Contact:</strong> {booking.contact_info}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingPage; 