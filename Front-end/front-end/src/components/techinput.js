import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Techinput = () => {
    const [techname, setName] = useState('');
    const [cropname, setCrop] = useState('');
    const [location, setLocation] = useState('');
    const [coordinates, setCoordinates] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [image, setImage] = useState(null);

    // Function to handle adding technology details
    const addtech = async () => {
        console.warn('Adding tech with data:', {
            techname,
            cropname,
            location: coordinates,
            phoneNumber,
            image,
        });

        if (coordinates.length !== 2) {
            console.error('Coordinates are not set correctly:', coordinates);
            return;
        }

        const formData = new FormData();
        formData.append('techname', techname);
        formData.append('crop', cropname);
        formData.append('location', JSON.stringify(coordinates));
        formData.append('phoneNumber', phoneNumber);
        if (image) formData.append('image', image);

        try {
            const response = await axios.post('https://miniproject3yearbackend.onrender.com', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Tech added successfully:', response.data);
        } catch (error) {
            console.error('Failed to add tech:', error);
        }
    };

    // Function to convert location to coordinates
    const convertLocationToCoordinates = async () => {
        const apiKey = '5d157c620d9c4089b66b6d74a66d4beb';
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=${apiKey}`;

        try {
            const response = await axios.get(url);
            const results = response.data.results;

            if (results.length > 0) {
                const { lat, lng } = results[0].geometry;
                setCoordinates([lat, lng]);
            } else {
                console.error('No results found for the location');
            }
        } catch (error) {
            console.error('Error fetching coordinates:', error);
        }
    };

    // Function to handle image file selection
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <div className="techcomp">
            <h1>Input Details of Complaint</h1>
            <input
                className="inputbox"
                type="text"
                placeholder="Enter Description of Complaint"
                value={techname}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                className="inputbox"
                type="text"
                placeholder="Enter Type of Waste"
                value={cropname}
                onChange={(e) => setCrop(e.target.value)}
            />
            <input
                className="inputbox"
                type="text"
                placeholder="Enter Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onBlur={convertLocationToCoordinates}
            />
            <input
                className="inputbox"
                type="text"
                placeholder="Enter Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <input
                className="inputbox"
                type="file"
                onChange={handleImageChange}
            />
            <Link to="/">
            <button onClick={addtech} className="appbutton" type="button">
                Send
            </button>
            </Link>
            

            {coordinates.length === 2 && (
                <p>Coordinates: {coordinates[0]}, {coordinates[1]}</p>
            )}
        </div>
    );
};

export default Techinput;
