# Sistema de Gerenciamento de Salão de Beleza

Bem-vindo ao projeto final da faculdade: Sistema de Gerenciamento de Salão de Beleza. Este sistema foi desenvolvido para facilitar a administração de um salão de beleza, incluindo agendamentos, controle de clientes, serviços oferecidos e gerenciamento de funcionários.

## Funcionalidades

- **Cadastro de Clientes**: Permite o registro de novos clientes com informações pessoais e preferências.
- **Agendamento de Serviços**: Sistema de agendamento para serviços oferecidos pelo salão, permitindo aos clientes marcar horários com facilidade.
- **Gerenciamento de Funcionários**: Cadastro e gerenciamento de informações dos funcionários, incluindo horários de trabalho e especialidades.
- **Relatórios e Análises**: Geração de relatórios sobre o desempenho do salão, frequência de clientes, serviços mais populares, entre outros.

## Tecnologias Utilizadas

- **Frontend**: 
  - HTML
  - CSS
  - TypeScript
  - React.js

- **Banco de Dados**: 
  - Postgres

- **Autenticação**:
  - JWT (JSON Web Tokens)

## Instalação e Configuração

Siga os passos abaixo para configurar e executar o projeto localmente:

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/suellenraysa/salao-web.git
   ```

2. **Navegue até o diretório do projeto**:
   ```bash
   cd salao-web
   ```

3. **Instale as dependências do frontend**:
   ```bash
   cd ../frontend
   npm install
   ```

6. **Inicie o servidor frontend**:
   ```bash
   npm start
   ```

7. **Configuração do Banco de Dados**:
   - Verifique de ter o Postgres instalado e rodando em sua máquina.
   - Crie um arquivo `.env` no diretório `backend` e adicione a string de conexão do Postgres:
     ```
     DB_HOST=localhost
     DB_DATABASE=BeautyHair
     DB_USER=postgres
     DB_PASSWORD=123456
     ```
