# Projeto
Este teste de vaga consiste em uma aplicação desenvolvida em ReactJS com Next e Node Implementando operações CRUD (Create, Read, Update, Delete) de veículos.
Aqui está um guia rápido para configurar e executar o projeto.

## Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado:

- Node.js
- npm (geralmente vem com o Node.js)
- Git
- mysql

## Configuração

Primeiro, clone o repositório do projeto:
```bash
git clone git@github.com:MatheusLucca/Teste-davinTI.git
```

### Back-end

Para configurar e executar o back-end, siga estas etapas:

1. Navegue até o diretório do back-end.
```bash
cd back-end
```
2. Instale as dependências do projeto.
```bash
npm install
```
3. Execute a base de dados com base no arquivo basededados.sql

4. Configure a conexão com o banco de dados indo no arquivo default.json e insira as informações do banco de dados, assim como a porta que o servidor ira rodar

4. Inicie o servidor.
```bash
npm start
```

O servidor agora deve estar rodando em `http://localhost:8000`, a porta 8000 é default, caso troque estara rodando na porta selecionada
;
### Front-end

Para configurar e executar o front-end, siga estas etapas:

1. Navegue até o diretório do front-end.
```bash
cd front-end
```
2. Instale as dependências do projeto.
```bash
npm install
```
3. Inicie o aplicativo.
```bash
npm start || npm run dev
```

O aplicativo agora deve estar rodando em `http://localhost:3000`.
