# 🚀 Guia Rápido de Uso

## Abrir a Aplicação

1. **Iniciar servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

2. **Abrir no navegador:**
   - Acesse: http://localhost:5176

3. **Interface:**
   - Clique no ícone de menu (☰) no topo para abrir/fechar o menu lateral
   - Selecione qualquer página do menu (Início, Clientes, Nova Venda, Financeiro, Configurações)

---

## 🏠 Página "Início"

### O que você vê:
- **Cards de resumo:**
  - A Receber: R$ 450,00
  - A Pagar: R$ 280,00
  - Vendas do Mês: R$ 3.450,00
- **Clientes totais:** 5 cadastrados
- **Últimas Vendas:** Lista com 3 vendas recentes
- **Lembretes:** 1 lembrete de pagamento

---

## 👥 Página "Clientes"

### Como usar:

1. **Buscar clientes:**
   - Digite o nome ou telefone na barra de busca
   - A lista filtra automaticamente

2. **Adicionar novo cliente:**
   - Clique em "Novo Cliente" (botão rosa)
   - Preencha os campos:
     - Nome Completo
     - Telefone/WhatsApp
   - Clique em "Salvar" para adicionar (ou "Cancelar" para descartar)

3. **Ver detalhes:**
   - Clique em "Ver Detalhes" em qualquer cliente
   - Isso mostrará um alerta (funcionalidade pendente)

### Dados exibidos:
- Avatar com inicial do nome
- Nome do cliente
- Telefone formatado: (XX) XXXXX-XXXX
- Última compra
- Status de débito (Deve R$ ou Quitado)

---

## 🛍️ Página "Nova Venda"

### Como usar:

1. **Adicionar produtos:**
   - Preencha os campos:
     - Nome do Produto
     - Valor (R$)
     - Categoria (dropdown)
   - Clique em "Adicionar ao Carrinho"
   - O produto aparece na seção "Carrinho"

2. **Configurar a venda:**
   - Selecione o cliente no dropdown (lado direito)
   - Escolha o número de parcelas (1x, 2x, 3x, etc.)
   - O subtotal e total são calculados automaticamente

3. **Finalizar venda:**
   - Clique em "Finalizar Venda" (botão rosa grande)
   - Isso mostrará um alerta de confirmação (funcionalidade pendente)

### Layout:
- **Coluna esquerda:** Formulário de produtos + carrinho
- **Coluna direita:** Resumo da venda com totais

---

## 💰 Página "Financeiro"

### Como usar:

1. **Navegar pelo calendário:**
   - Use as setas (< >) para mudar o mês
   - Clique em qualquer dia para selecioná-lo
   - A data selecionada aparece destacada em rosa

2. **Ver contas a receber:**
   - Aba "Contas a Receber" (ativada por padrão)
   - Lista de 3 contas com:
     - Nome do cliente
     - Data de vencimento
     - Valor (R$)
   - Clique em "Receber" (botão verde) para marcar como recebido (alerta)

3. **Ver histórico:**
   - Clique na aba "Histórico de Entradas"
   - Funcionalidade pendente

### Informações exibidas:
- Calendário do mês atual (navegável)
- Agenda com data selecionada
- Lista de contas pendentes

---

## ⚙️ Página "Configurações"

### Como usar:

1. **Backup de dados:**
   - Clique em "Baixar Backup Completo"
     - Baixa todos os dados em formato JSON
   - Clique em "Baixar Relatório Excel"
     - Gera um relatório para análise

2. **Restaurar dados:**
   - Clique em "Selecionar Arquivo de Backup"
   - Escolha um arquivo de backup salvo anteriormente
   - ⚠️ Isso substitui todos os dados atuais!

3. **Resetar aplicação:**
   - Clique em "Apagar Tudo e Reiniciar" (botão vermelho)
   - Confirme a ação (⚠️ irreversível!)
   - Todos os dados serão apagados

### Dicas:
- 💡 Faça backups semanais!
- 💡 Salve os backups no Google Drive ou envie via WhatsApp
- ⚠️ Atenção ao restaurar: dados atuais serão perdidos

---

## 🎨 Navegação

### Menu Lateral (Sidebar):
- **Abrir:** Clique no ícone ☰ (canto superior esquerdo)
- **Fechar:** Clique no X ou fora do menu (overlay escuro)
- **Navegar:** Clique em qualquer item do menu

### Items do Menu:
1. 🏠 **Início** - Dashboard com resumos
2. 👥 **Clientes** - Gerenciar contatos
3. 🛍️ **Nova Venda** - Criar vendas
4. 💰 **Financeiro** - Contas e agenda
5. ⚙️ **Configurações** - Backup e dados

---

## 📊 Dados Atuais (Mock)

### Clientes:
- Ana Silva - (11) 99999-1234 - Deve R$ 150,00

### Contas a Receber:
- João Silva - 05/03/2025 - R$ 150,00
- Maria Santos - 12/03/2025 - R$ 200,00
- Carlos Pereira - 20/03/2025 - R$ 100,00

### Vendas Recentes:
- Juca Lima - 14/02/2025 - R$ 120,00
- Ana Silva - 10/02/2025 - R$ 85,00
- Beatriz Costa - 04/02/2025 - R$ 180,00

### Lembretes:
- Pagamento Natura - 04/03/2025

---

## 🔧 Comandos de Desenvolvimento

### Instalar dependências:
```bash
npm install
```

### Rodar dev server:
```bash
npm run dev
```
Aplicação estará em: http://localhost:5176

### Build para produção:
```bash
npm run build
```
Gera arquivos otimizados na pasta `dist/`

### Preview do build:
```bash
npm run preview
```
Visualiza a versão de produção

---

## ❓ Perguntas Frequentes

**Q: Como adiciono dados reais?**
A: No momento, os dados são mock (fictícios). Para adicionar dados reais, você precisa conectar a aplicação a um backend ou localStorage.

**Q: Os dados são salvos?**
A: Não, ainda não. Os dados são resetados ao recarregar a página.

**Q: Funciona offline?**
A: Ainda não. O PWA ainda não está totalmente configurado.

**Q: Funciona em celular?**
A: Sim! O layout é responsivo e funciona em mobile, mas alguns ajustes ainda são necessários.

**Q: Posso instalar no celular?**
A: Em breve! O PWA manifest está configurado, mas ainda precisa de ajustes.

---

## 🎯 Próximos Passos

Para fazer a aplicação funcionar com dados reais:

1. Adicionar localStorage para persistir dados
2. Implementar lógica de CRUD (Create, Read, Update, Delete)
3. Conectar formulários a handlers reais
4. Adicionar validações
5. Implementar export/import de backup
6. Configurar PWA para instalação

---

**Divirta-se usando a aplicação!** 🎉
