# Deploy Vercel — ShapeLab

- Root Directory: raiz do repositório (`./`)
- Build Command: `npm run build`
- Output Directory: `apps/web/dist`
- Install Command: `npm install`

O arquivo `vercel.json` da raiz versiona essas configurações.

## Erro antigo de TypeScript

O deploy no commit `0d4330b` apontou `src/features/finance/Finance.tsx` importando `brl` e `parseMoney` removidos do store. No arquivo RAR enviado para revisão, **não existe** `apps/web/src/features/finance/Finance.tsx` nem módulo de agenda. Verifique se a versão enviada ao GitHub é a mesma deste pacote e se o arquivo obsoleto foi removido do repositório (não apenas localmente).

## Teste antes do push

```bash
npm install
npm run typecheck
npm run build
```

Se passar, faça commit de todas as exclusões: `git add -A`.

## Nota de segurança

O modo de login de demonstração não autentica contas reais. Não ative a API em produção sem configurar o banco, as variáveis de ambiente e o controle de acesso aos dados. Os módulos locais ainda usam armazenamento no navegador.
