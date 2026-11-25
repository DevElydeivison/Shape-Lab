# Arquitetura e próximos passos

A interface está dividida por domínio (`features/`). O estado local centralizado em `lib/store.ts` funciona como adaptador de persistência da Sprint 1. Na Sprint 2, substituir o adaptador por hooks de requisição com cache, mantendo as telas e contratos do pacote `shared`.

- **Web**: componentes React, navegação simples baseada em estado (migrar para React Router quando houver URLs/rotas reais).
- **API**: criar módulos `auth`, `users`, `workouts`, `nutrition`, `habits`, `progress`, `photos` em Express + TypeScript.
- **Banco**: PostgreSQL + Prisma; separar planos e registros realizados para preservar histórico.
- **Autenticação**: Argon2id, cookies seguros e HTTP-only para web, estratégia apropriada para mobile, recuperação de senha, rate limiting e autorização por proprietário.
- **Fotos**: upload com URL assinada, storage privado, limite de tamanho, remoção e exportação.
- **Testes**: unitários do domínio, integração da API e E2E para fluxos críticos.
- **Mobile**: React Native/Expo reutilizando validações, tipos e cliente da API.

Não expor dados do usuário a terceiros nem publicar a API antes de implementar autenticação e autorização.
