import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen'; // <--- Import this

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/login" element={<h1>Login Page</h1>} />
            <Route path="/register" element={<RegisterScreen />} /> 
          </Routes>
        </Container>
      </main>
    </Router>
  );
}

export default App;