import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { IndianRupee, TrendingUp, ShoppingBag, AlertCircle } from 'lucide-react';
import { useTransactions } from '../context/TransactionContext';

function Dashboard() {
  const { totalSpent, thisMonthSpent, transactionCount, transactions } = useTransactions();

  const categoryData = transactions.reduce((acc: any[], transaction) => {
    const existingCategory = acc.find(item => item.category === transaction.category);
    if (existingCategory) {
      existingCategory.amount += transaction.amount;
    } else {
      acc.push({ category: transaction.category, amount: transaction.amount });
    }
    return acc;
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Financial Dashboard</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Spent</p>
              <p className="text-2xl font-bold text-gray-900">₹{totalSpent}</p>
            </div>
            <IndianRupee className="h-8 w-8 text-indigo-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">₹{thisMonthSpent}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Transactions</p>
              <p className="text-2xl font-bold text-gray-900">{transactionCount}</p>
            </div>
            <ShoppingBag className="h-8 w-8 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Spending by Category</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

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
            <li>Your highest spending category is {categoryData[0]?.category || 'N/A'}</li>
            <li>You've made {transactionCount} transactions in total</li>
            <li>This month's spending: ₹{thisMonthSpent}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
