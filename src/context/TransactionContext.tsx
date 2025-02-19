import React, { createContext, useContext, useState, useEffect } from 'react';

interface Transaction {
  id: string;
  merchant: string;
  amount: number;
  category: string;
  date: string;
  status: string;
}

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  totalSpent: number;
  thisMonthSpent: number;
  transactionCount: number;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export function TransactionProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransaction = (transaction: Transaction) => {
    setTransactions(prev => [transaction, ...prev]);
  };

  const totalSpent = transactions.reduce((sum, t) => sum + t.amount, 0);
  
  const thisMonthSpent = transactions.filter(t => {
    const transactionDate = new Date(t.date);
    const currentDate = new Date();
    return transactionDate.getMonth() === currentDate.getMonth() &&
           transactionDate.getFullYear() === currentDate.getFullYear();
  }).reduce((sum, t) => sum + t.amount, 0);

  return (
    <TransactionContext.Provider value={{
      transactions,
      addTransaction,
      totalSpent,
      thisMonthSpent,
      transactionCount: transactions.length
    }}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
}
