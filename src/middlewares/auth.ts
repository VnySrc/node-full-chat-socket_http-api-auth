import { Request, Response, NextFunction } from "express"
import passport from "passport"
import {Strategy as JWTEstrategy, ExtractJwt} from "passport-jwt"
import dotenv from "dotenv"
import {User} from "../models/UsersModel"

dotenv.config()

const JWTAcessDeinedError = {
    status: "Acesso Negado!"
}
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY as string,
}


passport.use(new JWTEstrategy(options, async (payload, done) => {
    const user = await User.findOne({where:{email: payload.email}})
    if (user) {
       return done(null, user)
    }
    else{
       return done(JWTAcessDeinedError, false)
    }
}))

export const privateRoute = (req: Request, res: Response, next: NextFunction) => {
    const authentcateFunction = passport.authenticate("jwt",(err,user) => {
        if (user) {
            req.user = user
            next()
        }
        else{
            // res.json(JWTAcessDeinedError)
            res.json(JWTAcessDeinedError)
        }
    }) 
    authentcateFunction(req,res,next)
}
