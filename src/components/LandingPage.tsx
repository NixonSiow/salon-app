import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar, Button, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import BookingModal from './BookingModal';
import './LandingPage.css';

const LandingPage: React.FC = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

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
            await signInWithEmailAndPassword(auth, email, password);
            handleClose();
        } catch (error: any) {
            setError(error.message);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const handleBookingClick = () => {
        if (user) {
            // Navigate to booking page for logged-in users
            window.location.href = '/booking';
        } else {
            // Show booking modal for non-logged-in users
            setShowBookingModal(true);
        }
    };

    return (
        <div className="landing-page">
            <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
                <Container>
                    <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
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
                            <Nav.Link as={Link} to="/services" className="text-light">SERVICES</Nav.Link>
                            <Nav.Link as={Link} to="/offers" className="text-light">OFFERS</Nav.Link>
                            <Nav.Link as={Link} to="/gallery" className="text-light">GALLERY</Nav.Link>
                            <Nav.Link as={Link} to="/locations" className="text-light">LOCATIONS</Nav.Link>

                            {user ? (
                                <>
                                    <Link to="/booking" className="nav-link text-light">BOOKING</Link>
                                    <Button
                                        variant="link"
                                        className="text-light user-icon-btn"
                                        onClick={handleLogout}
                                    >
                                        <i className="bi bi-box-arrow-right"></i> Logout
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    variant="link"
                                    className="text-light user-icon-btn"
                                    onClick={handleShow}
                                >
                                    <i className="bi bi-person-circle"></i> Admin
                                </Button>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Modal show={showLoginModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
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
                            Login
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <div className="w-100 text-center">
                        <p className="text-muted">Please contact the salon for account creation</p>
                    </div>
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
                        <Button variant="primary" className="book-now-btn" onClick={handleBookingClick}>
                            {user ? 'BOOK NOW' : 'BOOK APPOINTMENT'}
                        </Button>
                    </div>
                    <div className="image-section">
                    </div>
                </div>
            </Container>

            <BookingModal
                show={showBookingModal}
                onHide={() => setShowBookingModal(false)}
            />
        </div>
    );
};

export default LandingPage; 