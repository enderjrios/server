import express from "express";
import morgan from 'morgan';
import cors from 'cors';
import {Server as SocktServer} from 'socket.io';
import {join, dirname} from 'path';
import http from 'http';
import {fileURLToPath} from 'url';
import {PORT} from './config.js'

//initialization
const app = express()
const server = http.createServer(app)
const io = new SocktServer(server,{
	cors:{
		origin:"*"
	}
})

const __dirneme=dirname(fileURLToPath(import.meta.url))

//Middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.static(join(__dirneme, './client/dist')))

io.on("connection", (socket)=>{
	console.log(socket.id);
	socket.on("message", (body)=>{
		socket.broadcast.emit("message",{
			body,
			from:socket.id.slice(8)
		})	
		
	})
})

server.listen(PORT)
console.log(`servicio en el puerto:${PORT}`)
