import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Alert, Button } from 'react-bootstrap';
import { storage } from '../firebase';
import { ref, getDownloadURL, listAll } from 'firebase/storage';
import { Link } from 'react-router-dom';
import './Gallery.css';

const Gallery: React.FC = () => {
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                setLoading(true);
                setError(null);

                // Create a reference to the gallery folder
                const galleryRef = ref(storage, 'gallery/');

                // List all items in the gallery folder
                const result = await listAll(galleryRef);

                if (result.items.length === 0) {
                    setError('No images found in the gallery folder. Please upload some images to Firebase Storage.');
                    setLoading(false);
                    return;
                }

                // Process all items in parallel for better performance
                const urlPromises = result.items.map(async (item) => {
                    try {
                        const url = await getDownloadURL(item);
                        return { name: item.name, url };
                    } catch (err) {
                        return { name: item.name, url: null };
                    }
                });

                // Wait for all promises to resolve
                const urlResults = await Promise.all(urlPromises);

                // Filter out any items that failed to get a URL
                const validUrls = urlResults
                    .filter(item => item.url !== null)
                    .map(item => item.url as string);

                // Set the images
                setImages(validUrls);

                // If we found no images, set an error
                if (validUrls.length === 0) {
                    setError('No images could be loaded. Please check if the images exist in Firebase Storage.');
                }

                setLoading(false);
            } catch (err) {
                console.error('Error fetching images:', err);
                setError('Failed to fetch images. Please try again later.');
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    // Function to retry loading images
    const retryLoading = () => {
        setLoading(true);
        setError(null);
        setImages([]);
        // Re-run the useEffect
        window.location.reload();
    };

    return (
        <div className="gallery-page">
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
                <h1 className="text-center mb-5">Our Gallery</h1>

                {loading ? (
                    <div className="text-center">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        <p className="mt-3">Loading gallery images...</p>
                    </div>
                ) : error ? (
                    <Alert variant="danger" className="text-center">
                        <h4>Error Loading Gallery</h4>
                        <p>{error}</p>
                        <hr />
                        <p className="mb-0">
                            To fix this issue, you need to update your Firebase Storage rules to allow access.
                            Go to the Firebase Console, navigate to Storage, and update the rules to:
                        </p>
                        <pre className="bg-dark text-light p-3 mt-3 rounded">
                            {`rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}`}
                        </pre>
                        <Button variant="primary" className="mt-3" onClick={retryLoading}>
                            Retry Loading
                        </Button>
                    </Alert>
                ) : images.length === 0 ? (
                    <div className="text-center">
                        <p>No images found in the gallery.</p>
                        <p>Please make sure you have uploaded images to the 'gallery' folder in Firebase Storage.</p>
                        <Button variant="primary" className="mt-3" onClick={retryLoading}>
                            Retry Loading
                        </Button>
                    </div>
                ) : (
                    <Row xs={1} md={2} lg={3} className="g-4">
                        {images.map((url, index) => (
                            <Col key={index}>
                                <Card className="gallery-card h-100">
                                    <Card.Img
                                        variant="top"
                                        src={url}
                                        alt={`Gallery image ${index + 1}`}
                                        className="gallery-image"
                                        onError={(e) => {
                                            e.currentTarget.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                                        }}
                                    />
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
        </div>
    );
};

export default Gallery; 