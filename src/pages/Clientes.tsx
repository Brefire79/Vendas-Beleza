import { useState } from 'react';
import { Search, Plus, X } from 'lucide-react';

interface Cliente {
  id: string;
  nome: string;
  telefone: string;
  ultimaCompra: string;
  deve: string;
}

export function Clientes() {
  const [clientes, setClientes] = useState<Cliente[]>([
    { id: '1', nome: 'Ana Silva', telefone: '(11) 99999-1234', ultimaCompra: '14/02/2025', deve: 'Deve R$ 150.00' },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [novoNome, setNovoNome] = useState('');
  const [novoTelefone, setNovoTelefone] = useState('');

  const handleAddCliente = () => {
    if (novoNome.trim()) {
      setClientes([
        ...clientes,
        {
          id: String(clientes.length + 1),
          nome: novoNome,
          telefone: novoTelefone,
          ultimaCompra: new Date().toLocaleDateString('pt-BR'),
          deve: 'Deve R$ 0.00',
        },
      ]);
      setNovoNome('');
      setNovoTelefone('');
      setShowModal(false);
    }
  };

  const filteredClientes = clientes.filter(c =>
    c.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.telefone.includes(searchTerm)
  );

  return (
    <div className="page-content">
      <header className="page-header">
        <h1 className="page-title">Clientes</h1>
        <p className="page-subtitle">Gerencie seus contatos e débitos.</p>
      </header>

      <button className="btn-primary-lg" onClick={() => setShowModal(true)}>
        <Plus size={20} />
        Novo Cliente
      </button>

      <div className="search-box">
        <Search size={18} />
        <input
          type="text"
          placeholder="Buscar por nome ou telefone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="clientes-list">
        {filteredClientes.map((cliente) => (
          <div key={cliente.id} className="cliente-card">
            <div className="cliente-avatar">
              {cliente.nome.charAt(0).toUpperCase()}
            </div>
            <div className="cliente-info">
              <h3 className="cliente-nome">{cliente.nome}</h3>
              <p className="cliente-meta">
                <span>📱 {cliente.telefone}</span>
              </p>
              <p className="cliente-meta">
                <span>📅 Última compra: {cliente.ultimaCompra}</span>
              </p>
            </div>
            <div className="cliente-deve">
              <p className="deve-text">{cliente.deve}</p>
            </div>
            <button className="btn-detail">Ver Detalhes</button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Novo Cliente</h2>
              <button
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-content">
              <div className="form-group">
                <label>Nome Completo</label>
                <input
                  type="text"
                  placeholder="Ex: Maria Silva"
                  value={novoNome}
                  onChange={(e) => setNovoNome(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Telefone / WhatsApp</label>
                <input
                  type="tel"
                  placeholder="(00) 00000-0000"
                  value={novoTelefone}
                  onChange={(e) => setNovoTelefone(e.target.value)}
                />
              </div>

              <button className="btn-save" onClick={handleAddCliente}>
                Salvar Cliente
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
