// Question 2 a
let givenArray = ["Sunday "," Monday ",
" Tuesday","Wednesday "," Thursday "," Friday",
"Saturday "];

let outputArray=[]

givenArray.forEach(element=>{
    let trimmed = element.trim();
    outputArray.push(trimmed.substring(0,3).toUpperCase())
})

console.log(outputArray)