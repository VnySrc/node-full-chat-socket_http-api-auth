import { User } from "../models/UsersModel"
import dotenv from "dotenv"
import JWT from "jsonwebtoken"
import sharp from "sharp"
dotenv.config()

class userServices {
    async AllUsersService () {
        const users = User.findAll()
        return users
    }
    async createUserService (username:string, email:string, password:string) {
        const hasUser = await User.findOne({where:{email: email}})
        if (!hasUser) {
            const newUser = await User.create({
                username,
                email,
                password,
            })
            const token = JWT.sign({email: newUser.email, password: newUser.password} ,process.env.JWT_SECRET_KEY as string, {expiresIn: "1h"})
            return {newUser, token};
        
        }
        else {return new Error ("Usuario já cadastrado")}    
    }
    async findUserService (email:string) {
        const hasUser = await User.findOne({
            where:{email: email},
            attributes: [
                "id",
                "username",
                "email",     
                "avatar",
            ]
        }) 
        if (hasUser) {
            console.log(email)
            return hasUser
        }
        else{return new Error("Usuario não registrado!")}
    }   
    async editUserService (username:string, email:string, password:string) {
        const hasUser = await User.findOne({where:{username: username}}) 
        if (hasUser) {
            hasUser.username = username
            hasUser.email = email
            hasUser.password = password
            await hasUser.save()
        }
        else{return new Error("Usuario não registrado!")}
    }
    async deleteUserService (username:string) {
        const hasUser = await User.findOne({where:{username: username}}) 
        if (hasUser) {
            await hasUser.destroy()
            return {status: "Usuario deletado"}
        }
        else{return new Error("Usuario não registrado!")}
    }
    async loginUserService (email:string, password:string) {
        const hasUser = await User.findOne({
            where: {
                email: email,
                password: password,
            }
        })
        if (hasUser) {
            const token = JWT.sign({email: hasUser.email, password:hasUser.password}, process.env.JWT_SECRET_KEY as string ,{expiresIn: "1h"})
            return {username: hasUser.username,email: hasUser.email, token}
        }
        else{
            return new Error ("Email ou senha invalidos")
        }
    }
    async redirectService (email:string) {
        const hasUser = await User.findOne({where:{email: email}}) 
        if (hasUser) {
            return true
        }
        else{
            return false
        }
    }
}

export default new userServices;