let bills =[140,45,280];

function tipCalculator(bills){
    let tips=[]
    let total=[]

    bills.forEach(element => {
        if(element<50){
            let tip = element * 20 /100;
            tips.push(tip)
            total.push(element+tip);
        }
        else if(element>=50 && element<200){
            let tip = element * 15 /100;
            tips.push(tip)
            total.push(element+tip)
        }
        else{
            let tip = element * 10 /100;
            tips.push(tip)
            total.push(element+tip)
        }
        
    });

    return([tips,total])
}

let ans = tipCalculator(bills);

console.log("tips array: "+ans[0])
console.log("Total array: "+ans[1])