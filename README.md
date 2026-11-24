# ShapeLab v2 — Diário de hipertrofia

Projeto **mobile first** em HTML, CSS e JavaScript (ES Modules), com visual preto e branco.

## Executar

Como o projeto utiliza módulos JavaScript, rode um servidor local em vez de abrir o HTML com `file://`:

```bash
cd shapelab-v2
python -m http.server 5500
```

Abra http://localhost:5500 no navegador. Para publicar, use Vercel ou GitHub Pages como site estático, com a pasta raiz como diretório de publicação e sem comando de build.

## Estrutura

```text
shapelab-v2/
├── index.html
├── assets/
│   ├── css/
│   │   └── main.css
│   ├── img/
│   └── js/
│       ├── main.js                 # rotas, telas e eventos
│       ├── core/
│       │   └── storage.js          # estado, persistência e backup
│       ├── components/
│       │   └── silhouette.js       # corpo evolutivo ilustrativo em SVG
│       ├── data/
│       │   └── plans.js            # treino e cardápio
│       └── pages/                  # reservado para extrair as páginas em módulos
└── README.md
```

## Funcionalidades

- Interface responsiva com navegação lateral no desktop e inferior no celular
- Tela de acesso **demonstrativa**, sem senha ou autenticação
- Dashboard com silhueta SVG que muda simbolicamente conforme o peso registrado (50–60 kg)
- Treino completo de segunda a sexta com checklists e cargas
- Dieta com sete refeições, incluindo dois shakes Dark Mass
- Acompanhamento de água, sono e peso
- Galeria privada de fotos com data, peso e notas; imagens comprimidas no navegador
- Backup e restauração em JSON (inclui fotos)
- Migração automática de dados do `shapelab-v1` quando encontrados no mesmo domínio/navegador

## Segurança e próximos passos

**Não existe autenticação real**. O nome/e-mail informados servem apenas para personalizar a experiência local. Não solicite senhas nesta versão. Os dados são armazenados em `localStorage`, fotos incluídas; esse armazenamento tem limites, pode ser apagado e não é sincronizado entre dispositivos. Use o backup JSON e guarde-o em local seguro. Fotos sensíveis devem ser protegidas, especialmente em dispositivos compartilhados.

Para evoluir para full stack, separar `main.js` em módulos de página, adicionar backend Node.js/Express, banco de dados PostgreSQL ou MongoDB, autenticação de verdade (sessões seguras, hash de senha, proteção contra CSRF, rate limiting) e armazenamento privado de fotos em object storage. Nunca armazene senhas em `localStorage`.

A silhueta é **ilustrativa**: o ganho de peso não determina automaticamente a composição corporal nem a aparência real. Os valores da dieta são aproximados; confira o rótulo do Dark Mass e procure acompanhamento nutricional individualizado.
