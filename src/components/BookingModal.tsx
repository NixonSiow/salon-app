import React, { useState, ChangeEvent } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { ENDPOINTS } from '../config/api';

interface BookingModalProps {
    show: boolean;
    onHide: () => void;
    serviceType?: string;
}

interface BookingFormData {
    customer_name: string;
    service_type: string;
    booking_datetime: string;
    contact_info: string;
}

const BookingModal: React.FC<BookingModalProps> = ({ show, onHide, serviceType }) => {
    const [formData, setFormData] = useState<BookingFormData>({
        customer_name: '',
        service_type: serviceType || '',
        booking_datetime: '',
        contact_info: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await fetch(ENDPOINTS.BOOKINGS, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            setSuccess('Booking created successfully!');
            setTimeout(() => {
                onHide();
                setFormData({
                    customer_name: '',
                    service_type: serviceType || '',
                    booking_datetime: '',
                    contact_info: ''
                });
            }, 2000);
        } catch (error) {
            console.error('Error creating booking:', error);
            setError('Failed to create booking. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Book an Appointment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="customer_name"
                            value={formData.customer_name}
                            onChange={handleChange}
                            required
                            placeholder="Enter your full name"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Service Type</Form.Label>
                        <Form.Select
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
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Date and Time</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            name="booking_datetime"
                            value={formData.booking_datetime}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Contact Information</Form.Label>
                        <Form.Control
                            type="text"
                            name="contact_info"
                            value={formData.contact_info}
                            onChange={handleChange}
                            required
                            placeholder="Phone number or email"
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                        {loading ? 'Processing...' : 'Book Appointment'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default BookingModal; 