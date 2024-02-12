const OSMethod = require("./q1");
const fs = require('fs')


let requiredjson = OSMethod()
console.log(requiredjson);

//(ii)
fs.writeFile(__dirname+"/test.json",JSON.stringify(requiredjson),'utf8',(err)=>{
    if(err){
        console.log(err);
    }
})