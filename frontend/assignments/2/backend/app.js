const express = require('express');
const cors = require('cors');
const http = require("http");
const socketIo = require("socket.io")

let activeUsers =[];

const {users, getUserByUsername,getUserByEmailId} = require('./data/users')

const {posts, getPostsByPageNumberAndSize,getPostById} = require('./data/posts');
const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = new socketIo.Server(server,{
    cors:{
        origin:"http://127.0.0.1:5500"
    }
})

app.use(express.json());
app.use(cors());


io.on("connection",(socket)=>{
    console.log("New connection established");

    socket.on("joinchat",(username)=>{

        socket.broadcast.emit("userJoined",username);
        console.log(username);
        let currentUser = getUserByUsername(username);
        activeUsers.push({
            user:currentUser[0].id,
            socketId:socket.id
        })
        console.log(activeUsers);
        io.emit("updateUserList",activeUsers);

    })


    socket.on("disconnect",()=>{
        console.log("disconnected");
        let currentUser = activeUsers.filter((au)=>au.socketId===socket.id);
        io.emit("userLeft",currentUser[0]);

        activeUsers=activeUsers.filter((au)=>au.socketId!==socket.id);
        console.log(activeUsers);

        io.emit("updateUserList",activeUsers);
    })

    socket.on("privateMessage",(messageDetails)=>{
        console.log(messageDetails);
        io.to(messageDetails.currentActiveMessager).emit("receivePrivateMessage",{
            sender:messageDetails.socketId,
            message:messageDetails.inputValue
        })
    })
})




app.get("/",(req,res)=>{
    res.send("hello testing apis");
})

app.post("/api/user/login",(req,res)=>{
    let {email, password} = req.body;
    let user = getUserByEmailId(email);
    if(user.length===0){
        res.status(404).json({
            msg:"User not found",
            status:404
        })
    }
    else if(user[0].password !== password){
        res.status(401).json({
            msg:"Invalid password please check!!",
            status:401
        })
    }
    else{
        res.status(200).json({
            msg:"Login successful",
            user,
            status:200
        })
    }
})

app.get("/:id",(req,res)=>{
    let user = getUserByEmailId(req.params.id);
    if(user.length===0){
        res.status(404).json({
            msg:"User not found"
        })
    }
    else{
        res.status(200).json(user);
    }
})

app.get("/api/posts",(req,res)=>{
    let pgno = parseInt(req.query.pageNumber);
    let pageSize = parseInt(req.query.pageSize);
    res.status(200).json(getPostsByPageNumberAndSize(pgno,pageSize));

})

app.get("/api/users",(req,res)=>{
    console.log(users);
    res.status(200).json(users);
})

app.post("/api/posts",(req,res)=>{
    let post = req.body;
    post.id=posts.length+1;
    posts.push(post)
    console.log(post);
    res.status(201).json(posts)
})

app.get("/api/post",(req,res)=>{
    let id = parseInt(req.query.id);
    res.status(200).json(getPostById(id));

})

server.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
})