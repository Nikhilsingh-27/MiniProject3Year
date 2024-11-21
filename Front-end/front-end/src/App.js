import React from 'react';
import './App.css';
import Nav from './components/Nav'; 
import Footer from './components/Footer'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Map from './components/Map'; 
import Techinput from './components/techinput';
import HomePage from './components/homepage';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/profile" element={<h1>Farmer Information</h1>} />
          <Route path="/map" element={<Map />} />
          <Route path="/techinput" element={<Techinput />} />
          <Route path="/info" element={<h1>Technology Info</h1>} />
          <Route path="/compare" element={<h1>Compare</h1>} />
          <Route path="/logout" element={<h1>Logout</h1>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
