import React, { useState } from 'react';
import { Container, Nav, Navbar, Button, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import './LandingPage.css';

const LandingPage: React.FC = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);

    const handleClose = () => {
        setShowLoginModal(false);
        setError('');
        setEmail('');
        setPassword('');
    };

    const handleShow = () => setShowLoginModal(true);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            if (isSignUp) {
                await createUserWithEmailAndPassword(auth, email, password);
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
            handleClose();
        } catch (error: any) {
            setError(error.message);
        }
    };

    const toggleAuthMode = () => {
        setIsSignUp(!isSignUp);
        setError('');
    };

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
                            <Link to="/gallery" className="nav-link text-light">GALLERY</Link>
                            <Link to="/services" className="nav-link text-light">SERVICES</Link>
                            <Link to="/locations" className="nav-link text-light">LOCATIONS</Link>
                            <Button
                                variant="link"
                                className="text-light user-icon-btn"
                                onClick={handleShow}
                            >
                                <i className="bi bi-person-circle"></i>
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Modal show={showLoginModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{isSignUp ? 'Sign Up' : 'Login'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <Form onSubmit={handleAuth}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" className="w-100" type="submit">
                            {isSignUp ? 'Sign Up' : 'Login'}
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="link" className="text-decoration-none" onClick={toggleAuthMode}>
                        {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
                    </Button>
                </Modal.Footer>
            </Modal>

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
                        <Link to="/services">
                            <Button variant="primary" className="book-now-btn">BOOK NOW</Button>
                        </Link>
                    </div>
                    <div className="image-section">
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default LandingPage; 