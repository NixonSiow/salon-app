import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import LandingPage from './components/LandingPage';
import LocationPage from './components/LocationPage';
import Services from './components/Services/Services';
import Gallery from './components/Gallery';
import Offers from './components/Offers/Offers';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/locations" element={<LocationPage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/offers" element={<Offers />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
