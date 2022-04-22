import { NextFunction, Request, Response } from "express"
import chatServices from "../services/chatServices"
import { User } from "../models/UsersModel"
import path from "path"
class chatController {
   async avatarUpload (req: Request, res: Response, next: NextFunction) { 
        if (req.file && req.body.username) {
            console.log(req.body.username)
            const file = req.file
            const userEmailForRenameAvatarImage = req.body.email
            const avatarFile = await chatServices.avatarUploadService(file, userEmailForRenameAvatarImage)
            req.body.avatar = avatarFile
            res.json({newUser: req.user, Avatar: req.body.avatar, token: req.body.token })
            // ssalvar avatar img no database
           const hasUser = await User.findOne({where:{email: req.body.user.email}})
           if (hasUser) {
            hasUser.avatar = req.body.avatar
            await hasUser.save()
           }
        }
        else{res.send(new Error ("Imagem do avatar invalida"))}
    }
    async renderChat (req: Request, res: Response, next: NextFunction) {
        res.redirect("http://127.0.0.1:3000/views/chat.html")
     }
     
   async renderLogin (req: Request, res: Response, next: NextFunction) {
       res.redirect("http://127.0.0.1:3000/views/index.html")
    }
}

export default new chatController