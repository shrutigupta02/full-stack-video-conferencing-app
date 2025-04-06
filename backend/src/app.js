import express from "express"
import {createServer} from "node:http"
import {Server} from "socket.io"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from 'dotenv'
import { connectToSocket } from "./controllers/socketManager.js"

dotenv.config()

const app = express()
const server = createServer(app)
const io = connectToSocket(server)

app.set("port", process.env.PORT || 1234)
app.use(cors())
app.use(express.json({limit:"40kb"}))
app.use(express.urlencoded({limit:"40kb", extended:true}))

app.get('/home', (req, res) => {
    res.send("Home")
})

const start = async () => {
    app.set("mongo_user")
        const connectionDb = await mongoose.connect(process.env.DB_CONNECT_STRING)
        server.listen(app.get("port"), ()=>{
            console.log("app listening on 1234")
        })
}

start()