# Projeto Avanti - Backend

Este repositório contém o backend do Projeto Avanti, desenvolvido de forma colaborativa por estudantes durante o Avanti Bootcamp.

## Objetivo

Desenvolver uma aplicação backend robusta, aplicando boas práticas de programação, integração de tecnologias modernas e trabalho em equipe.

## Tecnologias Utilizadas

- Node.js
- Express
- PostgresSQL
- Prisma ORM
- Docker
- Redis

## Como rodar o projeto

1. Clone o repositório:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd <NOME_DA_PASTA>
   ```
2. Instale as dependências:
   ```bash
    npm install
   ```
3. Configure o banco de dados:
   - Crie um arquivo `.env` na raiz do projeto com as variáveis de ambiente necessárias.
   - Exemplo de configuração se encontram no arquivo `.env.example`.
4. Inicie redis com Docker:
   ```bash
   docker run -d -p 6379:6379 --name redis redis
   ```
5. Execute as migrações do Prisma:
   ```bash
    npx prisma migrate dev --name init
   ```
6. Inicie o servidor:
   ```bash
   npm start
   ```
7. Inicie o worker do Redis:
   ```bash
    node worker.js
   ```

## Contato

Para dúvidas ou sugestões, utilize a aba de issues ou entre em contato com os responsáveis pelo projeto.

---

Colabore, aprenda e divirta-se!
