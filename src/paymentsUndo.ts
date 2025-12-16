import type { Order } from './types';

export function applyUndoPayment(order: Order): Order {
  if (!order.payments.length) return order;
  return { ...order, payments: order.payments.slice(0, -1) };
}
