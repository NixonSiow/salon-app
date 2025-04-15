import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import BookingModal from '../BookingModal';
import './Offers.css';

const Offers: React.FC = () => {
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [selectedService, setSelectedService] = useState<string>('');

    const handleBookingClick = (serviceName: string) => {
        setSelectedService(serviceName);
        setShowBookingModal(true);
    };

    return (
        <div className="offers-container">
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
            <Container className="py-5">
                <h1 className="offers-title">
                    Special Offers
                    <span>Exclusive Deals</span>
                </h1>
                <p className="offers-description">
                    Discover our exclusive deals and promotions designed to enhance your salon experience.
                </p>

                <Row xs={1} md={2} className="g-4 mb-5">
                    <Col>
                        <Card className="offer-card">
                            <Card.Body>
                                <div className="offer-badge">SAVE 20%</div>
                                <Card.Title className="offer-title">Hair Cutting Special</Card.Title>
                                <Card.Text className="offer-details">
                                    <ul>
                                        <li>Men's Haircut & Styling</li>
                                        <li>Women's Haircut & Styling</li>
                                        <li>Kids Haircut (Under 12)</li>
                                    </ul>
                                </Card.Text>
                                <div className="offer-price">
                                    <span className="original-price">RM 80</span>
                                    <span className="discounted-price">RM 64</span>
                                </div>
                                <Button
                                    variant="outline-light"
                                    className="book-now-btn"
                                    onClick={() => handleBookingClick('Hair Cutting Special')}
                                >
                                    Book Now
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <Card className="offer-card">
                            <Card.Body>
                                <div className="offer-badge">SAVE 25%</div>
                                <Card.Title className="offer-title">Hair Coloring Package</Card.Title>
                                <Card.Text className="offer-details">
                                    <ul>
                                        <li>Full Hair Coloring</li>
                                        <li>Highlights or Lowlights</li>
                                        <li>Root Touch-up</li>
                                    </ul>
                                </Card.Text>
                                <div className="offer-price">
                                    <span className="original-price">RM 250</span>
                                    <span className="discounted-price">RM 187</span>
                                </div>
                                <Button
                                    variant="outline-light"
                                    className="book-now-btn"
                                    onClick={() => handleBookingClick('Hair Coloring Package')}
                                >
                                    Book Now
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <Card className="offer-card">
                            <Card.Body>
                                <div className="offer-badge">SAVE 30%</div>
                                <Card.Title className="offer-title">Manicure Deluxe</Card.Title>
                                <Card.Text className="offer-details">
                                    <ul>
                                        <li>Nail Shaping</li>
                                        <li>Cuticle Care</li>
                                        <li>Hand Massage</li>
                                        <li>Gel Polish Application</li>
                                    </ul>
                                </Card.Text>
                                <div className="offer-price">
                                    <span className="original-price">RM 120</span>
                                    <span className="discounted-price">RM 84</span>
                                </div>
                                <Button
                                    variant="outline-light"
                                    className="book-now-btn"
                                    onClick={() => handleBookingClick('Manicure Deluxe')}
                                >
                                    Book Now
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <Card className="offer-card">
                            <Card.Body>
                                <div className="offer-badge">SAVE 30%</div>
                                <Card.Title className="offer-title">Pedicure Deluxe</Card.Title>
                                <Card.Text className="offer-details">
                                    <ul>
                                        <li>Foot Soak</li>
                                        <li>Callus Removal</li>
                                        <li>Foot Massage</li>
                                        <li>Gel Polish Application</li>
                                    </ul>
                                </Card.Text>
                                <div className="offer-price">
                                    <span className="original-price">RM 150</span>
                                    <span className="discounted-price">RM 105</span>
                                </div>
                                <Button
                                    variant="outline-light"
                                    className="book-now-btn"
                                    onClick={() => handleBookingClick('Pedicure Deluxe')}
                                >
                                    Book Now
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <div className="offer-terms">
                    <p>* Offers valid until December 31, 2025. Cannot be combined with other promotions.</p>
                    <p>* Please book in advance to secure your appointment.</p>
                </div>
            </Container>

            <BookingModal
                show={showBookingModal}
                onHide={() => setShowBookingModal(false)}
                serviceType={selectedService}
            />
        </div>
    );
};

export default Offers; 