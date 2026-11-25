# Sprint 2 — Infraestrutura e autenticação

## Escopo entregue
- API Express + TypeScript com validação Zod, CORS restrito, Helmet e rate limit de autenticação.
- PostgreSQL/Prisma: usuários, sessões persistidas e registros de peso.
- Cadastro, login, logout e perfil autenticado com cookies HttpOnly.
- Senhas protegidas com Argon2id; tokens de sessão aleatórios, com hash SHA-256 no banco.
- Tela React de login/cadastro real ativável por variável de ambiente.
- A aplicação web permanece em modo demonstração por padrão para não quebrar o deploy atual.

## Limites desta entrega
**Ainda não há isolamento multiusuário dos módulos antigos.** Treinos, dieta, agenda, notas, fotos e finanças continuam no localStorage do navegador. Ativar login real não sincroniza nem isola esses registros. Não usar em produção com dados financeiros ou fotos pessoais. O banco de dados ainda não contém as tabelas desses módulos. Também faltam recuperação de senha, verificação de e-mail, testes de integração e políticas completas de retenção/exclusão.

## Próximos passos
1. Migrar store local para serviços por usuário e APIs de treino/dieta/hábitos.
2. Criar tabelas para agenda, notas e finanças; usar valores monetários em centavos inteiros.
3. Migrar fotos para armazenamento privado.
4. Testes de autorização, autenticação, backup e fluxos ponta a ponta.
5. Definir estratégia de implantação da API separada do site estático na Vercel.
