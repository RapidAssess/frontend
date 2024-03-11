import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImagesDisplay = () => {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        if (userId) {
            const fetchImages = async () => {
                setIsLoading(true);
                try {
                    const response = await axios.get(`/images/${userId}`);
                    setImages(response.data.images || []);
                    console.log("Images:");
                    console.log(response.data.images);
                } catch (error) {
                    console.error("Failed to fetch images:", error);
                    setImages([]);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchImages();
        } else {
            console.log("No user ID found. Please login.");
        }
    }, []); 
    if (isLoading) {
        return <p>Loading images...</p>;
    }

    return (
        <div>
            {images.length > 0 ? (
                <div>
                    <p>{`Total images: ${images.length}`}</p>
                    {images.map((image, index) => (
                        <div key={index}>
                            <h3>{image.name}</h3>
                            <img src={`data:image/jpeg;base64,${image.data}`} alt="Saved" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                        </div>
                    ))}
                </div>
            ) : (
                <p>No images found.</p>
            )}
        </div>
    );
};

export default ImagesDisplay;
