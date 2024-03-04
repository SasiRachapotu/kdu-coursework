const express = require('express');
const stocks = require('./data/stocks');

const http = require('http');
const socketIo = require('socket.io')

const cors = require('cors');
const transacions = require('./data/transactions');

const app = express();
const server = http.createServer(app);

const io = new socketIo.Server(server,{
    cors:{
        origin:"http://127.0.0.1:5500"
    }
})
app.use(express.json())
app.use(cors())

io.on("connection",(socket)=>{
    console.log("New connection established...");
    setInterval(()=>{
        io.emit("stock-update",parseFloat(Math.random()*(500-100)+100).toFixed(2));
    },5000)
    
})



app.get("/stocks",(req,res)=>{
    res.status(200).json({stockdetails:stocks});
})

app.post("/transaction",(req,res)=>{
    let transaction = req.body;
    console.log(transaction);
    transacions.push(transaction)
    res.status(201).json(transacions)
})

app.get("/transaction",(req,res)=>{
    res.status(200).json(transacions);
})

server.listen(3000,()=>{
    console.log(`Server listening on port ${3000}`);
})