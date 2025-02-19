import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { IndianRupee, TrendingUp, ShoppingBag, AlertCircle } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const mockData = [
  { category: 'Food', amount: 2500 },
  { category: 'Shopping', amount: 4200 },
  { category: 'Travel', amount: 1800 },
  { category: 'Bills', amount: 3100 },
];

function Dashboard() {
  const [showQR, setShowQR] = useState(false);
  const demoUpiUrl = "upi://pay?pa=merchant@upi&pn=DemoMerchant&mc=1234&tid=TXN001&tr=INV123&tn=DemoProduct&am=100&cu=INR";

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Financial Dashboard</h1>
        <button
          onClick={() => setShowQR(!showQR)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          {showQR ? 'Hide QR' : 'Show Demo QR'}
        </button>
      </div>

      {showQR && (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Demo Payment QR Code</h2>
          <div className="flex justify-center mb-4">
            <QRCodeSVG
              value={demoUpiUrl}
              size={200}
              includeMargin
              level="H"
            />
          </div>
          <p className="text-sm text-gray-600">Scan this QR code with any UPI app to test the payment flow</p>
          <p className="text-sm font-medium text-indigo-600 mt-2">Amount: ₹100</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stats Cards */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Spent</p>
              <p className="text-2xl font-bold text-gray-900">₹11,600</p>
            </div>
            <IndianRupee className="h-8 w-8 text-indigo-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">₹4,200</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Transactions</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
            <ShoppingBag className="h-8 w-8 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Spending Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Spending by Category</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-2 mb-4">
          <AlertCircle className="h-6 w-6 text-indigo-600" />
          <h2 className="text-xl font-semibold text-gray-900">AI Insights</h2>
        </div>
        <div className="space-y-4">
          <p className="text-gray-700">
            Based on your spending patterns:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Your food expenses are 15% higher than last month</li>
            <li>You might exceed your shopping budget this month</li>
            <li>Consider setting aside ₹5,000 for upcoming bill payments</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;