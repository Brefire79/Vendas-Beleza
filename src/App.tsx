import { useState } from 'react';
import { Menu, TrendingDown, TrendingUp, Home, Users, ShoppingBag, DollarSign, Settings, X } from 'lucide-react';
import { Dashboard } from './pages/Dashboard';
import { Clientes } from './pages/Clientes';
import { NovaVenda } from './pages/NovaVenda';
import { Financeiro } from './pages/Financeiro';
import { Configuracoes } from './pages/Configuracoes';
import './App.css';



export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState('inicio');

  const navItems = [
    { id: 'inicio', label: 'Início', icon: <Home size={20} /> },
    { id: 'clientes', label: 'Clientes', icon: <Users size={20} /> },
    { id: 'nova-venda', label: 'Nova Venda', icon: <ShoppingBag size={20} /> },
    { id: 'financeiro', label: 'Financeiro', icon: <DollarSign size={20} /> },
    { id: 'configuracoes', label: 'Configurações', icon: <Settings size={20} /> },
  ];

  return (
    <div className="shell">
      {/* Overlay */}
      {sidebarOpen && (
        <div className="overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-brand">Beleza &amp; Gestão</h2>
          <p className="sidebar-subtitle">Controle de Vendas</p>
          <button
            className="sidebar-close"
            onClick={() => setSidebarOpen(false)}
            aria-label="Fechar menu"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activePage === item.id ? 'active' : ''}`}
              onClick={() => {
                setActivePage(item.id);
                setSidebarOpen(false);
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <header className="topbar">
        <button className="icon-btn" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Menu">
          <Menu size={20} />
        </button>
        <span className="brand">Beleza &amp; Gestão</span>
      </header>

      <main className="container">
        {activePage === 'inicio' && <Dashboard />}
        {activePage === 'clientes' && <Clientes />}
        {activePage === 'venda' && <NovaVenda />}
        {activePage === 'financeiro' && <Financeiro />}
        {activePage === 'config' && <Configuracoes />}
      </main>
    </div>
  );
}
