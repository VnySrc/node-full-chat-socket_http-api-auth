import express, {Request, Response} from "express"
import cors from "cors"
import dotenv from "dotenv"
import path from "path"
import {app, HttpServer } from "./http"
import Routes from "../src/routes/routes"
import "./webSocket"

dotenv.config()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.engine('html', require('ejs').renderFile);
app.set('views','public/views')

app.use(express.static(path.resolve("public")))

app.use(Routes)

/*app.use("/", (req, res) => {
    res.send("Endpoint nao existe")
})*/

HttpServer.listen(process.env.SERVER_PORT, () => {
    console.log(`Server Funcionando na Porta ${process.env.SERVER_PORT}` || "Insira uma porta em .env")
})

