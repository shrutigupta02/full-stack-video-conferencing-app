import express from "express"
import {createServer} from "node:http"
import {Server} from "socket.io"
import mongoose from "mongoose"
import cors from "cors"

const app = express()

app.listen(1234, ()=>{
    console.log("app listening on 1234")
})