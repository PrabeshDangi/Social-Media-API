import UserService,{ createUserPayload } from "../../services/user"

const queries={
    getToken:async(_:any,payload:{email:string,password:string})=>{
        const token=await UserService.getToken({
            email:payload.email,
            password:payload.password
        })
        return token
    }
}

const mutations={
    createUser:async(_:any,payload:createUserPayload)=>{
        const res=await UserService.createUser(payload)
        return res.id
    }
}

export const resolvers={queries,mutations}