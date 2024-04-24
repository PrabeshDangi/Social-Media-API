import express from "express"
import createGraphQlServer from "./graphQL";
import { expressMiddleware } from '@apollo/server/express4';
import dotenv from 'dotenv';
import UserService from "./services/user";
dotenv.config();



async function initalize() {
    const app=express();
    const PORT=5000;

    app.use(express.json())
    
    app.get('/',(_,res)=>{
        res.json({message:"Server up and running!!"});
    })
    
    const server=await createGraphQlServer()
    app.use('/graphql',expressMiddleware(server,{context:async({req}:any)=>{
        //@ts-ignore
        const token=req.headers["token"];
        try {
            const user= UserService.getDecodedToken(token as string)
            return user
        } catch (error) {
            {};
        }
        },

        })
    )

    
    app.listen(PORT,()=>{
        console.log("Server is started at port",PORT);
        
    })
}

initalize();