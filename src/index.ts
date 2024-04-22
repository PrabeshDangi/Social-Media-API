import express from "express"
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import {prisma} from "./lib/db"

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
        type Mutation{
            createUser(firstName:String!,lastName:String!,email:String!,password:String!):Boolean
        }
        
        `,
        resolvers:{
            Query:{
                hello:()=>{
                    return "Hii form resolvers!"
                }
            },
            Mutation:{
                createUser:
                async(_,{firstName,lastName,email,password}:{firstName:string,lastName:string,email:string,password:string})=>
                    {
                    await prisma.user.create({
                        data:{
                            firstName,
                            lastName,
                            email,
                            password,
                            salt:"random_salt"
                        }
                    })
                    return true;
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