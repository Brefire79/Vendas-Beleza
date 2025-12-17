import { TrendingUp, TrendingDown, Users, AlertCircle } from 'lucide-react';

interface Sale {
  name: string;
  items: number;
  date: string;
  value: string;
}

interface Reminder {
  title: string;
  date: string;
}

export function Dashboard() {
  const sales: Sale[] = [
    { name: 'Juca Lima', items: 1, date: '16/12/2025', value: 'R$ 100.00' },
    { name: 'Ana Silva', items: 1, date: '14/02/2025', value: 'R$ 150.00' },
    { name: 'Beatriz Costa', items: 1, date: '19/02/2025', value: 'R$ 45.90' },
  ];

  const reminders: Reminder[] = [
    { title: 'Pagamento Natura', date: '04/03/2025' },
  ];

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Painel de Controle</h1>
        <p className="dashboard-subtitle">Visão geral do seu negócio de beleza.</p>
      </header>

      <div className="stats-grid-full">
        <div className="stat-card-lg income">
          <div className="stat-info">
            <p className="stat-label">A Receber</p>
            <p className="stat-amount">R$ 245.90</p>
            <p className="stat-desc">De clientes ativos</p>
          </div>
          <TrendingUp className="stat-icon-lg" size={20} />
        </div>

        <div className="stat-card-lg expense">
          <div className="stat-info">
            <p className="stat-label">A Pagar</p>
            <p className="stat-amount">R$ 350.00</p>
            <p className="stat-desc">Fornecedores pendentes</p>
          </div>
          <TrendingDown className="stat-icon-lg" size={20} />
        </div>

        <div className="stat-card-lg neutral">
          <div className="stat-info">
            <p className="stat-label">Vendas do Mês</p>
            <p className="stat-amount">R$ 100.00</p>
            <p className="stat-desc">Receita bruta mensal</p>
          </div>
          <AlertCircle className="stat-icon-lg" size={20} />
        </div>
      </div>

      <div className="stat-card-lg neutral full-width">
        <div className="stat-info">
          <p className="stat-label">Clientes</p>
          <p className="stat-amount" style={{ fontSize: '36px' }}>5</p>
          <p className="stat-desc">Total cadastrado</p>
        </div>
        <Users className="stat-icon-lg" size={20} />
      </div>

      <section className="dashboard-section">
        <h2 className="section-title">Últimas Vendas</h2>
        <div className="sales-list">
          {sales.map((sale, idx) => (
            <div key={idx} className="sale-item">
              <div className="sale-info">
                <p className="sale-name">{sale.name}</p>
                <p className="sale-meta">{sale.items} items • {sale.date}</p>
              </div>
              <p className="sale-value">{sale.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="dashboard-section reminder-section">
        <h2 className="section-title">Lembretes</h2>
        <div className="reminders-list">
          {reminders.map((reminder, idx) => (
            <div key={idx} className="reminder-item">
              <div className="reminder-dot"></div>
              <div className="reminder-info">
                <p className="reminder-title">{reminder.title}</p>
                <p className="reminder-date">{reminder.date}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
