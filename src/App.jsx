import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Port from './Pages/Lab.jsx';

function App() {
    return (
    <Router>
      <Routes>
        <Route path="/" element={<Port />} />
      </Routes>
    </Router>
  );
}
export default App;
