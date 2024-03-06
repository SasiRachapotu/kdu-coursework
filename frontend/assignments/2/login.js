let inputUsername = document.querySelector("#username");
let loginPassword = document.querySelector("#password");

let loginButton = document.querySelector("#login-button");


let currentUser;
loginButton?.addEventListener("click", (e) => {
  loginFunction();
});

async function loginFunction(){
  let username = inputUsername.value;
  let pass = loginPassword.value;

  const url = "http://localhost:3000/api/user/login";
  const data = {
    email: username,
    password: pass,
  };

  let res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  let jsonres = await res.json();
  let msgCnt =  document.querySelector(".msg-container");
  msgCnt.style.fontSize="1.2rem";
  if(jsonres.status === 404){
    msgCnt.innerText ="User not found"
    msgCnt.style.color="red";
  }
  else if(jsonres.status === 401){
    msgCnt.innerText ="Invalid Password"
    msgCnt.style.color="red";
  }
  else{
    currentUser = jsonres.user[0];
    msgCnt.innerText =`Successful login ${currentUser.user_email_id}`
    msgCnt.style.color="green";
    window.location.href = `Home.html?username=${currentUser.user_email_id}`;
  }
  console.log(jsonres);
}

