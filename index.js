import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';
import http from 'http';


// create server 
const app = express();

const server = http.createServer(app);

// create a socket server
const io = new Server(server, {
    cors:{
        origin:"*",
        methods:["GET", "POST"]
    }
});

app.use(express.static('./'));


io.on('connection', (socket)=>{
    // when new user joined chatroom
    socket.on('newuser', (username)=>{
        socket.broadcast.emit('update', `${username} joined the conversation`);
    });

    // when existing user left chatroom
    socket.on('existuser', (username)=>{
        socket.broadcast.emit('update', `${username} left the conversation`);
    });

    // broadcast the message
    socket.on('chat', (message)=>{
        socket.broadcast.emit('chat', message);
    });
});


app.get('/', (req, res) => {
    res.sendFile('index.html')
});


export default server;