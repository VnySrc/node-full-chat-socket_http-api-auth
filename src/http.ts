import http from "http"
import { Server } from "socket.io"
import express from  "express"

const app = express()
const HttpServer = http.createServer(app)
const io = new Server(HttpServer)

export {app, HttpServer, io}