import React from 'react';
// Importing the CSS file for styling

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>Welcome to the Citizen Complaint Portal</h1>
          <p>
            A platform to raise complaints, track pollution, and improve the environment around you.
          </p>
          <a href="/map" className="hero-btn">Explore the Map</a>
        </div>
        <div className="hero-image">
        <img src="/images/boys.jpg" alt="Hero" /> 
         </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Our Features</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <img src="https://via.placeholder.com/100" alt="Complaint" />
            <h3>Submit Complaints</h3>
            <p>Report pollution, waste, and other environmental issues easily.</p>
          </div>
          <div className="feature-card">
            <img src="https://via.placeholder.com/100" alt="Map" />
            <h3>Track Complaints on the Map</h3>
            <p>See complaints from other citizens and monitor the areas around you.</p>
          </div>
          <div className="feature-card">
            <img src="https://via.placeholder.com/100" alt="Action" />
            <h3>Take Action</h3>
            <p>Help raise awareness and track the progress of complaints.</p>
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default HomePage;
