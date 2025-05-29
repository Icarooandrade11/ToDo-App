# 📋 Projeto: Dashboard de Tarefas (MERN Stack)

Este projeto é um **Dashboard de Tarefas** completo, desenvolvido com a stack **MERN (MongoDB, Express.js, React.js e Node.js)**. Ele conta com um **sistema de autenticação JWT**, **visibilidade de tarefas** (pública/privada), e um recurso moderno de **drag-and-drop** para reorganização.

---

## 🚀 Tecnologias Utilizadas

### 🔧 Backend (API REST)
- **Node.js** + **Express.js**
- **MongoDB** (Mongoose)
- **JWT (jsonwebtoken)** para autenticação
- **CORS** para segurança das requisições

### 🎨 Frontend (Dashboard)
- **React.js** com Hooks (useState, useEffect, Context API)
- **Axios** para chamadas HTTP
- **@hello-pangea/dnd** para drag-and-drop
- **CSS puro** para layout e responsividade

---

## 🗂️ Estrutura de Pastas

📦 projeto/
├── backend/
│ ├── models/ # Modelos do Mongoose (ex.: User, Task)
│ ├── routes/ # Rotas da API (ex.: auth, tasks)
│ ├── middleware/ # Middlewares (ex.: autenticação)
│ ├── controllers/ # Lógica de cada rota
│ ├── server.js # Ponto de entrada do backend
│ └── .env # Variáveis de ambiente (ex.: Mongo URI, JWT_SECRET)
│
├── frontend/
│ ├── src/
│ │ ├── assets/ # Imagem de fundo (background.png)
│ │ ├── context/ # Contexto de autenticação (AuthContext)
│ │ ├── pages/ # Dashboard, Login e outras páginas
│ │ ├── services/ # Arquivo de configuração do Axios (api.js)
│ │ ├── App.js # Estrutura e rotas
│ │ ├── index.js # Ponto de entrada do React
│ │ └── Dashboard.css # Estilização do Dashboard
│ └── package.json
│
├── README.md
└── package.json

---

## 🔑 Funcionalidades

✅ **Autenticação de Usuários**  
- Cadastro e login com validação de JWT  
- Proteção das rotas do backend usando middleware de autenticação  

✅ **CRUD de Tarefas**  
- **Criar**: Crie tarefas com título e visibilidade  
- **Ler**: Visualize as tarefas cadastradas (públicas e privadas, dependendo do usuário)  
- **Atualizar**: Marque como concluídas ou reative tarefas  
- **Excluir**: Remova tarefas indesejadas  

✅ **Drag-and-Drop**  
- Reordene tarefas facilmente, com persistência da ordem no backend  

✅ **Visibilidade de Tarefas**  
- Cada tarefa pode ser **privada** ou **pública**  

✅ **Design Moderno e Responsivo**  
- Imagem de fundo personalizável  
- Layout centralizado e elegante  

---

## ⚙️ Como Executar o Projeto

### 🔧 Backend (API)

1️⃣ Instale as dependências:

```bash
cd backend
npm install

2️⃣ Crie um arquivo .env com as seguintes variáveis:

MONGO_URI=mongodb://localhost:27017/dashboard-tasks
JWT_SECRET=sua_chave_secreta_aqui
PORT=5000

3️⃣ Inicie o servidor:

npm run dev
API disponível em: http://localhost:5000

💻 Frontend (React)

1️⃣ Instale as dependências:

cd frontend
npm install

2️⃣ Ajuste a baseURL da API em frontend/src/services/api.js:

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // ajuste se necessário
});

export default api;

3️⃣ Execute o projeto:

npm start
App disponível em: http://localhost:3000

📸 Imagem de Fundo

A imagem de fundo (background.png) fica em frontend/src/assets/.
O CSS da dashboard usa:

.dashboard-background {
  background: url("../assets/background.png") no-repeat center center/cover;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

💡 Melhorias Futuras:

🔄 Upload de imagens ou arquivos para tarefas

👨‍💻 Animações suaves usando Framer Motion

📲 Versão mobile-first para maior responsividade

🔐 Recuperação de senha

## 📜 Licença

Este projeto está sob a licença **MIT**, com as seguintes condições adicionais:

- ✅ Você pode usar, estudar, modificar e compartilhar livremente este projeto para **fins pessoais e educacionais**.
- 💰 **Uso Comercial**: Caso queira **comercializar** este projeto (ou parte dele), **5% de royalties** sobre as vendas devem ser destinados ao desenvolvedor original como parte de um acordo contratual. Entre em contato para detalhes e contrato formal.

---

✨ Obrigado por utilizar este projeto e por respeitar as diretrizes! 🚀
