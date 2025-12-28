# 📱 Vendas Beleza - PWA

Sistema completo de gestão de vendas e beleza, agora como Progressive Web App (PWA)!

## ✨ Recursos PWA

### 🚀 Instalação no Dispositivo
- **Desktop (Windows/Mac/Linux)**: Clique no ícone de instalação na barra de endereço do navegador
- **Android**: Toque em "Adicionar à tela inicial" no menu do navegador
- **iOS**: Toque no botão de compartilhar e selecione "Adicionar à Tela de Início"

### 📴 Funciona Offline
O aplicativo funciona mesmo sem conexão com a internet graças ao Service Worker que armazena os arquivos necessários.

### 🔄 Atualizações Automáticas
- O app verifica por atualizações automaticamente a cada hora
- Quando uma nova versão está disponível, uma notificação aparece
- Você pode atualizar clicando em "Atualizar Agora" ou deixar para depois
- **Não precisa desinstalar o app** - a atualização acontece automaticamente!

### 🎨 Ícone Personalizado
O app possui um ícone roxo personalizado que aparece:
- Na tela inicial do celular
- Na área de trabalho do computador
- Na barra de tarefas quando está aberto
- Na lista de aplicativos instalados

## 🛠️ Desenvolvimento

### Executar em modo dev com PWA
```bash
npm run dev
```

### Build para produção
```bash
npm run build
```

### Visualizar build de produção
```bash
npm run preview
```

## 📋 Características Técnicas

### Service Worker
- Cache de arquivos estáticos (JS, CSS, HTML, imagens)
- Cache de fontes do Google
- Estratégia "CacheFirst" para recursos externos
- Atualização automática em segundo plano

### Manifest
- Nome: "Vendas Beleza - Sistema de Gestão"
- Nome curto: "Vendas Beleza"
- Tema roxo (#8B5CF6)
- Modo standalone (parece um app nativo)
- Orientação: portrait-primary (vertical)
- Ícones SVG adaptáveis

### Compatibilidade
- ✅ Chrome/Edge (Desktop e Mobile)
- ✅ Firefox (Desktop e Mobile)
- ✅ Safari (Desktop e iOS)
- ✅ Opera
- ✅ Samsung Internet

## 🔧 Configuração

As configurações do PWA estão em:
- [vite.config.ts](vite.config.ts) - Configuração do plugin PWA
- [public/icon.svg](public/icon.svg) - Ícone principal
- [index.html](index.html) - Meta tags PWA

## 📱 Como Usar

1. **Abra o app no navegador**
2. **Instale como app** usando o botão de instalação
3. **Use normalmente** - funciona offline e online
4. **Receba notificações** quando houver atualizações
5. **Atualize quando quiser** - sem perder dados!

## 🎯 Benefícios

- 📱 **Aparência de app nativo** sem precisar da App Store/Play Store
- ⚡ **Carregamento rápido** com cache inteligente
- 💾 **Economia de dados** - arquivos são cacheados
- 🔄 **Sempre atualizado** - atualizações automáticas
- 📴 **Funciona offline** - use sem internet
- 💻 **Multi-plataforma** - um app para todos os dispositivos

---

Feito com ❤️ usando Vite + React + PWA
