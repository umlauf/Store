# Store

A simple store using Node.js, Express and PostgreSQL. Check out the pg branch for the MongoDB version.

### Dependencies

* [Node.js](https://nodejs.org)
* [PostgreSQL](https://www.postgresql.org)

## Database

### Create the databases

Create the databases *owstore* and *owstore_session*

On owstore_session, create the session table:

```sql
CREATE TABLE "session" (
    "sid" varchar NOT NULL COLLATE "default",
    "sess" json NOT NULL,
    "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
```

### Create the tables on the owstore database

You need to first install [knex](https://knexjs.org/):

```npm install -g knex```

Then run the migration:

```knex migrate:latest```

### Seeding the owstore database

```knex seed:run --env development```

## Installing the dependencies

### Webpack:

```npm install webpack -g```

### Application dependencies:

On the root folder:

```npm install```

## Running the application

1. Start PostgreSQL

2. On the roor folder:

    ```npm start```

3. Acess http://localhost:3000
