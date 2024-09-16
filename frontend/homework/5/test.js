// test.js

const btn = document.getElementById("btn");

btn.addEventListener("click", addTodoFunc);

function addTodoFunc() {
    let input = document.getElementById("input");
    let value = input.value;

    if (value.trim() === "") {
        alert("Please enter a valid todo");
        return;
    }

    let newEle = document.createElement("li");
    newEle.innerText = value;

    let newCheck = document.createElement("input");
    newCheck.type = "checkbox";
    newCheck.classList.add("list-comp")

    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("dlt")
    deleteBtn.classList.add("list-comp")
    deleteBtn.innerText = "delete";
    deleteBtn.addEventListener("click",(e)=>{
        e.target.parentElement.remove();
    })

    newEle.appendChild(newCheck);
    newEle.appendChild(deleteBtn);
    newEle.classList.add("list-element")

    let unolist = document.querySelector(".unordered-list");
    unolist.appendChild(newEle);

    input.value = "";
}
