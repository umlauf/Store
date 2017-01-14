# Store

A simple store using Node.js, Express and MongoDB. Check out the pg branch for the PostgreSQL version.

### Dependencies

* [Node.js](https://nodejs.org)
* [MongoDB](https://www.mongodb.com)

### Seeding the databse

cd to the db folder and execute:

    mongoimport --db owstore --collection produtos --file produtos.json --drop

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
