inputString = '{"firstName":"Alex","lastName":"Hunter","email":"alex@yahoo.com","age":24, "city":"london", "country":"england"}'

//a
const obj = JSON.parse(inputString, function(key, value) {
  if (key.toLowerCase() !== "email") {
    // console.log(key + " " + value);
    return typeof value === 'string' ? value.toUpperCase() : value;
  } else {
    return value;
  }
});

console.log(obj);

let newJson ={

}

console.log(obj)


//b
for(let i in obj){
    if(i!="email"){
        newJson[i]=obj[i];
    }
}

console.log(JSON.stringify(newJson))