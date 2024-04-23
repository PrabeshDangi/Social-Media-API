import { ApolloServer } from '@apollo/server';
import {user} from "./user"

const createGraphQlServer=async()=>{
    //GraphQL server
    const server=new ApolloServer({
        typeDefs:`#graphql
            type Query{
                ${user.queries}
            }
            type Mutation{
                ${user.mutations}
            }
        
        `,
        resolvers:{
            Query:{
                ...user.resolvers.queries
            },
            Mutation:{
               ...user.resolvers.mutations
            }
        }
    })
    
    //Start the server
    await server.start()
    return server;

}

export default createGraphQlServer