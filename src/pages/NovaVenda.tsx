import { useState } from 'react';
import { Plus, ShoppingCart } from 'lucide-react';

interface Produto {
  id: string;
  nome: string;
  valor: number;
  categoria: string;
}

export function NovaVenda() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [nomeProduto, setNomeProduto] = useState('');
  const [valorProduto, setValorProduto] = useState('0.00');
  const [categoriaProduto, setCategoriaProduto] = useState('Cosmético');
  const [cliente, setCliente] = useState('');
  const [parcelamento, setParcelamento] = useState('À vista (1x)');

  const handleAddProduto = () => {
    if (nomeProduto.trim() && parseFloat(valorProduto) > 0) {
      setProdutos([
        ...produtos,
        {
          id: String(Date.now()),
          nome: nomeProduto,
          valor: parseFloat(valorProduto),
          categoria: categoriaProduto,
        },
      ]);
      setNomeProduto('');
      setValorProduto('0.00');
    }
  };

  const subtotal = produtos.reduce((sum, p) => sum + p.valor, 0);
  const total = subtotal;

  return (
    <div className="nova-venda-page">
      <header className="page-header">
        <h1 className="page-title">Nova Venda</h1>
        <p className="page-subtitle">Registre saídas de produtos e crie parcelas.</p>
      </header>

      <div className="venda-grid">
        {/* Left: Adicionar Produtos */}
        <section className="venda-section">
          <h2 className="section-title">Adicionar Produtos</h2>

          <div className="form-group">
            <label>Nome do Produto</label>
            <input
              type="text"
              placeholder="Ex: Kit Natura Kaiak"
              value={nomeProduto}
              onChange={(e) => setNomeProduto(e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Valor (R$)</label>
              <input
                type="number"
                step="0.01"
                value={valorProduto}
                onChange={(e) => setValorProduto(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Categoria</label>
              <select value={categoriaProduto} onChange={(e) => setCategoriaProduto(e.target.value)}>
                <option>Cosmético</option>
                <option>Fragrância</option>
                <option>Higiene</option>
              </select>
            </div>
          </div>

          <button className="btn-add-cart" onClick={handleAddProduto}>
            <Plus size={18} />
            Adicionar ao Carrinho
          </button>

          {/* Carrinho */}
          <div className="carrinho-section">
            <h3 className="carrinho-title">Carrinho</h3>
            {produtos.length === 0 ? (
              <div className="carrinho-vazio">
                <ShoppingCart size={48} />
                <p>Seu carrinho está vazio</p>
              </div>
            ) : (
              <div className="carrinho-list">
                {produtos.map((p) => (
                  <div key={p.id} className="carrinho-item">
                    <span>{p.nome}</span>
                    <span>R$ {p.valor.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Right: Resumo da Venda */}
        <section className="venda-resumo">
          <h2 className="section-title">Resumo da Venda</h2>

          <div className="form-group">
            <label>Cliente</label>
            <select value={cliente} onChange={(e) => setCliente(e.target.value)}>
              <option value="">Selecione o cliente...</option>
              <option value="ana">Ana Silva</option>
              <option value="maria">Maria Santos</option>
            </select>
          </div>

          <div className="form-group">
            <label>Parcelamento</label>
            <select value={parcelamento} onChange={(e) => setParcelamento(e.target.value)}>
              <option>À vista (1x)</option>
              <option>2x</option>
              <option>3x</option>
              <option>Débito</option>
            </select>
          </div>

          <div className="resumo-totals">
            <div className="total-row">
              <span>Subtotal</span>
              <span>R$ {subtotal.toFixed(2)}</span>
            </div>
            <div className="total-row total">
              <span>Total</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>
          </div>

          <button className="btn-finalizar">Finalizar Venda</button>
        </section>
      </div>
    </div>
  );
}
