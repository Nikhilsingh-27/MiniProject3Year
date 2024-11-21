const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
require('./database/config'); // Assuming your MongoDB config is in this file

const app = express();
const Technology = require('./models/technology'); // Technology schema

// Middleware
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, 'uploads');
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({ storage });

// Insert dummy data function (for testing)
async function insert() {
    await Technology.create({
        techname: 'Row Planter',
        crop: 'Pumpkins',
        location: [47.7511, -120.7401],
        phoneNumber: '123-456-7890',
        image: null, // No image for this record
    });
}

// API Endpoints

// Test endpoint
app.get('/', (req, resp) => {
    resp.send('App is working');
});

// Add new technology with image and phone number
app.post('/techinput', upload.single('image'), async (req, resp) => {
    try {
        const { techname, crop, location, phoneNumber } = req.body;
        const imagePath = req.file ? req.file.path : null;

        const newTechnology = new Technology({
            techname,
            crop,
            location: JSON.parse(location), // Assuming location is sent as a JSON string
            phoneNumber,
            image: imagePath,
        });

        const result = await newTechnology.save();
        resp.status(201).send(result);
    } catch (error) {
        console.error('Error adding technology:', error);
        resp.status(500).send({ message: 'Internal Server Error' });
    }
});

// Get all technologies
app.get('/map', async (req, resp) => {
    try {
        const tech = await Technology.find();
        if (tech.length > 0) {
            resp.send(tech);
        } else {
            resp.send({ result: 'No technology found' });
        }
    } catch (error) {
        console.error('Error fetching technologies:', error);
        resp.status(500).send({ message: 'Internal Server Error' });
    }
});

// Get technologies by crop name
app.get('/map/:crop', async (req, resp) => {
    try {
        const crop = req.params.crop;

        if (!crop) {
            return resp.status(400).json({ message: 'Crop name is required' });
        }

        const results = await Technology.find({ crop: crop });
        if (results.length > 0) {
            resp.json(results);
        } else {
            resp.status(404).json({ message: 'No records found' });
        }
    } catch (error) {
        console.error('Error fetching technologies:', error);
        resp.status(500).json({ message: 'Internal Server Error' });
    }
});

// Search technologies by keyword
app.get('/search/:key', async (req, res) => {
    try {
        const searchKey = req.params.key;

        const results = await Technology.find({
            $or: [
                { crop: { $regex: searchKey, $options: 'i' } },
                { techname: { $regex: searchKey, $options: 'i' } },
            ],
        });

        res.json(results);
    } catch (error) {
        console.error('Error during search:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
