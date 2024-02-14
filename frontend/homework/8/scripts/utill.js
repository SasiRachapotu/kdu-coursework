const socket = io("http://localhost:3000");
        const messageInput = document.getElementById("msgInput");
            const sendButton = document.getElementById("sendMessage");
            const outputMessages = document.getElementById("messages");

            sendButton.disabled=true;
            sendButton.style.cursor="default";
            function addMessage(from,message){
                if(from==='user'){
                    let messageDiv = document.createElement('div');
                    messageDiv.classList.add('message-div');

                    let profileContainer = document.createElement('div');
                    profileContainer.classList.add('profile-container');

                    let profileImage = document.createElement('div');
                    profileImage.classList.add('profile-image');
                    profileImage.innerText='U';

                    profileContainer.append(profileImage);

                    messageDiv.append(profileContainer);

                    let messageContent= document.createElement('div');
                    messageContent.classList.add('message-content');

                    messageContent.innerText=message;

                    messageDiv.append(messageContent);

                    outputMessages.append(messageDiv);
                    outputMessages.scrollTop=outputMessages.scrollHeight;
                }
                else{
                    let messageDiv = document.createElement('div');
                    messageDiv.classList.add('message-div-you');

                    let profileContainer = document.createElement('div');
                    profileContainer.classList.add('profile-container');

                    let profileImage = document.createElement('div');
                    profileImage.classList.add('profile-image');
                    profileImage.innerText='Y';

                    profileContainer.append(profileImage);

                    messageDiv.append(profileContainer);

                    let messageContent= document.createElement('div');
                    messageContent.classList.add('message-content');

                    messageContent.innerText=message;

                    messageDiv.append(messageContent);

                    outputMessages.append(messageDiv);
                    outputMessages.scrollTop=outputMessages.scrollHeight;
                 
                }
            }

            messageInput.addEventListener('input',(e)=>{
                if(e.target.value===''){
                    sendButton.disabled=true;
                    // sendButton.classList.add("inactive-button")
                    sendButton.style.cursor="default";
                    console.log(sendButton.classList);
                }
                else{
                    sendButton.disabled=false;
                    // sendButton.classList.remove("inactive-button")
                    sendButton.style.cursor="pointer";
                }
            })
            sendButton.addEventListener("click",()=>{
                const message = messageInput.value;
                socket.emit("message",message);
                addMessage("you",message)
                messageInput.value='';
                sendButton.disabled=true;
            })

            socket.on("new-message",(message)=>{
                addMessage("user",message);
            })