import { Download, Upload, FileSpreadsheet, AlertTriangle, RotateCcw } from 'lucide-react';

export function Configuracoes() {
  const handleDownloadBackup = () => {
    alert('Iniciando download do backup...');
  };

  const handleDownloadExcel = () => {
    alert('Iniciando download do relatório Excel...');
  };

  const handleUploadBackup = () => {
    alert('Selecione um arquivo de backup para restaurar...');
  };

  const handleHardReset = () => {
    if (confirm('Tem certeza? Isso apagará TODOS os dados e não pode ser desfeito!')) {
      alert('Sistema reiniciado. Todos os dados foram apagados.');
    }
  };

  return (
    <div className="config-page">
      <header className="config-header">
        <h1>Configurações & Backup</h1>
        <p>Gerencie seus dados e faça cópias de segurança.</p>
      </header>

      {/* Salvar Dados (Backup) */}
      <section className="config-card">
        <h3><Download size={20} className="config-card-icon" /> Salvar Dados (Backup)</h3>
        <p className="config-card-desc">
          Baixe seus dados para salvar no Google Drive, enviar por WhatsApp ou guardar no computador.
        </p>
        <div className="config-buttons">
          <button className="btn-config" onClick={handleDownloadBackup}>
            <Download size={18} />
            Baixar Backup Completo (Para Restaurar)
          </button>
          <button className="btn-config" onClick={handleDownloadExcel}>
            <FileSpreadsheet size={18} />
            Baixar Relatório Excel (Para Análise)
          </button>
        </div>
        <div className="config-tip">
          <strong>💡 Dica:</strong> Faça isso toda semana para garantir que suas vendas estejam seguras.
        </div>
      </section>

      {/* Restaurar Dados */}
      <section className="config-card">
        <h3><Upload size={20} className="config-card-icon" /> Restaurar Dados</h3>
        <p className="config-card-desc">
          Recupere seus dados usando um arquivo de backup que você salvou anteriormente.
        </p>
        <div className="config-buttons">
          <button className="btn-config" onClick={handleUploadBackup}>
            <Upload size={18} />
            Selecionar Arquivo de Backup
          </button>
        </div>
        <div className="config-tip">
          <strong>⚠️ Atenção:</strong> Isso irá substituir os dados atuais pelos do arquivo.
        </div>
      </section>

      {/* Zona de Perigo */}
      <section className="config-card">
        <h3><AlertTriangle size={20} className="config-card-icon" /> Zona de Perigo</h3>
        <p className="config-card-desc">
          Ações irreversíveis para reiniciar o aplicativo.
        </p>
        <div className="config-buttons">
          <button className="btn-config btn-danger" onClick={handleHardReset}>
            <RotateCcw size={18} />
            Apagar Tudo e Reiniciar
          </button>
        </div>
      </section>
    </div>
  );
}
