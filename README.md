# 📝 ToDo App com Autenticação (Full Stack)

Este projeto é um **aplicativo de lista de tarefas (ToDo)** com **autenticação de usuários**, construído em uma arquitetura **full-stack** com:

- 🧠 **Back-end:** Node.js, Express e MongoDB
- 💻 **Front-end:** React + Vite + CSS Puro
- 🔐 **Autenticação:** JWT (JSON Web Token)
- 🛡️ **Rotas protegidas e tarefas públicas/privadas**

---

## 🚀 Funcionalidades

### 👥 Autenticação
- Registro de usuário
- Login seguro com JWT
- Proteção de rotas privadas
- Logout

### ✅ Tarefas
- Criar tarefa
- Listar tarefas do usuário
- Marcar como concluída
- Editar e excluir
- Ver tarefas públicas

---

## 🛠️ Tecnologias Usadas

### Back-end
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB + Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [CORS](https://www.npmjs.com/package/cors)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)

### Front-end
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Axios](https://axios-http.com/)
- [React Router DOM](https://reactrouter.com/)
- [TailwindCSS](https://tailwindcss.com/)

---

## 📁 Estrutura de Pastas

### Backend
backend/
│
├── controllers/
│ └── authController.js
│ └── taskController.js
│
├── middleware/
│ └── auth.js
│
├── models/
│ └── User.js
│ └── Task.js
│
├── routes/
│ └── authRoutes.js
│ └── taskRoutes.js
│
├── .env
├── server.js

shell
Copiar
Editar

### Frontend
frontend/
│
├── src/
│ ├── components/
│ │ └── Navbar.js
│ ├── pages/
│ │ └── Login.js
│ │ └── Register.js
│ │ └── Dashboard.js
│ │ └── PublicTasks.js
│ ├── context/
│ │ └── AuthContext.js
│ ├── services/
│ │ └── api.js
│ └── App.jsx
│ └── main.jsx
├── tailwind.config.js
├── vite.config.js

yaml
Copiar
Editar

---

## ⚙️ Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/seuusuario/todo-app-auth.git
cd todo-app-auth

2. Back-end

bash
Copiar
Editar
cd backend
npm install
Crie o arquivo .env com as variáveis:

env
Copiar
Editar
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Inicie o servidor:

bash
Copiar
Editar
npm start

3. Front-end

bash
Copiar
Editar
cd frontend
npm install
npm run dev
🔐 Rotas da API
Autenticação
Método	Rota	Descrição
POST	/api/auth/register	Registrar novo usuário
POST	/api/auth/login	Login de usuário

Tarefas
Método	Rota	Protegida	Descrição
GET	/api/tasks	✅	Buscar tarefas do usuário
POST	/api/tasks	✅	Criar nova tarefa
PUT	/api/tasks/:id	✅	Editar tarefa
DELETE	/api/tasks/:id	✅	Deletar tarefa
GET	/api/public-tasks	❌	Listar tarefas públicas

🧪 Funcionalidades em desenvolvimento
Filtro de tarefas por status

Upload de imagem por tarefa

Responsividade mobile

Dark mode

🧑‍💻👩‍💻 Autores
Ícaro de Andrade Santos
Maria Helena C. R. Roque
Estudantes de Análise e Desenvolvimento de Sistemas

📄 Licença
Este projeto está sob a licença MIT.
Veja o arquivo LICENSE para mais detalhes.

yaml
Copiar
Editar
