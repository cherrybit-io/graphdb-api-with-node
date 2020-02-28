# Neo4j GraphQL and Node js

![neo image][neo] ![graph image][graph] ![node image][node]

[neo]: https://s3.amazonaws.com/dev.assets.neo4j.com/wp-content/uploads/neo4j_logo-325x150-113x50.png "Neo4j Logo"

[graph]: https://graphql.org/img/logo.svg "GraphQL Logo"

[node]: https://nodejs.org/static/images/logo.svg "Node js Logo"

For make sure if your neo4j database instance is running try in your node project set up the next steps

1. Install npm packages required `npm install neo4j-driver@1.7.6 apollo-server neo4j-graphql-js`

2. Setup driver

    ```javascript
    // declarations section
    const { v1: neo4j } = require('neo4j-driver');
    ```

3. Import apollo server

   ```javascript
   // declarations section
   const { ApolloServer, makeExecutableSchema } = require('apollo-server');
   ```

4. Create a connection with neo4j

   ```javascript
   const driver = neo4j.driver(
    `bolt://${process.env.NEO_HOST}:${process.env.NEO_PORT}`,
    neo4j.auth.basic(process.env.NEO_USER, process.env.NEO_PASS));
   ```

   for use the `process.env` of node you need use an environment config in this case we use the `dotenv` package. You can install with this command `npm i dotenv --save`

   and import with this with this code:

   ```javascript
   require('dotenv').config();
   ```

5. Create the types definition

   ```javascript
   const typeDefs = `
   type Person { name: String! }
   type Planet { name: String! }
   type Query {
      Person: [Person]
      Planet: [Planet]
   }
   `;
   ```

6. Generate the schema definition and building for using with neo4j and graphql

   ```javascript
   // declarations section
   const { augmentSchema } = require('neo4j-graphql-js');
   ```

   ```javascript
   const schema = augmentSchema(makeExecutableSchema({typeDefs}));
   ```

   or

   ```javascript
   // declarations section
   const { makeAugmentedSchema } = require('neo4j-graphql-js');
   ```

   ```javascript
   const schema = makeAugmentedSchema({typeDefs});
    ```

7. Start to listen the server with `ApolloServer` from `apollo-server` package

   ```javascript
   new ApolloServer({
      schema,
      context: {driver}
   })
   .listen(8000, '0.0.0.0')
   .then(({ url }) => console.log(`The API is running on ${url}`));
   ```

---

**So, Ready to try this API!**

open your browser and type the next url [http://localhost:8000](http://localhost:8000)
