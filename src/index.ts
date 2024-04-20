import express from "express"
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';;

async function initalize() {
    const app=express();
    const PORT=5000;

    app.use(express.json())
    
    //GraphQL server
    const server=new ApolloServer({
        typeDefs:`#graphql
        type Query{
            hello:String
        }
        
        `,
        resolvers:{
            Query:{
                hello:()=>{
                    return "Hii form resolvers!"
                }
            }
        }
    })
    
    //Start the server
    await server.start()
    
    app.get('/',(_,res)=>{
        res.json({message:"Server up and running!!"});
    })

    app.use('/graphql',expressMiddleware(server))
    
    app.listen(PORT,()=>{
        console.log("Server is started at port",PORT);
        
    })
}

initalize();