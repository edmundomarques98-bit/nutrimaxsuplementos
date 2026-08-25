# Nutrimax Suplementos

Site oficial da Nutrimax Suplementos, desenvolvido em React + Vite com Motion para animações.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Publicação

O projeto possui workflow em `.github/workflows/deploy-pages.yml` para publicação automática no GitHub Pages a cada push na branch `main`.

Durante a migração inicial, a imagem principal do hero é recuperada da implantação anterior antes do build. Depois que o catálogo e os assets forem consolidados no repositório, esse passo pode ser removido.
