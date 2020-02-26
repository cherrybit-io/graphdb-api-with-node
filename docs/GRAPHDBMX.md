# Neo4j GraphQL and Node js

For run and test if your neo4j database instance run try in your node project set the next steps

1. Install npm packages required `npm install neo4j-driver@1.7.6 apollo-server graphql-request`

2. Setup driver

    ```javascript
    const { v1: neo4j } = require('neo4j-driver');
    ```

3. Import apollo server

   ```javascript
   const { ApolloServer, makeExecutableSchema } = require('apollo-server');
   ```

4. Create a connection with neo4j

   ```javascript
   const driver = neo4j.driver(
    `bolt://${process.env.NEO_HOST}:${process.env.NEO_PORT}`,
    neo4j.auth.basic(process.env.NEO_USER, process.env.NEO_PASS));
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

6. Generate the schema building using `makeExecutableSchema` from `apollo-server` package

   ```javascript
   const schema = makeExecutableSchema({typeDefs});
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
