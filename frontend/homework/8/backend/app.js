const express = require('express');
const cors = require('cors')
const http = require('http');

const socketIo = require('socket.io')


const app=express();
const server = http.createServer(app);
const io = new socketIo.Server(server,{
    cors:{
        origin:"http://127.0.0.1:5500"
    }
});

app.use(cors());
app.use(express.json())

app.get("/",(req,res)=>{
    res.status(200).json({
        msg:"Hello this is sasi"
    })  

})

let mapClientIdwithNumber=new Map();;
let numberOfClients=0;
io.on("connection",(socket)=>{
    numberOfClients+=1;
    mapClientIdwithNumber.set(socket.id,numberOfClients);
    console.log("New user connected");

    // io.emit("message","Welcome to the chat by chatbot")
    socket.on("message",(payload)=>{
        console.log("New message from one of the client: I am C"+mapClientIdwithNumber.get(socket.id))
        console.log("payload:",payload);
        io.except(socket.id).emit('new-message',payload);
        // socket.broadcast('new-message',payload)
    })
})

server.listen(3000,()=>{
    console.log("listening on port 3000");
})