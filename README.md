# ShapeLab v3 — Sprint 2 (foco em saúde e evolução)

Monorepo com frontend React + Vite e backend Express + TypeScript + Prisma/PostgreSQL.

## Requisitos
- Node.js 20+ (preferencialmente uma versão LTS fixa)
- npm
- Docker Desktop para PostgreSQL local (ou banco PostgreSQL próprio)

## Primeira execução

```bash
npm install
docker compose up -d
cp apps/api/.env.example apps/api/.env
npm run db:generate
npm run db:migrate
npm run dev:api
```

Em outro terminal:

```bash
npm run dev
```

Acesse http://localhost:5173. API em http://localhost:3333/api/v1/health.

## Testar login real no frontend
Copie `apps/web/.env.example` para `apps/web/.env.local`, altere `VITE_ENABLE_API_AUTH=true` e reinicie o Vite. **Por padrão permanece em modo demo**, para manter a versão publicada sem exigir uma API ainda não implantada.

**Atenção:** somente contas/sessões e peso via API estão implementados no backend. Os módulos antigos permanecem locais, não são sincronizados nem segregados por conta. Não use o login como garantia de privacidade dos dados locais.

## Scripts
- `npm run dev` — frontend
- `npm run dev:api` — API
- `npm run build` — build do site para Vercel (`apps/web/dist`)
- `npm run typecheck` — tipos do frontend
- `npm run db:generate` — gerar Prisma Client
- `npm run db:migrate` — criar/aplicar migração local
- `npm run build:api` — build da API

## Deploy
O frontend Vite continua estático e pode usar a configuração anterior da Vercel (`apps/web/dist`). **A API não é automaticamente implantada pela configuração do frontend.** Hospede a API em serviço Node.js separado, com PostgreSQL gerenciado, `DATABASE_URL`, `WEB_ORIGIN` e HTTPS; configure `VITE_API_URL` no build do frontend. Cookies cross-site podem exigir domínio compartilhado, política SameSite adequada e proteção CSRF; não habilite autenticação real publicamente sem revisar esses pontos.

Veja [docs/sprint-2.md](docs/sprint-2.md).

## Módulos ativos
- Visão geral / Dashboard
- Treinos
- Alimentação
- Hábitos (água e sono)
- Evolução corporal / peso
- Fotos de evolução
- Anotações
- Login demonstrativo ou autenticação API experimental

**Agenda e Finanças foram removidos da navegação e do código de interface.**
Os registros anteriores desses módulos, se existentes no `localStorage` ou em backups,
continuam preservados nos campos legados para evitar perda acidental de dados.
Eles não são exibidos nem editados pelo ShapeLab nesta versão.
Para excluir esses dados permanentemente, faça um backup e trate a limpeza separadamente.

## Atualização da versão anterior
Substitua o projeto pelo conteúdo deste ZIP, execute `npm install` e `npm run build`,
e publique na Vercel com `Output Directory = apps/web/dist` e raiz do repositório.
A atualização não exige apagar o armazenamento local do navegador.
