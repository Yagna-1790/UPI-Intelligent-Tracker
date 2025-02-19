import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import QRScanner from './pages/QRScanner';
import MerchantDashboard from './pages/MerchantDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/scan" element={<QRScanner />} />
            <Route path="/merchant" element={<MerchantDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;