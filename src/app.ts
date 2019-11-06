import { graphql, buildSchema, GraphQLSchema } from 'graphql'
import * as express from "express"; 
import * as graphqlHTTP from 'express-graphql'

// Construct a schema, using GraphQL schema language
const meuSchema: GraphQLSchema = buildSchema(`
    type Query {
        arquivo: String,
        listaStrings: [String]
    }
`);

// The root provides a resolver function for each API endpoint
const root = {
    arquivo: (): string => {
        return Buffer.from('/home/bigjoe/Documentos/desenvolvimento/Estudos/start-graph-ql/src/app.ts').toString('base64');
    },
    listaStrings: (): string[] => {
        return [
            'UMA STRING',
            'DUAS STRINGS'
        ]
    }
};

const app = express();
app.use('/graphql', graphqlHTTP({
    schema: meuSchema,
    rootValue: root,
    graphiql: true,
}));

app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql')


// teste direto no console
// graphql(meuSchema, '{ hello }', root).then((response ) => {
//     console.log(response)
// })