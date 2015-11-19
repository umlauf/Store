# owstore

### Dependências

* [Node.js](https://nodejs.org)
* [MongoDB](https://www.mongodb.com)

### Carregando dados iniciais no banco de dados

Na pasta db:

    mongoimport --db owstore --collection produtos --file produtos.json --drop

### Instalando as dependências

Em /:

    npm install

### Iniciando a aplicação

1. Inicie o mongod

2. Em /:

        npm start

3. Acesse http://localhost:3000