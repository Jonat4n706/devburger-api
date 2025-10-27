🍔 DevBurger API

API completa desenvolvida em Node.js, responsável por gerenciar o backend do projeto DevBurger — um sistema de pedidos online que integra autenticação JWT, cadastro e gerenciamento de produtos e categorias, pedidos com MongoDB, e pagamentos com Stripe.

🚀 Tecnologias Utilizadas

Node.js – ambiente de execução JavaScript

Express – framework para rotas e middlewares

Sequelize – ORM para banco relacional (PostgreSQL)

PostgreSQL – armazenamento de usuários, categorias e produtos

MongoDB – armazenamento de pedidos

JWT (JSON Web Token) – autenticação segura

Multer – upload de imagens

Yup – validação de dados

Stripe – pagamentos online

Sucrase + Nodemon – ambiente de desenvolvimento moderno

⚙️ Funcionalidades Principais
👤 Usuários

Cadastro e login com criptografia de senha

Autenticação via JWT

Controle de acesso: usuário comum e administrador

🍔 Produtos e Categorias

CRUD completo de produtos

Upload de imagens com Multer

Associação com categorias

Campo para produto em oferta

🛒 Pedidos

Armazenamento de pedidos no MongoDB

Associação automática com usuário autenticado

Status do pedido: pendente, preparando, entregue

💳 Pagamentos

Integração completa com Stripe API

Criação de Payment Intents

Redirecionamento automático após pagamento


⚡ Instalação e Execução

1️⃣ Clone o repositório
git clone https://github.com/seuusuario/devburger-api.git
cd devburger-api

2️⃣ Instale as dependências
yarn install


3️⃣ Configure o ambiente

Crie um arquivo .env baseado em .env.example:

PORT=3001
JWT_SECRET=sua_chave_jwt
POSTGRES_USER=postgres
POSTGRES_PASSWORD=sua_senha
POSTGRES_DB=devburger
POSTGRES_HOST=localhost
MONGO_URL=mongodb://localhost:27017/devburger
STRIPE_SECRET_KEY=sua_chave_stripe

4️⃣ Execute as migrations e inicie o servidor
yarn sequelize db:migrate
yarn dev


O servidor estará disponível em:

http://localhost:3001

🔑 Autenticação JWT

Para acessar rotas protegidas, é necessário enviar o token no header:

Authorization: Bearer <seu_token>

📬 Exemplos de Requisições (HTTPie)
🧍‍♂️ Criar usuário
http POST :3001/users name="Jonathan Alves" email="jonathan@email.com" password="123456"

🔐 Login e obter token
http POST :3001/sessions email="usuario@email.com" password="123456"


Resposta:

{
  "user": {
    "id": "3118f9cf-7466-4506-9520-07902fa7f34d",
    "name": "Usuario-Nome",
    "admin": true
  },
  "accessToken": "eyJhbGdiOiJIUzI1..."
}

🍔 Criar produto (com imagem)
http -f POST :3001/products name="X-Bacon" price=2500 category_id="1" file@="./xbacon.png" \
Authorization:"Bearer <seu_token>"

📦 Listar produtos
http GET :3001/products Authorization:"Bearer <seu_token>"

🛒 Criar pedido
http POST :3001/orders \
products:='[{"id":1,"quantity":2},{"id":3,"quantity":1}]' \
Authorization:"Bearer <seu_token>"

💳 Criar pagamento (Stripe)
http POST :3001/create-payment-intent \
products:='[{"id":1,"quantity":2,"price":2500}]' \
Authorization:"Bearer <seu_token>"

🧠 Autor

Desenvolvido por Jonathan Alves
💼 LinkedIn
https://www.linkedin.com/in/jonathan-constantino/

📧 jho-alv@hotmail.com.com

⭐ Contribuição

Se gostou do projeto, deixe uma ⭐ no repositório!
Sugestões e PRs são sempre bem-vindos 🚀
