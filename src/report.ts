import type { AppState, PaymentMethod } from "./types";

export function money(n: number) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function ymd(iso: string) { return iso.slice(0, 10); }
function ym(iso: string) { return iso.slice(0, 7); }

export type ReportRow = {
  key: string; // YYYY-MM-DD ou YYYY-MM
  countSales: number;

  revenue: number; // soma(qty*unitPrice)
  cost: number;    // soma(qty*unitCost)
  profit: number;  // revenue - cost

  byPaymentRevenue: Record<PaymentMethod, number>;
};

function buildRow(key: string): ReportRow {
  return {
    key,
    countSales: 0,
    revenue: 0,
    cost: 0,
    profit: 0,
    byPaymentRevenue: { PIX: 0, DINHEIRO: 0, CARTAO: 0 },
  };
}

export function reportByDay(state: AppState): ReportRow[] {
  const map = new Map<string, ReportRow>();
  for (const s of state.sales) {
    const k = ymd(s.createdAtISO);
    const row = map.get(k) ?? buildRow(k);

    const rev = s.qty * s.unitPrice;
    const cst = s.qty * s.unitCost;

    row.countSales += 1;
    row.revenue += rev;
    row.cost += cst;
    row.profit = row.revenue - row.cost;
    row.byPaymentRevenue[s.paymentMethod] += rev;

    map.set(k, row);
  }
  return Array.from(map.values()).sort((a, b) => b.key.localeCompare(a.key));
}

export function reportByMonth(state: AppState): ReportRow[] {
  const map = new Map<string, ReportRow>();
  for (const s of state.sales) {
    const k = ym(s.createdAtISO);
    const row = map.get(k) ?? buildRow(k);

    const rev = s.qty * s.unitPrice;
    const cst = s.qty * s.unitCost;

    row.countSales += 1;
    row.revenue += rev;
    row.cost += cst;
    row.profit = row.revenue - row.cost;
    row.byPaymentRevenue[s.paymentMethod] += rev;

    map.set(k, row);
  }
  return Array.from(map.values()).sort((a, b) => b.key.localeCompare(a.key));
}

export function toCSV(rows: ReportRow[]): string {
  const header = [
    "periodo",
    "vendas",
    "receita",
    "custo",
    "lucro",
    "receita_pix",
    "receita_dinheiro",
    "receita_cartao",
  ];
  const lines = [header.join(",")];

  for (const r of rows) {
    lines.push(
      [
        r.key,
        String(r.countSales),
        r.revenue.toFixed(2),
        r.cost.toFixed(2),
        r.profit.toFixed(2),
        r.byPaymentRevenue.PIX.toFixed(2),
        r.byPaymentRevenue.DINHEIRO.toFixed(2),
        r.byPaymentRevenue.CARTAO.toFixed(2),
      ].join(",")
    );
  }
  return lines.join("\n");
}

export function downloadCSV(filename: string, csv: string) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}