import React from 'react';
import { Link } from 'react-router-dom';
import { Wallet, QrCode, Receipt, Store } from 'lucide-react';

function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Wallet className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">UPI Tracker</span>
          </Link>
          
          <div className="flex space-x-8">
            <Link to="/" className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600">
              <Receipt className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link to="/transactions" className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600">
              <Receipt className="h-5 w-5" />
              <span>Transactions</span>
            </Link>
            <Link to="/scan" className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600">
              <QrCode className="h-5 w-5" />
              <span>Scan QR</span>
            </Link>
            <Link to="/merchant" className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600">
              <Store className="h-5 w-5" />
              <span>Merchant</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
