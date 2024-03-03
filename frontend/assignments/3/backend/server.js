const express = require('express')
const http = require('http');
const socketIo = require('socket.io')
const cors = require('cors');

const app = express();
const server = http.createServer(app);

const io = new socketIo.Server(server,{
    cors:{
        origin:"http://localhost:5175"
    }
})

app.use(cors());
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("hello")
})

io.on("connection",(socket)=>{
    console.log("New connection established...");

    socket.on("join room",(data)=>{
        console.log(data);
        socket.join(data.room)
    })

    socket.on("buy-transaction",(data)=>{
        console.log(data);
        socket.broadcast.emit("stock-bought",data);
    })

    setInterval(()=>{
        const randomValue = Math.floor(Math.random() * (500 - 100 + 1)) + 100;
        socket.emit("stock-price-update",randomValue)
    },5000)
    

})


server.listen(3000,()=>{
    console.log("listening on port 3000");
})