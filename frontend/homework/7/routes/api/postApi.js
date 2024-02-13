const express = require('express');
const uuid = require('uuid');
const posts = require('../../data/posts');

const router = express.Router();

router.get("/",(req,res)=>{
    res.status(200).json(posts);
})

router.post("/",(req,res)=>{
    let {userId,content} = req.body;
    let id = uuid.v4();

    let newPost = {
        id,userId,content
    }
    console.log(newPost);
    posts.push(newPost);

    res.status(201).json(newPost)
})

router.get("/:id",(req,res)=>{
    let reqId = req.params.id;
    let post = posts.filter((u)=>u.id=== reqId);

    if(post.length===0){
        res.status(404).json({
            "message":"User not found",
            "status code":"404"
        })
    }

    console.log(post);
    res.json(post);
})

router.get("/user/:id",(req,res)=>{
    let requestUserId = req.params.id;
    let post = posts.filter(p=> p.userId=== parseInt(requestUserId));

    if(post.length===0){
        res.status(404).json({
            "message":"No posts for the provided user!!"
        })
    }
    else{
        res.status(200).json(post);
    }
})


module.exports = router;