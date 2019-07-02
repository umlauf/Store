# Store

A simple store using Node.js, Express and PostgreSQL. Check out the pg branch for the MongoDB version.

### Dependencies

* [Node.js](https://nodejs.org)
* [PostgreSQL](https://www.postgresql.org)

### Create the tables

    knex migrate:latest

### Seeding the databse

    knex seed:make 001_produtos --env development
    knex seed:make 002_imagens --env development

### Installing the dependencies

#### Webpack:

    npm install webpack -g

#### Application dependencies:

On the root folder:

    npm install

### Starting the application

1. Start mongod

2. On the roor folder:

        npm start

3. Acess http://localhost:3000
