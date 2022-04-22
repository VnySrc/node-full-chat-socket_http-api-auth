import axios from "axios";
import {Request, Response, NextFunction} from "express"
import userServices from "../services/userServices"

class usersController {
    async AllUsers (req:Request, res:Response) {
        const allUsers = await userServices.AllUsersService()
        res.json(allUsers)
    }
    async createUser (req:Request, res:Response, next: NextFunction) { // registro e geração dos tokens req
        if (req.body.username && req.body.email && req.body.password){
            const {username, email, password} = req.body
            
            const newUser = await userServices.createUserService(JSON.parse(username),JSON.parse(email) ,JSON.parse(password))
            if (newUser instanceof Error) {
                res.json({status:newUser.message})

            }
            else{
                req.headers.authorization = newUser.token 
                req.user = newUser.newUser
                req.body.user = newUser.newUser
                req.body.token = newUser.token 
                //res.json({newUser: newUser.newUser, token: newUser.token})
                next()
            }
                
        }
        else{res.json({status: "Parametros passados incorretamente"})}
        
    }
    async loginUser (req:Request, res:Response) {
        if (req.body.email && req.body.password) {
            const {email,password} = req.body;
            console.log(req.body.email)
            const loggedUser = await userServices.loginUserService(email,password)
            if (loggedUser instanceof Error) {
                res.json({status: loggedUser.message})

            }
            else{
                req.headers.authorization = loggedUser.token 
                res.json(loggedUser)
            }
        }
        else{
            {res.json({status: "Parametros passados incorretamente"})}
        }
    }
    async findUser (req: Request, res: Response) {
        if(req.body.email) {
            const { email } = req.body;
            const hasUser = await userServices.findUserService(email)
            if (hasUser instanceof Error) {
                res.json({status: hasUser.message})
            }
            else{res.json({user:hasUser})}
        }
        else{
            res.json({status: "Parametros passados incorretamente"})
        }
        
    }
    async editUser (req: Request, res: Response) {
        if (req.params.username && req.body.email && req.body.password){
            const {username} = req.params;
            const {email, password} = req.body;
            const user = await userServices.editUserService(username,email,password)
            res.json({status: `Usuario ${username} foi editado`})
            res.json({user})
        }
        else{res.json({status: "Parametros passados incorretamente"})}
    }
    async deleteUser (req: Request, res: Response) {
        if (req.params.username) {
            const {username} = req.params;
            await userServices.deleteUserService(username)
            res.json({status: `Usuario ${username} foi deletado`})
        }
        else{res.json({status: "Parametros passados incorretamente"})}
    }
    
    }

export default new usersController;