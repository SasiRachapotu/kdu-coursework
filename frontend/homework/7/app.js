const express = require('express');
const app = express();
const cors = require('cors')

const postApi = require('./routes/api/postApi');

const PORT = process.env.PORT || 3000;


app.use(express.json())
app.use(cors())

app.use("/api/posts",postApi);

app.get("/",(req,res)=>{
    res.send("Hello World!!");
})


app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
})

