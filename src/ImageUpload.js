import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleUpload = () => {
        const formData = new FormData();
        formData.append('image', image);

        axios.post('http://localhost:5000/upload', formData)
            .then(response => {
                console.log(response.data);
                // Handle success
            })
            .catch(error => {
                console.error(error);
                // Handle error
            });
    };

    return (
        <div>
            <input type="file" onChange={handleImageChange} />
            <button onClick={handleUpload}>Upload Image</button>
        </div>
    );
};

export default ImageUpload;
