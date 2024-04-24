import { prisma } from "../lib/db";
import bcrypt from "bcrypt"
import JWT from "jsonwebtoken"


export interface createUserPayload{
    firstName:string
    lastName?:string
    email:string
    password:string

}

export interface getUserTokenPayload{
    email:string
    password:string
}

class UserService{

    //For signUp
    public static async createUser(payload:createUserPayload){
        const {firstName,lastName,email,password}=payload;
        const saltRound=10;
        const salt=saltRound.toString()
        const hashedpassword=await bcrypt.hash(password,saltRound)
        return prisma.user.create({
            data:{
                firstName,
                lastName,
                email,
                salt,
                password:hashedpassword
            }
        })
    }

    private static getUserByEmail(email: string) {
        return prisma.user.findUnique({
            where: {
                email: email
            }
        });
    }

    public static getUserById(id:string){
        return prisma.user.findUnique({where:{
            id:id
        }})
    }
    

    //For login
    public static async getToken(payload:getUserTokenPayload){
        const {email,password}=payload;
        const user=await UserService.getUserByEmail(email)
        if(!user)
            {
                throw new Error("User not found!!")
            }

        const correctPw=await bcrypt.compare(password,user.password);
        if(!correctPw){
            throw new Error("Password Invalid!!")
        }
        const secretKey=process.env.JWT_SECRET

        if (!secretKey) {
            throw new Error("JWT secret is not defined");
        }
        //GenerateToken
        const token=JWT.sign({id:user.id,email:user.email},secretKey)
        return token
    }

    //For private Routes:
    public static getDecodedToken(token:string){
        //@ts-ignore
        return JWT.verify(token,process.env.JWT_SECRET)
    }
}
export default UserService;