const posts =[
    {
        id:1,
        title:"Post 1",
        content:"Hello I am sasi and this is my first post",
        userId:"1"
    },
    {
        id:2,
        title:"Post 2",
        content:"Hello I am sasi this is my second post",
        userId:"1"
    },
    {
        id:3,
        title:"Post 3",
        content:"Hello I am sasi this is my third post",
        userId:"1"
    },
    {
        id:4,
        title:"Post 4",
        content:"Hello I am laxmi this is my first post",
        userId:"3"
    },
    {
        id:5,
        title:"Post 5",
        content:"Hello I am venkatesh this is my first post",
        userId:"2"
    },
    {
        id:6,
        title:"Post 6",
        content:"This is sasi and posting a random tweet tonight!!",
        userId:"1"
    },
    {
        id:7,
        title:"Post 7",
        content:"This is venkatesh and I am here to tell you that this is a random tweet",
        userId:"2"
    },
    {
        id:8,
        title:"Post 8",
        content:"Hello I am gopalakrishna",
        userId:"4"
    },
    {
        id:9,
        title:"Post 9",
        content:"Hello I am laxmi, new post",
        userId:"3"
    },
    {
        id:10,
        title:"Post 10",
        content:"Hello I am Kusuma this is my first post",
        userId:"5"
    }
]

function getPostsByPageNumberAndSize(pgno,size){
    return posts.slice((pgno-1)*size,(pgno-1)*size+size);
}

function getPostById(id){
    return posts.filter((post)=>post.id===id);
}

module.exports={posts,getPostsByPageNumberAndSize,getPostById};