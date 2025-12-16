import { useEffect, useMemo, useState } from 'react';
import { formatPhoneBR } from './phoneMask';
import { loadOrders, saveOrders } from './storage';
import type { Order, PaymentMethod } from './types';
import { calcOrderSummary } from './ordersCalc';
import { generateDailyReportText } from './reports';
import { applyUndoPayment } from './paymentsUndo';
import { deriveOrderStatus } from './ordersStatus';
import { usePwaInstallPrompt } from './pwaInstall';
import { useServiceWorkerUpdate } from './swUpdate';

const emptyOrder = (): Order => ({
  id: crypto.randomUUID(),
  createdAt: new Date().toISOString(),
  customerName: '',
  customerPhone: '',
  items: [],
  payments: [],
  notes: ''
});

export default function App() {
  const [orders, setOrders] = useState<Order[]>(() => loadOrders());
  const [order, setOrder] = useState<Order>(() => emptyOrder());

  const { canInstall, promptInstall } = usePwaInstallPrompt();
  const { hasUpdate, applyUpdateNow } = useServiceWorkerUpdate();

  useEffect(() => {
    saveOrders(orders);
  }, [orders]);

  const summary = useMemo(() => calcOrderSummary(order), [order]);

  const status = useMemo(() => deriveOrderStatus(order), [order]);

  function addItem() {
    setOrder((o) => ({
      ...o,
      items: [...o.items, { id: crypto.randomUUID(), name: '', qty: 1, price: 0 }]
    }));
  }

  function addPayment(method: PaymentMethod) {
    setOrder((o) => ({
      ...o,
      payments: [...o.payments, { id: crypto.randomUUID(), method, value: 0, at: new Date().toISOString() }]
    }));
  }

  function saveCurrentOrder() {
    setOrders((prev) => {
      const idx = prev.findIndex((x) => x.id === order.id);
      const next = [...prev];
      if (idx >= 0) next[idx] = order;
      else next.unshift(order);
      return next;
    });
    setOrder(emptyOrder());
  }

  function loadForEdit(id: string) {
    const o = orders.find((x) => x.id === id);
    if (o) setOrder(o);
  }

  function removeOrder(id: string) {
    if (!confirm('Remover pedido?')) return;
    setOrders((prev) => prev.filter((x) => x.id !== id));
    if (order.id === id) setOrder(emptyOrder());
  }

  function undoLastPayment() {
    setOrder((o) => applyUndoPayment(o));
  }

  function shareReport() {
    const text = generateDailyReportText(orders);
    if (navigator.share) {
      void navigator.share({ title: 'Relatório de vendas', text });
    } else {
      void navigator.clipboard.writeText(text);
      alert('Relatório copiado para a área de transferência.');
    }
  }

  return (
    <div className="container">
      <header className="header">
        <div>
          <h1>Vendas Beleza</h1>
          <p className="muted">PWA offline • React + Vite + TypeScript</p>
        </div>
        <div className="headerActions">
          {canInstall && (
            <button className="btn" onClick={promptInstall}>
              Instalar
            </button>
          )}
          {hasUpdate && (
            <button className="btn" onClick={applyUpdateNow}>
              Atualizar app
            </button>
          )}
        </div>
      </header>

      <main className="grid">
        <section className="card">
          <h2>Novo pedido</h2>

          <label className="label">
            Cliente
            <input
              className="input"
              value={order.customerName}
              onChange={(e) => setOrder({ ...order, customerName: e.target.value })}
              placeholder="Nome"
            />
          </label>

          <label className="label">
            Telefone (WhatsApp)
            <input
              className="input"
              value={order.customerPhone}
              onChange={(e) => setOrder({ ...order, customerPhone: formatPhoneBR(e.target.value) })}
              placeholder="(11) 99999-9999"
              inputMode="tel"
            />
          </label>

          <div className="row">
            <button className="btn" onClick={addItem}>
              + Item
            </button>
            <button className="btn" onClick={() => addPayment('pix')}>
              + Pix
            </button>
            <button className="btn" onClick={() => addPayment('dinheiro')}>
              + Dinheiro
            </button>
            <button className="btn" onClick={() => addPayment('cartao')}>
              + Cartão
            </button>
          </div>

          <div className="list">
            {order.items.length === 0 ? (
              <p className="muted">Adicione itens para calcular o total.</p>
            ) : (
              order.items.map((it, idx) => (
                <div className="itemRow" key={it.id}>
                  <input
                    className="input"
                    value={it.name}
                    onChange={(e) => {
                      const name = e.target.value;
                      setOrder((o) => {
                        const items = [...o.items];
                        items[idx] = { ...items[idx], name };
                        return { ...o, items };
                      });
                    }}
                    placeholder="Produto"
                  />
                  <input
                    className="input"
                    type="number"
                    value={it.qty}
                    onChange={(e) => {
                      const qty = Number(e.target.value || 0);
                      setOrder((o) => {
                        const items = [...o.items];
                        items[idx] = { ...items[idx], qty };
                        return { ...o, items };
                      });
                    }}
                    min={1}
                    step={1}
                  />
                  <input
                    className="input"
                    type="number"
                    value={it.price}
                    onChange={(e) => {
                      const price = Number(e.target.value || 0);
                      setOrder((o) => {
                        const items = [...o.items];
                        items[idx] = { ...items[idx], price };
                        return { ...o, items };
                      });
                    }}
                    min={0}
                    step={0.01}
                  />
                  <button
                    className="btn btnDanger"
                    onClick={() =>
                      setOrder((o) => ({ ...o, items: o.items.filter((x) => x.id !== it.id) }))
                    }
                    title="Remover"
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="list">
            {order.payments.length > 0 && (
              <>
                <h3>Pagamentos</h3>
                {order.payments.map((p, idx) => (
                  <div className="itemRow" key={p.id}>
                    <span className="pill">{p.method}</span>
                    <input
                      className="input"
                      type="number"
                      value={p.value}
                      onChange={(e) => {
                        const value = Number(e.target.value || 0);
                        setOrder((o) => {
                          const payments = [...o.payments];
                          payments[idx] = { ...payments[idx], value };
                          return { ...o, payments };
                        });
                      }}
                      min={0}
                      step={0.01}
                    />
                    <button
                      className="btn btnDanger"
                      onClick={() =>
                        setOrder((o) => ({ ...o, payments: o.payments.filter((x) => x.id !== p.id) }))
                      }
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button className="btn" onClick={undoLastPayment}>
                  Desfazer último pagamento
                </button>
              </>
            )}
          </div>

          <label className="label">
            Observações
            <textarea
              className="input"
              rows={3}
              value={order.notes}
              onChange={(e) => setOrder({ ...order, notes: e.target.value })}
              placeholder="Ex: Entregar amanhã"
            />
          </label>

          <div className="cardMuted">
            <div className="rowSpread">
              <strong>Total:</strong>
              <span>R$ {summary.total.toFixed(2)}</span>
            </div>
            <div className="rowSpread">
              <strong>Pago:</strong>
              <span>R$ {summary.paid.toFixed(2)}</span>
            </div>
            <div className="rowSpread">
              <strong>Aberto:</strong>
              <span>R$ {summary.open.toFixed(2)}</span>
            </div>
            <div className="rowSpread">
              <strong>Status:</strong>
              <span className="pill">{status}</span>
            </div>
          </div>

          <div className="row">
            <button className="btn btnPrimary" onClick={saveCurrentOrder}>
              Salvar pedido
            </button>
            <button className="btn" onClick={() => setOrder(emptyOrder())}>
              Limpar
            </button>
          </div>
        </section>

        <section className="card">
          <h2>Pedidos salvos</h2>
          <div className="row">
            <button className="btn" onClick={shareReport}>
              Gerar relatório (copiar/compartilhar)
            </button>
          </div>

          {orders.length === 0 ? (
            <p className="muted">Nenhum pedido ainda.</p>
          ) : (
            <div className="list">
              {orders.map((o) => {
                const s = calcOrderSummary(o);
                const st = deriveOrderStatus(o);
                return (
                  <div className="cardMuted" key={o.id}>
                    <div className="rowSpread">
                      <strong>{o.customerName || 'Sem nome'}</strong>
                      <span className="pill">{st}</span>
                    </div>
                    <div className="muted">
                      {o.customerPhone ? formatPhoneBR(o.customerPhone) : ''}
                    </div>
                    <div className="rowSpread">
                      <span>Total: R$ {s.total.toFixed(2)}</span>
                      <span>Pago: R$ {s.paid.toFixed(2)}</span>
                    </div>
                    <div className="row">
                      <button className="btn" onClick={() => loadForEdit(o.id)}>
                        Editar
                      </button>
                      <button className="btn btnDanger" onClick={() => removeOrder(o.id)}>
                        Remover
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <footer className="footer muted">
        Dados salvos localmente (LocalStorage). Exportação/backup pode ser adicionada depois.
      </footer>
    </div>
  );
}
