export type PaymentMethod = 'pix' | 'dinheiro' | 'cartao' | 'transferencia' | 'outro';

export type OrderItem = {
  id: string;
  name: string;
  qty: number;
  price: number;
};

export type OrderPayment = {
  id: string;
  method: PaymentMethod;
  value: number;
  at: string; // ISO
};

export type Order = {
  id: string;
  createdAt: string; // ISO
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  payments: OrderPayment[];
  notes?: string;
};

export type OrderSummary = {
  total: number;
  paid: number;
  open: number;
};

export type OrderStatus = 'aberto' | 'parcial' | 'pago';
