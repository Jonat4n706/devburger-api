🍔 DevBurger API

API completa desenvolvida em Node.js, responsável por gerenciar o backend do projeto DevBurger — um sistema de pedidos online com autenticação JWT, gerenciamento de produtos e categorias, pedidos via MongoDB e pagamentos com Stripe.

🚀 Tecnologias Utilizadas

| Categoria         | Tecnologias                          
| ----------------- | ------------------------------------ 
| 🧠 Backend        | Node.js, Express                     
| 💾 Banco de Dados | PostgreSQL (Sequelize ORM) + MongoDB 
| 🔒 Autenticação   | JWT (JSON Web Token)                 
| 📦 Uploads        | Multer                               
| ✅ Validação       | Yup                                 
| 💳 Pagamentos     | Stripe                               
| ⚙️ Ambiente Dev   | Sucrase + Nodemon                    

⚙️ Funcionalidades Principais

👤 Usuários:

Cadastro e login com criptografia de senha

Autenticação via JWT

Controle de acesso (usuário comum / administrador)

🍔 Produtos e Categorias:

CRUD completo de produtos

Upload de imagens com Multer

Associação a categorias

Campo para produtos em oferta

🛒 Pedidos:

Armazenamento de pedidos no MongoDB

Associação automática ao usuário autenticado

Status do pedido: pendente, preparando, entregue

💳 Pagamentos:

Integração completa com Stripe API

Criação de Payment Intents

Redirecionamento automático após pagamento

📁 Estrutura do Projeto

devburger-api/
│
├── src/
│   ├── app/
│   │   ├── controllers/    # Lógica de negócio (User, Product, Order, etc)
│   │   ├── middlewares/    # Autenticação e validação
│   │   ├── models/         # Modelos Sequelize (Postgres)
│   │   ├── schemas/        # Schemas MongoDB
│   │   └── utils/          # Funções auxiliares
│   │
│   ├── config/             # Configurações (upload, stripe, banco)
│   ├── database/           # Conexão com Postgres e MongoDB
│   ├── routes.js           # Rotas da aplicação
│   ├── app.js              # Configuração do Express
│   └── server.js           # Inicialização do servidor
│
├── .env.example
├── package.json
└── README.md

