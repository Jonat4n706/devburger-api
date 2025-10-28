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


⚡ Instalação e Execução


1️⃣ Clonar o repositório

git clone https://github.com/seuusuario/devburger-api.git

cd devburger-api


2️⃣ Instalar dependências

yarn install
ou
npm install



3️⃣ Configurar ambiente

Crie um arquivo .env baseado em .env.example:

PORT=3001

JWT_SECRET=sua_chave_jwt

POSTGRES_USER=postgres

POSTGRES_PASSWORD=sua_senha

POSTGRES_DB=devburger

POSTGRES_HOST=localhost

MONGO_URL=mongodb://localhost:27017/devburger

STRIPE_SECRET_KEY=sua_chave_stripe



4️⃣ Executar migrations e iniciar servidor

yarn sequelize db:migrate

yarn dev



🔑 Autenticação JWT

Para acessar rotas protegidas, envie o token no header:

Authorization: Bearer <seu_token>

📬 Exemplos de Requisições (HTTPie)



👤 Criar usuário

http POST :3001/users name="UserName" email="user@email.com" password="123456"



🔐 Login e obter token

http POST :3001/sessions email="user@email.com" password="123456"

Resposta:

{

  "user": 
  {
    "id": "3118f9bdv-7466-4506-9520-07902fa7f34d",
    "name": "User NAme",
    "admin": true
  },
  
  "accessToken": "eyJhbGciOiJIUzI1..."
  
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

Desenvolvido por: Jonathan Alves

📧 Contato: jho-alv@hotmail.com

Linkedin: https://www.linkedin.com/in/jonathan-constantino/


⭐ Contribuição

Se este projeto foi útil para você,
deixe uma estrela ⭐ e contribua com PRs!













