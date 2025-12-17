import { useState } from 'react';
import { ChevronLeft, ChevronRight, DollarSign, Check } from 'lucide-react';

interface Conta {
  id: string;
  cliente: string;
  vencimento: string;
  valor: string;
}

export function Financeiro() {
  const [activeTab, setActiveTab] = useState('receber');
  const [currentDate, setCurrentDate] = useState(new Date(2025, 11, 16));

  const contas: Conta[] = [
    { id: '1', cliente: 'Ana Silva', vencimento: '14/03/2025', valor: 'R$ 75.00' },
    { id: '2', cliente: 'Beatriz Costa', vencimento: '19/03/2025', valor: 'R$ 45.90' },
    { id: '3', cliente: 'Ana Silva', vencimento: '14/04/2025', valor: 'R$ 75.00' },
  ];

  const monthName = currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

  return (
    <div className="financeiro-page">
      <header className="page-header">
        <h1 className="page-title">Financeiro & Agenda</h1>
        <p className="page-subtitle">Controle suas contas e entregas.</p>
      </header>

      <div className="financeiro-grid">
        {/* Calendar */}
        <section className="calendario-section">
          <div className="calendario-header">
            <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}>
              <ChevronLeft size={18} />
            </button>
            <h3>{monthName}</h3>
            <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}>
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="calendario-grid">
            {['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'].map((day) => (
              <div key={day} className="calendario-header-day">
                {day}
              </div>
            ))}
            {Array.from({ length: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay() }).map((_, i) => (
              <div key={`empty-${i}`} className="calendario-day empty"></div>
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => (
              <button
                key={i + 1}
                className={`calendario-day ${
                  i + 1 === currentDate.getDate() ? 'active' : ''
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <div className="agenda-item">
            <h4>{currentDate.getDate()} de {monthName.split(' ')[0]}</h4>
            <p>Nada agendado para hoje.</p>
          </div>
        </section>

        {/* Contas */}
        <section className="contas-section">
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'receber' ? 'active' : ''}`}
              onClick={() => setActiveTab('receber')}
            >
              Contas a Receber
            </button>
            <button
              className={`tab ${activeTab === 'entradas' ? 'active' : ''}`}
              onClick={() => setActiveTab('entradas')}
            >
              Histórico de Entradas
            </button>
          </div>

          {activeTab === 'receber' && (
            <div className="contas-list">
              {contas.map((conta) => (
                <div key={conta.id} className="conta-item">
                  <div className="conta-icon">
                    <DollarSign size={20} />
                  </div>
                  <div className="conta-info">
                    <p className="conta-cliente">{conta.cliente}</p>
                    <p className="conta-vencimento">Vencimento: {conta.vencimento}</p>
                  </div>
                  <div className="conta-valor">{conta.valor}</div>
                  <button className="btn-receber">Receber</button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'entradas' && (
            <div className="contas-list">
              <p style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
                Nenhuma entrada registrada
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
