player = {
  firstName: "Leo",
  lastName: "Messi",
  address: {
    country: "Spain",
    city: "Barcelona",
  },
  careerInfo: {
    fcBarcelona: {
      appearances: 780,
      goals: {
        premierLeagueGoals: 590,
        championsLeagueGoals: 50,
      },
    },
  },
};

// a all the keys
console.log("All the keys are given below: ");

function getAllKeys(target){
    let keys =[]
    for(let i in target){
        if(typeof target[i] === "object"){
            keys.push(i);
            temp = getAllKeys(target[i])
            for (let j of temp){
                keys.push(j)
            }
        }
        else{
            keys.push(i);
        }
    }

    return keys;
}

console.log(getAllKeys(player))


// b
function getAllValues(target){
    let values =[]
    for(let i in target){
        if(typeof target[i] === "object"){
            temp = getAllValues(target[i])
            for (let j of temp){
                values.push(j)
            }
        }
        else{
            values.push(target[i]);
        }
    }

    return values;
}
console.log("All the values are: ")

console.log(getAllValues(player));


