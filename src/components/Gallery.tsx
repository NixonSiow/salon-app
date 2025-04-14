import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Alert, Button } from 'react-bootstrap';
import { storage } from '../firebase';
import { ref, getDownloadURL, listAll } from 'firebase/storage';
import './Gallery.css';

const Gallery: React.FC = () => {
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [debugInfo, setDebugInfo] = useState<string[]>([]);

    // Function to add debug information
    const addDebugInfo = (message: string) => {
        console.log(message);
        setDebugInfo(prev => [...prev, `${new Date().toISOString().split('T')[1].split('.')[0]}: ${message}`]);
    };

    useEffect(() => {
        // Set a timeout to prevent infinite loading
        const timeoutId = setTimeout(() => {
            if (loading) {
                addDebugInfo('Operation timed out after 15 seconds');
                setError('The operation timed out. This could be due to Firebase Storage permissions or network issues.');
                setLoading(false);
            }
        }, 15000); // 15 seconds timeout

        const fetchImages = async () => {
            try {
                setLoading(true);
                setDebugInfo([]);
                addDebugInfo('Starting to fetch images from Firebase Storage...');

                // Create a reference to the gallery folder
                const galleryRef = ref(storage, 'gallery/');
                addDebugInfo('Created reference to gallery folder');

                // List all items in the gallery folder
                const result = await listAll(galleryRef);
                addDebugInfo(`Found ${result.items.length} items in the gallery folder`);

                if (result.items.length === 0) {
                    addDebugInfo('No images found in the gallery folder');
                    setError('No images found in the gallery folder. Please upload some images to Firebase Storage.');
                    setLoading(false);
                    return;
                }

                // Get download URLs for all items
                const imageUrls: string[] = [];

                for (const item of result.items) {
                    try {
                        const url = await getDownloadURL(item);
                        addDebugInfo(`Got download URL for: ${item.name}`);
                        imageUrls.push(url);
                    } catch (err: any) {
                        addDebugInfo(`Error getting download URL for ${item.name}: ${err.message}`);
                        // Continue with the next image even if this one fails
                    }
                }

                // Set the images
                setImages(imageUrls);
                addDebugInfo(`Successfully got ${imageUrls.length} download URLs`);

                // If we found no images, set an error
                if (imageUrls.length === 0) {
                    setError('No images could be loaded. Please check if the images exist in Firebase Storage.');
                }

                setLoading(false);
            } catch (err: any) {
                console.error('Error fetching images:', err);
                addDebugInfo(`Error in fetchImages: ${err.message}`);
                setError(`Failed to fetch images: ${err.message}`);
                setLoading(false);
            }
        };

        fetchImages();

        // Clean up the timeout
        return () => clearTimeout(timeoutId);
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
            <Container className="py-5">
                <h1 className="text-center mb-5">Our Gallery</h1>

                {loading ? (
                    <div className="text-center">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        <p className="mt-3">Loading gallery images...</p>

                        {/* Debug information */}
                        {debugInfo.length > 0 && (
                            <div className="mt-4 text-start">
                                <h5>Debug Information:</h5>
                                <pre className="bg-dark text-light p-3 rounded" style={{ maxHeight: '200px', overflow: 'auto' }}>
                                    {debugInfo.join('\n')}
                                </pre>
                            </div>
                        )}
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

                        {/* Debug information */}
                        {debugInfo.length > 0 && (
                            <div className="mt-4 text-start">
                                <h5>Debug Information:</h5>
                                <pre className="bg-dark text-light p-3 rounded" style={{ maxHeight: '200px', overflow: 'auto' }}>
                                    {debugInfo.join('\n')}
                                </pre>
                            </div>
                        )}
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
                                            console.error(`Error loading image: ${url}`);
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