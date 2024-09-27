const http = require('http');
const fs = require('fs');


const PORT = 3000;
const NAME = 'Sasi';

const httpServer = http.createServer((req,res)=>{

    if(req.method==='GET' && req.url ==='/'){
        fs.readFile('test.json','utf8',(err,data)=>{
            if(err){
                res.writeHead(500, {'Content-Type':'text/plain'});
                res.end("Internal server error, was not able to read the given file...");
            }
            else{
                res.writeHead(200,{'Content-Type':'text/plain'});
                let responseText = `Hello, my name is ${NAME}!\nHere is my system information:\n${data}`;
                res.end(responseText);
            }
        });
    }
    else{
        res.writeHead(400, {'Content-Type':'text/plain'});
        res.end("Invalid url not found")
    }
})

httpServer.listen(PORT,()=>{
    console.log(`Server running at port ${PORT}`);
})