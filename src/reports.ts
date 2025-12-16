import type { Order } from './types';
import { calcOrderSummary } from './ordersCalc';

function formatBRL(v: number) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function generateDailyReportText(orders: Order[]): string {
  const lines: string[] = [];
  lines.push('Relatório de Vendas');
  lines.push(`Gerado em: ${new Date().toLocaleString('pt-BR')}`);
  lines.push('');

  let total = 0;
  let paid = 0;

  for (const o of orders) {
    const s = calcOrderSummary(o);
    total += s.total;
    paid += s.paid;
    lines.push(`• ${o.customerName || 'Sem nome'} — Total ${formatBRL(s.total)} — Pago ${formatBRL(s.paid)}`);
  }

  lines.push('');
  lines.push(`TOTAL: ${formatBRL(total)}`);
  lines.push(`PAGO:  ${formatBRL(paid)}`);
  lines.push(`ABERTO:${formatBRL(Math.max(0, total - paid))}`);

  return lines.join('\n');
}
