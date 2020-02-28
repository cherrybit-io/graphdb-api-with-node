// declarations section
const { v1: neo4j } = require('neo4j-driver');
const { ApolloServer, makeExecutableSchema } = require('apollo-server');
const { augmentSchema, makeAugmentedSchema } = require('neo4j-graphql-js');


require('dotenv').config();

const driver = neo4j.driver(
    `bolt://${process.env.NEO_HOST}:${process.env.NEO_PORT}`,
    neo4j.auth.basic(
        process.env.NEO_USER,
        process.env.NEO_PASS
    )
);

const typeDefs = `
type Person { 
    name: String!
    homeworld: Planet
    species: [Species]
    films: [Film] 
}
type Planet {
    name: String!
    films: [Film]
}
type Species {
    name: String!
    films: [Film]
}
type Film {
    title: String!
    people: [Person]
    planets: [Planet]
    species: [Species]
}
type Query {
    Person: [Person]
    Planet: [Planet]
    Species: [Species]
    Film: [Film]
}
`;

// const schema = augmentSchema(makeExecutableSchema({typeDefs}));
const schema = makeAugmentedSchema({typeDefs});

new ApolloServer({
    schema,
    context: {driver}
}).listen(8000, '0.0.0.0')
.then(({ url }) => console.log(`The API is running on ${url}`));
