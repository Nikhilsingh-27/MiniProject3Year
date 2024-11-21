import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import customIconUrl from '../marker.png';

const Map = () => {
    const [technologies, setTechnologies] = useState([]);
   
    const getTechnologies = async () => {
        try {
            let result = await fetch('https://miniproject3yearbackend.onrender.com/map');
            result = await result.json();
            setTechnologies(result);
        } catch (error) {
            console.error('Error fetching technologies:', error);
        }
    };

    useEffect(() => {
        getTechnologies();
    }, []);

    const handleInputChange = async (event) => {
        const key = event.target.value;

        if (key) {
            try {
                let result = await fetch(`https://miniproject3yearbackend.onrender.com/search/${key}`);
                result = await result.json();
                setTechnologies(result);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        } else {
           
            await getTechnologies();
        }
    };

    const defaultIcon = new L.Icon({
        iconUrl: customIconUrl,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });

    const position = [28.5706333, 77.3272147];

    return (
        <div style={{ height: '76vh' }}>
            <div style={{ marginBottom: '10px' }}>
                <input
                    className="search-tech"
                    type="text"
                    placeholder="Search Crop"
                    onChange={handleInputChange}
                />
            </div>
            <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {technologies.map((tech, index) => (
                    <Marker key={index} position={[tech.location[0], tech.location[1]]} icon={defaultIcon}>
                        <Popup>
                            Discription: {tech.techname}<br />
                            Type: {tech.crop}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default Map;
