import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Link } from 'react-router-dom';
import './LocationPage.css';

const LocationPage: React.FC = () => {
    // Replace these coordinates with your salon's actual location
    const salonLocation = {
        lat: 3.110897030073094,
        lng: 101.68492708650535
    };

    const mapContainerStyle = {
        width: '100%',
        height: '400px'
    };

    return (
        <div className="location-page">
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
                <h1 className="text-center mb-5">Our Location</h1>
                <Row>
                    <Col md={6}>
                        <Card className="mb-4">
                            <Card.Body>
                                <Card.Title>SilveryCut Salon</Card.Title>
                                <Card.Text>
                                    <strong>Address:</strong><br />
                                    19, Jalan Bukit Desa 5, Off, Old Klang Rd<br />
                                    58100 Kuala Lumpur, Federal Territory of Kuala Lumpur<br /><br />
                                    <strong>Business Hours:</strong><br />
                                    Tuesday - Saturday: 10:00 AM - 6:30 PM<br />
                                    Sunday: 10:00 AM - 6:00 PM<br />
                                    Monday:	Closed<br /><br />
                                    <strong>Contact:</strong><br />
                                    Phone: +6010-205 9889<br />
                                    Email: silverycut@yahoo.com.sg
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <LoadScript googleMapsApiKey="AIzaSyBEeFgwwUJnlsTomxPOQLfQ8XiSDNQLLn0">
                            <GoogleMap
                                mapContainerStyle={mapContainerStyle}
                                center={salonLocation}
                                zoom={15}
                            >
                                <Marker position={salonLocation} />
                            </GoogleMap>
                        </LoadScript>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default LocationPage; 