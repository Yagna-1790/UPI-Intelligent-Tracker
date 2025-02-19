export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  amount: number;
  category: string;
  description: string;
  merchant_name: string;
  transaction_date: string;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  merchant_id: string;
  created_at: string;
}

export interface Merchant {
  id: string;
  name: string;
  upi_id: string;
  created_at: string;
}
