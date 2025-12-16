import type { Order, OrderStatus } from './types';
import { calcOrderSummary } from './ordersCalc';

export function deriveOrderStatus(order: Order): OrderStatus {
  const s = calcOrderSummary(order);
  if (s.paid <= 0) return 'aberto';
  if (s.open <= 0) return 'pago';
  return 'parcial';
}
