# ThunderLinks

Rápido e curto como um trovão!

ThunderLinks é um encurtador de links simples e eficiente, construído com Node.js, Express e MySQL.

## Funcionalidades

- Encurta URLs longas para links curtos e fáceis de compartilhar.
- Redireciona os links encurtados para as URLs originais.
- Interface de usuário limpa e simples para encurtar links.

## Tecnologias Utilizadas

- **Backend:** Node.js, Express.js
- **Banco de Dados:** MySQL
- **Frontend:** HTML, CSS, JavaScript
- **Dependências:**
  - `dotenv` para gerenciar variáveis de ambiente
  - `express` para o servidor web
  - `mysql2` para interação com o banco de dados MySQL
  - `nanoid` para gerar IDs curtos e únicos

## Pré-requisitos

- [Node.js](https://nodejs.org/) instalado
- [MySQL](https://www.mysql.com/) instalado e em execução

## Instalação e Configuração

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/thunderlinks.git
   cd thunderlinks
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   - Crie um arquivo `.env` na raiz do projeto.
   - Adicione as seguintes variáveis de ambiente ao arquivo `.env`, substituindo pelos seus próprios valores:
     ```
     DB_HOST=localhost
     DB_USER=seu_usuario_mysql
     DB_PASSWORD=sua_senha_mysql
     DB_DATABASE=thunderlinks
     PORT=3000
     ```

4. **Configure o banco de dados:**
   - Execute o script de configuração para criar a tabela necessária no banco de dados:
     ```bash
     npm run setup
     ```

## Uso

- **Inicie o servidor:**
  ```bash
  npm start
  ```
- Abra seu navegador e acesse `http://localhost:3000`.
- Cole uma URL longa na caixa de texto e clique em "Encurtar".
- O link encurtado será exibido na tela.

## Endpoints da API

- `POST /encurtar`: Cria um novo link encurtado.
  - **Corpo da Requisição:** `{ "originalUrl": "https://sua-url-longa.com" }`
  - **Resposta de Sucesso:** `{ "shortUrl": "http://localhost:3000/id-curto" }`
- `GET /:shortId`: Redireciona para a URL original.
