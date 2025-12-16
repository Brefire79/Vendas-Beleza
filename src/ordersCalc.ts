import type { Order, OrderSummary } from './types';

export function calcOrderSummary(order: Order): OrderSummary {
  const total = order.items.reduce((acc, it) => acc + (Number(it.qty) || 0) * (Number(it.price) || 0), 0);
  const paid = order.payments.reduce((acc, p) => acc + (Number(p.value) || 0), 0);
  const open = Math.max(0, total - paid);
  return { total, paid, open };
}
