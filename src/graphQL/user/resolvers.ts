import UserService,{ createUserPayload } from "../../services/user"

const queries={
    getToken:async(_:any,payload:{email:string,password:string})=>{
        const token=await UserService.getToken({
            email:payload.email,
            password:payload.password
        })
        return token
    },
    getCurrentLoggedInUser:async(_:any,parameters:any,context:any)=>{
        console.log(context)
        //console.log(context.user);
        
        if(context ){
            const id=context.id
            const user=await UserService.getUserById(id)
            return user
        }
        
        //throw new Error("I dont know you fuckhead")
    }
}

const mutations={
    createUser:async(_:any,payload:createUserPayload)=>{
        const res=await UserService.createUser(payload)
        return res.id
    }
}

export const resolvers={queries,mutations}