# ShapeLab v3 — Sprint 1

Aplicação de acompanhamento de treinos, dieta, água, sono, peso e fotos. **Mobile first**, tema escuro preto/branco e arquitetura monorepo.

## Tecnologias

- `apps/web`: React 18 + TypeScript + Vite
- `apps/api`: reserva de estrutura para a API Node.js + Express da Sprint 2; **não há servidor implementado**
- `packages/shared`: modelos TypeScript e fichas/refeições de referência
- `packages/design-tokens`: variáveis de tema compartilháveis
- `packages/api-client`: cliente HTTP inicial, ainda não utilizado

## Pré-requisitos

Node.js 20+ e npm 10+.

## Executar localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:5173`.

## Build e verificação

```bash
npm run typecheck
npm run build
npm run dev -w @shapelab/web -- --host 0.0.0.0
```

O resultado de produção é gerado em `apps/web/dist`. Para testar: `npm run preview -w @shapelab/web`.

## Estrutura

```text
shapelab-v3/
├── apps/
│   ├── web/
│   │   └── src/
│   │       ├── components/      # UI compartilhada, barra e silhueta
│   │       ├── features/
│   │       │   ├── auth/         # Login demonstrativo
│   │       │   ├── dashboard/    # Resumo e corpo ilustrativo
│   │       │   ├── training/     # Treinos e cargas
│   │       │   ├── nutrition/    # Refeições e macros
│   │       │   ├── habits/       # Água e sono
│   │       │   ├── progress/     # Peso, histórico e backup
│   │       │   └── photos/       # Galeria de evolução
│   │       ├── lib/store.ts      # Persistência e migração
│   │       └── styles/          # Tema e refinamentos
│   └── api/                      # Placeholder Sprint 2
├── packages/
│   ├── shared/
│   ├── api-client/
│   └── design-tokens/
└── docs/
```

## Funcionalidades da Sprint 1

- Tela de entrada **demonstrativa** sem senha/autenticação real
- Dashboard com silhueta simbólica que evolui de acordo com peso registrado
- Treinos ABCDE, checkboxes por dia e registro de cargas
- Plano alimentar com 7 refeições, 2 shakes Dark Mass e acompanhamento de macros estimados
- Água, sono e metas configuráveis
- Pesagens, histórico de registros, galeria de fotos com compressão
- Exportação/importação de backups JSON
- Migração automática de dados de `shapelab-v2` **quando o novo site é aberto na mesma origem do navegador**

## Limitações e segurança

**Não é um aplicativo multiusuário.** Dados são guardados em `localStorage` do dispositivo; a entrada não autentica identidade. Não armazene informações sensíveis em computadores compartilhados. Fotos consomem espaço e podem esgotar o limite do navegador. Não há sincronização entre dispositivos, banco, API ou notificações. As estimativas de alimentação não substituem orientação nutricional.

Para migrar dados de outra origem (ex.: endereço Vercel antigo), exporte o backup na v2 e importe em Evolução > Importar backup JSON. O backup contém fotos e outros dados pessoais: guarde-o com cuidado.

## Sprint 2 sugerida

- Express + TypeScript, PostgreSQL, Prisma, Zod
- Contas reais, sessões seguras, autorização por usuário
- API REST versionada e testes de integração
- Storage privado para fotos
- Migração dos dados locais para contas autenticadas com consentimento

Consulte `docs/architecture.md`.


## Sprint 1.1 — Vida e rotina

Novos módulos em `apps/web/src/features/`: `agenda`, `notes` e `finance`.

- **Agenda:** seleção de data, tarefas com prioridade/conclusão e compromissos com horário.
- **Anotações:** criar, editar, pesquisar, categorizar, fixar e excluir notas.
- **Finanças:** contas com saldo inicial, categorias de receita/despesa, lançamentos manuais em centavos, saldo calculado, filtro por mês e exclusão de movimentações.
- **Persistência:** os três módulos usam a store local existente (`localStorage`), com compatibilidade com registros anteriores e backup JSON.

**Limitações importantes:** o login continua demonstrativo; não há sincronização com banco, instituição bancária ou entre dispositivos. Não armazene senhas ou informações bancárias sigilosas nas notas. Os dados financeiros permanecem no navegador e podem ser perdidos se o armazenamento for limpo. Exporte backups regularmente. A futura integração bancária deverá usar Open Finance com consentimento explícito e provedores autorizados.

### Execução

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173`. Para validar: `npm run typecheck` e `npm run build`.
