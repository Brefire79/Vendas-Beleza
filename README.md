# Vendas Beleza

PWA (offline) simples para registrar pedidos, pagamentos e gerar um relatório rápido.

## Requisitos

- Node.js 18+ (recomendado 20+)
- npm

## Rodar localmente

```bash
npm install
npm run dev
```

Acesse: http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

## PWA

- Manifest: `public/manifest.webmanifest`
- Service Worker: `public/sw.js`

> Observação: os dados são salvos em **LocalStorage** (somente neste navegador/dispositivo).

## Deploy no Netlify

### Opção 1: Importar do GitHub

1. No Netlify: **Add new site → Import an existing project**.
2. Selecione este repositório.
3. Configure:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. Deploy.

### Opção 2: Netlify CLI

```bash
npm install
npm run build
npx netlify deploy --prod --dir=dist
```

### SPA Redirect

A configuração de SPA (para rotas do React) está em:

- `public/_redirects`
- `netlify.toml`
