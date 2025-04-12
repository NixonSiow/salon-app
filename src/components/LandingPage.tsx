import React from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage: React.FC = () => {
    return (
        <div className="landing-page">
            <Navbar bg="transparent" expand="lg" className="custom-navbar">
                <Container>
                    <Navbar.Brand href="#home" className="text-light">
                        <img
                            src="/barber.png"
                            alt="SilveryCutSalon"
                            height="40"
                            className="d-inline-block align-top"
                        />
                        {' '}SilveryCut Salon
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link href="#home" className="text-light">HOME</Nav.Link>
                            <Nav.Link href="#offers" className="text-light">OFFERS</Nav.Link>
                            <Nav.Link href="#gallery" className="text-light">GALLERY</Nav.Link>
                            <Link to="/services" className="nav-link text-light">SERVICES</Link>
                            <Link to="/locations" className="nav-link text-light">LOCATIONS</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="hero-section">
                <div className="content-wrapper">
                    <div className="text-section">
                        <h1 className="display-1">
                            HAIR<br />
                            <span className="salon-text">SALON</span>
                        </h1>
                        <h2 className="subtitle">STYLISH HAIR CUTTING!</h2>
                        <p className="description">
                            SilveryCut Salon is where elegance meets artistry. We offer premium hair services in a serene, upscale setting—because your hair deserves nothing less than luxury. Indulge in personalized care, expert styling, and flawless results.
                        </p>
                        <Button variant="primary" className="book-now-btn">BOOK NOW</Button>
                    </div>
                    <div className="image-section">
                        {/* This will be styled with CSS to show the image with the wavy border */}
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default LandingPage; 