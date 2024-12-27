import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Portfolio from './Pages/Portfolio.jsx';
import Projects from './Pages/Projects.jsx';
import AboutMe from './Pages/About.jsx';
import Contact from './Pages/Contact.jsx';
//import Transition from './Components/Transition.jsx';
import Navbar from './Components/Navbar/';

function App() {
    return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<AboutMe />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}
export default App;
