// class for products
class product{
    constructor(type,color,size,price){
        this.type=type;
        this.color=color;
        this.size=size;
        this.price=price;
    }
}

let shoe1= new product("shoe","blue",11,15000);
let shoe2= new product("shoe","green",10,25000);
let shirt1= new product("shirt","blue",32,15000);
let shirt2= new product("shirt","black",34,30000);
let shirt3= new product("shirt","blue",32,55000);

let shoes = [shoe1,shoe2]
let shirts =[shirt1,shirt2,shirt3]

// a
let wareHouse =[]

// wareHouse.push(shoe1)
// wareHouse.push(shoe2)
// wareHouse.push(shirt1)
// wareHouse.push(shirt2)
// wareHouse.push(shirt3)

wareHouse=[...shoes,...shirts]

console.log(wareHouse)

//b
let totalSum =0;
wareHouse.forEach((element)=>{
    totalSum+=element.price;
})

console.log("Total worth: "+ totalSum)

//c

wareHouse.sort((a,b)=>b.price-a.price);
console.log(wareHouse)

//d
console.log("All the elements that are blue: ")
wareHouse.forEach((element)=>{
    if(element.color === "blue"){
        console.log(element);
    }
})
