// Socket connection
const socket = io("http://localhost:3000");

//variables to save data of current users and all users 
let currentUser;
let allUsers;

// Inital page numbers for making paginated api calls 
let pageNumber = 1;
let pageSize = 5;
let pageNumberM = 1;
let pageSizeM = 5;

// The variable to store the current active chat
let currentActiveMessager;

// Self executing function which executes every time
(async () => {

  // url params to take the current user from login page to home page
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get("username");

  // retrieve the data of current user for profile image and all other data
  let res1 = await fetch(`http://localhost:3000/${username}`);
  let res2 = await res1.json();
  currentUser = res2[0];

  //socket used for telling user joined
  socket.emit("joinchat", currentUser.user_name);

  let usersResponse = await fetch(`http://localhost:3000/api/users`);
  let usersResponse2 = await usersResponse.json();
  allUsers = usersResponse2;


  // changing details according to the current user like id, name and profile icon
  let desktopFullName = document.querySelector(".full-name");
  let desktopUserId = document.querySelector(".userid");
  desktopFullName.innerText = currentUser.user_name;
  desktopUserId.innerText = `@${currentUser.user_name}`;
  let photo = document.querySelector(".photo");
  photo.style.backgroundImage = `url("${currentUser.profile_url}")`;

  let tweetProfileImage = document.querySelector("#tweet-profile-image-id-1");
  tweetProfileImage.style.backgroundImage = `url("${currentUser.profile_url}")`;

  let mobileProfileImage = document.querySelector("#mobile-profile-image-id");
  mobileProfileImage.style.backgroundImage = `url("${currentUser.profile_url}")`;

  let navProfilePartImage = document.querySelector(
    "#nav-profile-part-image-id"
  );
  navProfilePartImage.style.backgroundImage = `url("${currentUser.profile_url}")`;

  let navProfilePartName = document.querySelector(".nav-profile-part-name");
  navProfilePartName.innerText = `${currentUser.user_name}`;

  let navProfilePartId = document.querySelector(".nav-profile-part-id");
  navProfilePartId.innerText = `@${currentUser.user_name}`;

  let mobilePostImageId = document.querySelector("#mobile-post-image-id");
  mobilePostImageId.style.backgroundImage = `url("${currentUser.profile_url}")`;

  let mobilePostMainNameId = document.querySelector(
    "#mobile-post-main-name-id"
  );
  mobilePostMainNameId.innerText = `${currentUser.user_name}`;

  let mobilePostIdTime = document.querySelector("#mobile-post-id-time");
  mobilePostIdTime.innerText = `@${currentUser.user_name} · 1s`;

  let tweetProfileImageId = document.querySelector("#tweet-profile-image-id");
  tweetProfileImageId.style.backgroundImage = `url("${currentUser.profile_url}")`;

  let mobileChatProfileImage = document.querySelector(
    ".mobile-chat-profile-image"
  );
  mobileChatProfileImage.style.backgroundImage = `url("${currentUser.profile_url}")`;

  //fetch posts function from backend the posts are retrieved
  fetchallPosts();
  fetchallPostsMobile();
})();


let gallery = document.querySelector("#gallery-d");
let fileInputId = document.querySelector("#theFileInput");


gallery.addEventListener("click",()=>{
  console.log("clicked");
  fileInputId.click();
})

let fileNew=null;
let urlNew=null;
fileInputId.addEventListener("change",(e)=>{
  fileNew=e.target.files[0];
  urlNew= window.URL.createObjectURL(fileNew);
})


let gifAdder = document.querySelector("#gif-desktop");
gifAdder.addEventListener("click",()=>{
  console.log("clicked");
  fileInputId.click();
})




// When a new user joins 
socket.on("userJoined", (username) => {
  console.log(`New User joined ${username}`);
});

// when a user logs out, basically disconnects
socket.on("userLeft", (user) => {
  console.log(user);
  console.log(`The user left : ${allUsers[parseInt(user.user) - 1].user_name}`);
});

// All active users 
let activeusers;
let chatProfiles = document.querySelector(".chat-profiles");

let desktopChatHeading = document.querySelector("#desktop-chat-heading");

let chatMessagesContainer = document.querySelector("#chat-messages-container");

// Maps to store the active users and their containers
const containerMap = new Map();

const mobileContainerMap = new Map();

// on click on the profiles the chats are opened 
function changeChatSettings(user, sender) {
  currentActiveMessager = sender.socketId;
  console.log(user);

  let personalChatAcctName = document.querySelector(".personal-chat-acct-name");
  personalChatAcctName.innerText=`${user.user_name}`;
  desktopChatHeading.innerText = `${user.user_name}`;
  console.log(sender);
  let allChatMessageContainers = document.querySelectorAll(
    ".chat-messages-container"
  );

  let allPersonalMessageContainers = document.querySelectorAll(".personal-messages");
  allPersonalMessageContainers.forEach((z)=>{
    z.style.display="none";
  })
  allChatMessageContainers.forEach((x) => {
    x.style.display = "none";
  });

  if (containerMap.has(sender.socketId)) {
    containerMap.get(sender.socketId).style.display = "flex";
    console.log(containerMap.get(sender.socketId));
  } else {
    let chatMessagesContainer = document.createElement("div");
    chatMessagesContainer.classList.add("chat-messages-container");
    chatMessagesContainer.id = sender.socketId;
    let desktopChatWindow = document.querySelector(".desktop-chat-window");
    desktopChatWindow.append(chatMessagesContainer);
    containerMap.set(sender.socketId, chatMessagesContainer);
  }
  console.log(socket.id);

  if(mobileContainerMap.has(sender.socketId)){
    mobileContainerMap.get(sender.socketId).style.display = "flex";
    console.log(mobileContainerMap.get(sender.socketId));
  }
  else{
    let personalMessages = document.createElement("div");
    personalMessages.classList.add("personal-messages");
    personalMessages.id = sender.socketId;
    let personalMessageContainer = document.querySelector(".personal-message-container");
    personalMessageContainer.append(personalMessages);
    mobileContainerMap.set(sender.socketId, personalMessages);
  }
}

// posting of chats, send buttons and their on click listeners

let chatSendButton = document.querySelector("#chat-send-button");
let chatWindowInput = document.querySelector("#chat-window-input");
chatSendButton.addEventListener("click", (e) => {
  sendButtonForChathandler();
});


let mobilechatSendButton= document.querySelector("#mobile-chat-send-button");

mobilechatSendButton.addEventListener("click",(e)=>{
  sendButtonForChathandler();
})
let mobileChatWindowInput = document.querySelector("#mobile-chat-window-input");


// On click of send the handling of chat messages 

function sendButtonForChathandler(){
  let inputValue = chatWindowInput.value;
  chatWindowInput.value = "";

  let mobileInputValue = mobileChatWindowInput?.value;
  mobileChatWindowInput.value="";
  if(inputValue===""){
    inputValue=mobileInputValue;
  }

  if(mobileInputValue===""){
    mobileInputValue=inputValue;
  }
  let recieverMessageMobile=document.createElement("div");
  recieverMessageMobile.classList.add("reciever-message-mobile");
  recieverMessageMobile.innerText= mobileInputValue;

  mobileContainerMap.get(currentActiveMessager)?.append(recieverMessageMobile);
  let mobileTimeDiv = document.createElement("div");
  mobileTimeDiv.classList.add("time-mobile");
  mobileTimeDiv.style.alignSelf="flex-end";
  mobileTimeDiv.innerText =`${new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
  mobileContainerMap.get(currentActiveMessager)?.append(mobileTimeDiv);


  let recieverMessage = document.createElement("div");
  recieverMessage.classList.add("reciever-message");
  recieverMessage.innerText = inputValue;
  containerMap.get(currentActiveMessager).append(recieverMessage);
  let timeDiv = document.createElement("div");
  timeDiv.classList.add("time");
  timeDiv.style.alignSelf = "flex-end";
  timeDiv.innerText = `${new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
  containerMap.get(currentActiveMessager).append(timeDiv);
  if (currentActiveMessager !== socket.id) {
    socket.emit("privateMessage", {
      currentActiveMessager,
      socketId: socket.id,
      inputValue,
    });
  }
}

// socket on recieving a private message to a particular socket id

socket.on("receivePrivateMessage", (details) => {
  console.log(details);
  // {sender: 'BgUPKqbYHa7LjtrKAACf', message: 'details'}
  let senderMessage = document.createElement("div");
  senderMessage.classList.add("sender-message");
  senderMessage.innerText = details.message;
  containerMap.get(details.sender).append(senderMessage);
  let timeDiv = document.createElement("div");
  timeDiv.classList.add("time");
  timeDiv.style.alignSelf = "flex-start";
  timeDiv.innerText = `${new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
  containerMap.get(details.sender).append(timeDiv);


  let senderMessageMobile = document.createElement("div");
  senderMessageMobile.classList.add("sender-message-mobile");
  senderMessageMobile.innerText=details.message;
  mobileContainerMap.get(details.sender).append(senderMessageMobile);

  let mobileTimeDiv = document.createElement("div");
  mobileTimeDiv.classList.add("time-mobile");
  mobileTimeDiv.style.alignSelf = "flex-start";
  mobileTimeDiv.innerText = `${new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
  mobileContainerMap.get(details.sender).append(mobileTimeDiv);

});

// update active users on update user list, whenever the new user logs in or old user logs off
socket.on("updateUserList", (activePeople) => {
  chatProfiles.innerHTML = "";
  activeusers = activePeople;
  console.log(activeusers);
  let count = 0;
  let allChatMessageContainers = document.querySelectorAll(
    ".chat-messages-container"
  );
  allChatMessageContainers.forEach((x) => {
    x.style.display = "none";
    x.style.border = "none";
  });
  let mobilechatProfiles = document.querySelector(".mobile-chat-profiles");
  mobilechatProfiles.innerHTML="";
  for (let i of activeusers) {
    count++;

    // this is for mobile view
    let mobilechatProfiles = document.querySelector(".mobile-chat-profiles");
    let mobileChatProfileTemplate = document.createElement("div");
    mobileChatProfileTemplate.classList.add("mobile-chat-profile-template");

    let mobileChatProfileImage = document.createElement("div");
    mobileChatProfileImage.classList.add("mobile-chat-profile-image");
    mobileChatProfileImage.classList.add("mobile-chat-profile-item");
    mobileChatProfileImage.style.backgroundImage = `url("${
      allUsers[parseInt(i.user) - 1].profile_url
    }")`;

    let mobileChatProfileName = document.createElement("div");
    mobileChatProfileName.classList.add("mobile-chat-profile-name");
    mobileChatProfileName.classList.add("mobile-chat-profile-item");
    mobileChatProfileName.innerText = `${
      allUsers[parseInt(i.user) - 1].user_name
    }`;

    let mobileChatProfileId = document.createElement("div");
    mobileChatProfileId.classList.add("mobile-chat-profile-id");
    mobileChatProfileId.classList.add("mobile-chat-profile-item");
    mobileChatProfileId.innerText = `@${
      allUsers[parseInt(i.user) - 1].user_name
    }`;

    mobileChatProfileTemplate.appendChild(mobileChatProfileImage);
    mobileChatProfileTemplate.appendChild(mobileChatProfileName);
    mobileChatProfileTemplate.appendChild(mobileChatProfileId);

    let personalMessageContainer = document.querySelector(
      ".personal-message-container"
    );
    mobileChatProfileTemplate.addEventListener("click", (e) => {
      console.log("mobile message clicked...");
      mobileMessageOpener();
      changeChatSettings(allUsers[parseInt(i.user) - 1], i)
    });

    let backButtonPersonalChat = document.querySelector(
      ".back-button-personal-chat"
    );
    backButtonPersonalChat.addEventListener("click", (e) => {
      personalMessageContainer.style.display = "none";
      let mobileChatApp = document.querySelector(".mobile-chat-app");
      mobileChatApp.style.display = "block";
    });
    function mobileMessageOpener() {
      personalMessageContainer.style.display = "block";
      let mobileChatApp = document.querySelector(".mobile-chat-app");
      mobileChatApp.style.display = "none";
      let floatingTweetBoxIcon = document.querySelector(
        ".floating-tweet-box-icon"
      );
      floatingTweetBoxIcon.style.display = "none";
    }

    mobilechatProfiles.append(mobileChatProfileTemplate);

    if(mobileContainerMap.has(i.socketId)){
      mobileContainerMap.get(i.socketId).style.display = "none";
      console.log(mobileContainerMap.get(i.socketId));
    }
    else{
      let personalMessages = document.createElement("div");
      personalMessages.classList.add("personal-messages");
      personalMessages.id = i.socketId;
      let personalMessageContainer = document.querySelector(".personal-message-container");
      personalMessages.style.display="none";
      personalMessageContainer.append(personalMessages);
      mobileContainerMap.set(i.socketId, personalMessages);
    }
    if (count == 1) {
      desktopChatHeading.innerText = `${
        allUsers[parseInt(i.user) - 1].user_name
      }`;
      if (containerMap.has(i.socketId)) {
        containerMap.get(i.socketId).style.display = "flex";
        console.log(containerMap.get(i.socketId));
      } else {
        let chatMessagesContainer = document.createElement("div");
        chatMessagesContainer.classList.add("chat-messages-container");
        chatMessagesContainer.id = i.socketId;
        let desktopChatWindow = document.querySelector(".desktop-chat-window");
        desktopChatWindow.append(chatMessagesContainer);
        containerMap.set(i.socketId, chatMessagesContainer);
      }

      // this is for desktop view
      currentActiveMessager = i.socketId;
      let chatProfileTemplate = document.createElement("div");
      chatProfileTemplate.classList.add("chat-profile-template");
      let chatProfileImage = document.createElement("div");
      chatProfileImage.classList.add("chat-profile-image");
      chatProfileImage.classList.add("chat-profile-item");
      console.log(i.user);
      console.log(allUsers[parseInt(i.user) - 1].profile_url);
      chatProfileImage.style.backgroundImage = `url("${
        allUsers[parseInt(i.user) - 1].profile_url
      }")`;

      let chatProfileName = document.createElement("div");
      chatProfileName.classList.add("chat-profile-name");
      chatProfileName.classList.add("chat-profile-item");
      chatProfileName.innerText = `${allUsers[parseInt(i.user) - 1].user_name}`;

      let chatProfileId = document.createElement("div");
      chatProfileId.classList.add("chat-profile-id");
      chatProfileId.classList.add("chat-profile-item");

      chatProfileId.innerText = `@${allUsers[parseInt(i.user) - 1].user_name}`;

      chatProfileTemplate.appendChild(chatProfileImage);
      chatProfileTemplate.appendChild(chatProfileName);
      chatProfileTemplate.appendChild(chatProfileId);
      chatProfileTemplate.addEventListener("click", (e) => {
        let chatProfileTemplates = document.querySelectorAll(
          ".chat-profile-template"
        );
        chatProfileTemplates.forEach((x) => {
          let children = x.querySelectorAll(".chat-profile-item");
          x.style.backgroundColor = "black";
          x.style.border = "none";
          children.forEach((y) => {
            y.style.backgroundColor = "black";
          });
        });

        let chatProfileTemplates1 = document.querySelectorAll(
          ".chat-profile-template-2"
        );
        chatProfileTemplates1.forEach((x) => {
          let children = x.querySelectorAll(".chat-profile-item-2");
          x.style.backgroundColor = "black";
          x.style.border = "none";
          children.forEach((y) => {
            y.style.backgroundColor = "black";
          });
        });
        chatProfileTemplate.style.backgroundColor = "#202327";
        chatProfileTemplate.style.borderRight = "0.6vh solid #1d9bf0";
        chatProfileTemplate
          .querySelectorAll(".chat-profile-item")
          .forEach((u) => {
            u.style.backgroundColor = "#202327";
          });
        changeChatSettings(allUsers[parseInt(i.user) - 1], i);
      });
      chatProfiles.append(chatProfileTemplate);
    } else {
      if (containerMap.has(i.socketId)) {
        containerMap.get(i.socketId).style.display = "none";
        console.log(containerMap.get(i.socketId));
      } else {
        let chatMessagesContainer = document.createElement("div");
        chatMessagesContainer.classList.add("chat-messages-container");
        chatMessagesContainer.id = i.socketId;
        let desktopChatWindow = document.querySelector(".desktop-chat-window");
        chatMessagesContainer.style.display = "none";
        desktopChatWindow.append(chatMessagesContainer);
        containerMap.set(i.socketId, chatMessagesContainer);
      }

      let chatProfileTemplate = document.createElement("div");
      chatProfileTemplate.classList.add("chat-profile-template-2");
      let chatProfileImage = document.createElement("div");
      chatProfileImage.classList.add("chat-profile-image-2");
      chatProfileImage.classList.add("chat-profile-item-2");
      console.log(i.user);
      console.log(allUsers[parseInt(i.user) - 1].profile_url);
      chatProfileImage.style.backgroundImage = `url("${
        allUsers[parseInt(i.user) - 1].profile_url
      }")`;

      let chatProfileName = document.createElement("div");
      chatProfileName.classList.add("chat-profile-name-2");
      chatProfileName.classList.add("chat-profile-item-2");
      chatProfileName.innerText = `${allUsers[parseInt(i.user) - 1].user_name}`;

      let chatProfileId = document.createElement("div");
      chatProfileId.classList.add("chat-profile-id-2");
      chatProfileId.classList.add("chat-profile-item-2");

      chatProfileId.innerText = `@${allUsers[parseInt(i.user) - 1].user_name}`;

      chatProfileTemplate.appendChild(chatProfileImage);
      chatProfileTemplate.appendChild(chatProfileName);
      chatProfileTemplate.appendChild(chatProfileId);
      chatProfileTemplate.addEventListener("click", (e) => {
        let chatProfileTemplates = document.querySelectorAll(
          ".chat-profile-template-2"
        );
        chatProfileTemplates.forEach((x) => {
          let children = x.querySelectorAll(".chat-profile-item-2");
          x.style.backgroundColor = "black";
          x.style.border = "none";
          children.forEach((y) => {
            y.style.backgroundColor = "black";
          });
        });

        let chatProfileTemplates1 = document.querySelectorAll(
          ".chat-profile-template"
        );
        chatProfileTemplates1.forEach((x) => {
          let children = x.querySelectorAll(".chat-profile-item");
          x.style.backgroundColor = "black";
          x.style.border = "none";
          children.forEach((y) => {
            y.style.backgroundColor = "black";
          });
        });
        chatProfileTemplate.style.backgroundColor = "#202327";
        chatProfileTemplate.style.borderRight = "0.6vh solid #1d9bf0";
        chatProfileTemplate
          .querySelectorAll(".chat-profile-item-2")
          .forEach((u) => {
            u.style.backgroundColor = "#202327";
          });
        changeChatSettings(allUsers[parseInt(i.user) - 1], i);
      });
      chatProfiles.append(chatProfileTemplate);
    }
  }
});


let messagesNavDesktop = document.querySelector("#messages-nav-desktop");
let homeNavDesktop = document.querySelector("#home-nav-desktop");
let tweetSectionDesktopView = document.querySelector(
  "#tweet-section-desktop-view"
);
let desktopChatMessages = document.querySelector("#desktop-chat-messages");

// listeners on navigations
messagesNavDesktop.addEventListener("click", (e) => {
  tweetSectionDesktopView.style.display = "none";
  desktopChatMessages.style.display = "flex";
});

homeNavDesktop.addEventListener("click", (e) => {
  tweetSectionDesktopView.style.display = "block";
  desktopChatMessages.style.display = "none";
});

// Fetch all posts from backend using a fetch api call
async function fetchallPosts() {
  let postsResponse = await fetch(
    `http://localhost:3000/api/posts?pageNumber=${pageNumber}&pageSize=${pageSize}`
  );
  let jsonRes = await postsResponse.json();
  for (let i of jsonRes) {
    addPostDesktop(i.content, allUsers[parseInt(i.userId) - 1], "append",i.imageurl);
  }
  pageNumber++;
}

// fetch all posts from the backend using a fetch api call
async function fetchallPostsMobile() {
  let postsResponse = await fetch(
    `http://localhost:3000/api/posts?pageNumber=${pageNumberM}&pageSize=${pageSize}`
  );
  let jsonRes = await postsResponse.json();
  for (let i of jsonRes) {
    addPostMobile(i.content, allUsers[parseInt(i.userId) - 1], "append");
  }
  pageNumberM++;
}

let postsDesktopViewId = document.querySelector("#posts-desktop-view-id");

// scroll handler to check if the scroll is at the bottom
function isScrollAtBottom(container) {
  const scrollTop = container.scrollTop;
  const containerHeight = container.clientHeight;
  const contentHeight = container.scrollHeight;

  return scrollTop + containerHeight >= contentHeight - 100; // You can adjust the threshold
}

// event listener on scroll, when user scrolls down and reaches bottom new posts are loaded
postsDesktopViewId.addEventListener("scroll", function () {
  if (isScrollAtBottom(postsDesktopViewId)) {
    fetchallPosts(); // Fetch more posts when scrolled to the bottom
  }
});

const tweetBtn = document.querySelector(".tweet-btn-desktop");
tweetBtn.disabled = true;

const postInput = document.querySelector(".post-input-desktop");

// post input event listener, disabling a button whenever input field is filled
postInput.addEventListener("input", (e) => {
  tweetBtn.disabled = e.target.value === "";
});

const postSection = document.querySelector(".posts-desktop-view");

// on click on tweet post request is made
tweetBtn.addEventListener("click", (e) => {
  postRequestOnClickTweetButton();
});

// post request to backend on posting a new tweet
async function postRequestOnClickTweetButton(){
  let tweettext = postInput.value;
  addPostDesktop(tweettext, currentUser, "prepend");
  const postData = {
    title: tweettext,
    content: tweettext,
    userId: currentUser.id,
    imageurl:urlNew
  };
  urlNew=null;

  // API endpoint
  const apiUrl = "http://localhost:3000/api/posts";

  // Fetch API call with POST method
  let res = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });
  let jsonres = await res.json();
  console.log(jsonres);
}

// adding post to frontend on posting a tweet
function addPostDesktop(tweettext, user, appendPrepend,imageurl) {
  let testPost = document.createElement("div");
  testPost.classList.add("testpost");
  let postFirst = document.createElement("div");
  postFirst.classList.add("post-first");
  let postTestProfile = document.createElement("div");
  postTestProfile.classList.add("post-test-profile");
  let postTestProfileImage = document.createElement("div");
  postTestProfileImage.classList.add("post-test-profile-image");
  postTestProfileImage.style.backgroundImage = `url("${user.profile_url}")`;
  postTestProfile.append(postTestProfileImage);
  postFirst.append(postTestProfile);

  let postContent = document.createElement("div");
  postContent.classList.add("post-content");

  let postContentNameId = document.createElement("div");
  postContentNameId.classList.add("post-content-name-id");
  let mainName = document.createElement("div");
  mainName.classList.add("main-name");

  let postContentName = document.createElement("div");
  postContentName.classList.add("post-content-name");
  postContentName.classList.add("post-content-item");
  postContentName.innerText = `${user.user_name}`;

  let postContentId = document.createElement("div");
  postContentId.classList.add("post-content-id");
  postContentId.classList.add("post-content-item");

  postContentId.innerText = `@${user.user_name}`;

  let postContentDot = document.createElement("div");
  postContentDot.classList.add("post-content-dot");
  postContentDot.classList.add("post-content-item");
  postContentDot.innerText = "·";

  let time = document.createElement("div");
  time.classList.add("time");
  time.innerText = "1s";

  mainName.append(postContentName);
  mainName.append(postContentId);
  mainName.append(postContentDot);
  mainName.append(time);

  postContentNameId.append(mainName);

  let newDiv = document.createElement("div");
  newDiv.classList.add("menu-more"); // Add the menu-more class to the div

  // Create an svg element and set its attributes
  let newSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  newSvg.setAttribute("viewBox", "0 0 24 24");
  newSvg.setAttribute("aria-hidden", "true");
  newSvg.classList.add("nav-icons"); // Add the nav-icons class to the svg

  // Create the path element and set its attributes
  let newPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  newPath.setAttribute(
    "d",
    "M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"
  );

  // Append the path to the svg
  newSvg.appendChild(newPath);

  newSvg.style.fill = "white";
  // Append the svg to the div
  newDiv.appendChild(newSvg);

  postContentNameId.append(newDiv);
  postContent.append(postContentNameId);
  let tweetContent = document.createElement("div");
  tweetContent.classList.add("tweet-content");
  tweetContent.innerText = tweettext;
  postContent.append(tweetContent);

  if(urlNew!==null){
    let newImage = document.createElement("img");
    newImage.src = urlNew
    newImage.style.height="250px";
    newImage.style.width="250px";
    postContent.append(newImage);
    console.log(urlNew);
  }

  if(imageurl!==null && imageurl!==undefined){
    let newImage = document.createElement("img");
    newImage.src = imageurl
    newImage.style.height="250px";
    newImage.style.width="250px";
    postContent.append(newImage);
    console.log(urlNew);
    urlNew=null;
  }
  postFirst.append(postContent);

  testPost.append(postFirst);

  let secondHalf = document.createElement("div");
  secondHalf.classList.add("second-half");

  let firstHalfIcons = document.createElement("div");
  firstHalfIcons.classList.add("first-half-icons");

  const commentDiv = document.createElement("div");
  commentDiv.classList.add("comment");

  const commentSVG = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  commentSVG.setAttribute("viewBox", "0 0 24 24");
  commentSVG.setAttribute("aria-hidden", "true");
  commentSVG.classList.add("tweet-post-icon");

  const commentPath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  commentPath.setAttribute(
    "d",
    "M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"
  );

  commentSVG.appendChild(commentPath);
  commentDiv.appendChild(commentSVG);

  firstHalfIcons.append(commentDiv);

  const retweetDiv = document.createElement("div");
  retweetDiv.classList.add("retweet");

  const retweetSVG = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  retweetSVG.setAttribute("viewBox", "0 0 24 24");
  retweetSVG.setAttribute("aria-hidden", "true");
  retweetSVG.classList.add("tweet-post-icon");

  const retweetPath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  retweetPath.setAttribute(
    "d",
    "M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"
  );

  retweetSVG.appendChild(retweetPath);
  retweetDiv.appendChild(retweetSVG);

  firstHalfIcons.append(retweetDiv);

  const likeDiv = document.createElement("div");
  likeDiv.classList.add("like");

  // Create the SVG element for the like icon
  const likeSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  likeSVG.setAttribute("viewBox", "0 0 24 24");
  likeSVG.setAttribute("aria-hidden", "true");
  likeSVG.classList.add("tweet-post-icon", "like-post");

  // Create the path element for the like icon
  const likePath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  likePath.setAttribute(
    "d",
    "M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"
  );

  // Append the path to the SVG
  likeSVG.appendChild(likePath);

  likeSVG.addEventListener("click", likeFunction);
  likeDiv.appendChild(likeSVG);

  // Create the div for the likes count
  const likesCountDiv = document.createElement("div");
  likesCountDiv.classList.add("likes-count");
  likesCountDiv.innerText = "0"; // Initial likes count

  // Append the like icon and likes count to the container
  likeDiv.appendChild(likesCountDiv);

  firstHalfIcons.append(likeDiv);

  const statsDiv = document.createElement("div");
  statsDiv.classList.add("stats");

  // Create the SVG element for the stats icon
  const statsSVG = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  statsSVG.setAttribute("viewBox", "0 0 24 24");
  statsSVG.setAttribute("aria-hidden", "true");
  statsSVG.classList.add("tweet-post-icon", "stats-post");

  // Create the path element for the stats icon
  const statsPath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  statsPath.setAttribute(
    "d",
    "M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z"
  );

  // Append the path to the SVG
  statsSVG.appendChild(statsPath);
  statsDiv.appendChild(statsSVG);

  firstHalfIcons.append(statsDiv);

  const saveDiv = document.createElement("div");
  saveDiv.classList.add("save");

  // Create the SVG element for the save icon
  const saveSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  saveSVG.setAttribute("viewBox", "0 0 24 24");
  saveSVG.setAttribute("aria-hidden", "true");
  saveSVG.classList.add("tweet-post-icon", "save-post");

  // Create the path element for the save icon
  const savePath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  savePath.setAttribute(
    "d",
    "M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"
  );

  // Append the path to the SVG
  saveSVG.appendChild(savePath);
  saveDiv.appendChild(saveSVG);

  firstHalfIcons.append(saveDiv);

  secondHalf.append(firstHalfIcons);

  const uploadDiv = document.createElement("div");
  uploadDiv.classList.add("upload");

  // Create the SVG element for the upload icon
  const uploadSVG = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  uploadSVG.setAttribute("viewBox", "0 0 24 24");
  uploadSVG.setAttribute("aria-hidden", "true");
  uploadSVG.classList.add("tweet-post-icon", "upload-post");

  // Create the path element for the upload icon
  const uploadPath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  uploadPath.setAttribute(
    "d",
    "M17 4c-1.1 0-2 .9-2 2 0 .33.08.65.22.92C15.56 7.56 16.23 8 17 8c1.10 0 2-.9 2-2s-.9-2-2-2zm-4 2c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4c-1.17 0-2.22-.5-2.95-1.3l-4.16 2.37c.07.3.11.61.11.93s-.04.63-.11.93l4.16 2.37c.73-.8 1.78-1.3 2.95-1.3 2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4c0-.32.04-.63.11-.93L8.95 14.7C8.22 15.5 7.17 16 6 16c-2.21 0-4-1.79-4-4s1.79-4 4-4c1.17 0 2.22.5 2.95 1.3l4.16-2.37c-.07-.3-.11-.61-.11-.93zm-7 4c-1.1 0-2 .9-2 2s.9 2 2 2c.77 0 1.44-.44 1.78-1.08.14-.27.22-.59.22-.92s-.08-.65-.22-.92C7.44 10.44 6.77 10 6 10zm11 6c-.77 0-1.44.44-1.78 1.08-.14.27-.22.59-.22.92 0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2z"
  );

  // Append the path to the SVG
  uploadSVG.appendChild(uploadPath);
  uploadDiv.appendChild(uploadSVG);

  secondHalf.append(uploadDiv);

  testPost.append(secondHalf);

  if (appendPrepend === "prepend") {
    postSection.prepend(testPost);
  } else {
    postSection.append(testPost);
  }
  postInput.value = "";
  tweetBtn.disabled = true;
}

// like function for like and unlike
function likeFunction(e) {
  let likeCount = document.querySelector(".likes-count");
  console.log(likeCount);
  if (e.target.classList.contains("like-post")) {
    e.target.classList.remove("like-post");
    e.target.classList.add("unlike-post");
    let temp = e.target.parentNode.querySelector(".likes-count");
    temp.innerText = 1;
    temp.style.display = "block";
  } else if (e.target.classList.contains("unlike-post")) {
    e.target.classList.remove("unlike-post");
    e.target.classList.add("like-post");
    let temp = e.target.parentNode.querySelector(".likes-count");
    temp.innerText = 0;
    temp.style.display = "none";
  }
}

// Mobile view java script

// navigate to navigation on clicking profile icon
const profileIcon = document.querySelector(".profile-icon");
profileIcon.addEventListener("click", (e) => {
  const navSection = e.target.parentNode.querySelector(".navigation-section");
  navSection.style.display = "block";
});

// floating button for making a new tweet in mobile view
const floatingButton = document.querySelector(".floating-tweet-box-icon");
let globalTweetBox = null;
floatingButton.addEventListener("click", (e) => {
  let tweetBox =
    e.target.parentNode.parentNode.parentNode.querySelector(".tweet-box");
  globalTweetBox = tweetBox;
  tweetBox.style.display = "block";
});


const postInputMobileView = document.querySelector(".post-input-mobile-view");

let tweetBtnMobile = document.querySelector(".tweet-btn-mobile");
tweetBtnMobile.disabled = true;

// diabling a button when post field is empty
postInputMobileView.addEventListener("input", (e) => {
  tweetBtnMobile.disabled = e.target.value === "";
});

const postsMobileView = document.querySelector(".posts-mobile-view");

const mobilePostSection = document.querySelector(".posts-mobile-view");


// post button on tweet mobile btn
tweetBtnMobile.addEventListener("click", (e) => {
  postRequestOnTweetBtnMobile();
});

// post request on tweet btn mobile
async function postRequestOnTweetBtnMobile(){
  globalTweetBox.style.display = "none";
  let mobileTweetValue = postInputMobileView.value;
  postInputMobileView.value = "";
  addPostMobile(mobileTweetValue, currentUser, "prepend");

  const postData = {
    title: mobileTweetValue,
    content: mobileTweetValue,
    userId: currentUser.id,
  };

  // API endpoint
  const apiUrl = "http://localhost:3000/api/posts";

  // Fetch API call with POST method
  let res = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });
  let jsonres = await res.json();
  console.log(jsonres);
}

// adding posts in frontend on screen
function addPostMobile(mobileTweetValue, user, appendPrepend) {
  let mobilePostTemplate = document.createElement("div");
  mobilePostTemplate.classList.add("mobile-post-template");

  let mobilePostFirstHalf = document.createElement("div");
  mobilePostFirstHalf.classList.add("mobile-post-first-half");

  let mobilePostProfile = document.createElement("div");
  mobilePostProfile.classList.add("mobile-post-profile");

  let mobilePostImage = document.createElement("div");
  mobilePostImage.style.backgroundImage = `url("${user.profile_url}")`;
  mobilePostImage.classList.add("mobile-post-image");

  mobilePostProfile.append(mobilePostImage);

  mobilePostFirstHalf.append(mobilePostProfile);

  let mobilePostContent = document.createElement("div");
  mobilePostContent.classList.add("mobile-post-content");

  let mobilePostNameId = document.createElement("div");
  mobilePostNameId.classList.add("mobile-post-name-id");

  let mobilePostMainName = document.createElement("div");
  mobilePostMainName.classList.add("mobile-post-main-name");

  let name = document.createElement("div");
  name.classList.add("name");
  name.innerText = `${user.user_name}`;

  let idTime = document.createElement("div");
  idTime.innerText = `@${user.user_name} · 1s`;
  idTime.classList.add("id-time");
  mobilePostMainName.append(name);
  mobilePostMainName.append(idTime);

  mobilePostNameId.append(mobilePostMainName);

  // Create a div element
  let mobilePostMenuMore = document.createElement("div");
  mobilePostMenuMore.classList.add("mobile-post-menu-more");

  // Create an svg element
  let mobilePostNavIcons = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  mobilePostNavIcons.setAttribute("viewBox", "0 0 24 24");
  mobilePostNavIcons.setAttribute("aria-hidden", "true");
  mobilePostNavIcons.classList.add("mobile-post-nav-icons");

  // Create the path element and set its attributes
  let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    "M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"
  );

  // Append the path to the svg
  mobilePostNavIcons.appendChild(path);

  // Append the svg to the div
  mobilePostMenuMore.appendChild(mobilePostNavIcons);

  // Append the div to the document body or any other container
  mobilePostNameId.append(mobilePostMenuMore);

  mobilePostContent.append(mobilePostNameId);

  let mobiletweetContent = document.createElement("div");
  mobiletweetContent.classList.add("mobile-tweet-content");
  mobiletweetContent.innerText = mobileTweetValue;
  mobilePostContent.append(mobiletweetContent);
  mobilePostFirstHalf.append(mobilePostContent);

  mobilePostTemplate.append(mobilePostFirstHalf);

  let mobilePostCommentIcons = document.createElement("div");
  mobilePostCommentIcons.classList.add("mobile-post-comment-icons");

  let mobileIconsFirstHalf = document.createElement("div");
  mobileIconsFirstHalf.classList.add("mobile-icons-first-half");

  // Create a div element
  let mobileCommentDiv = document.createElement("div");
  mobileCommentDiv.classList.add("mobile-comment");

  // Create an svg element
  let mobilePostIconSvg = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  mobilePostIconSvg.setAttribute("viewBox", "0 0 24 24");
  mobilePostIconSvg.setAttribute("aria-hidden", "true");
  mobilePostIconSvg.classList.add("mobile-post-icon");

  // Create the path element and set its attributes
  path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    "M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"
  );

  // Append the path to the svg
  mobilePostIconSvg.appendChild(path);

  // Append the svg to the div
  mobileCommentDiv.appendChild(mobilePostIconSvg);

  // Append the div to the document body or any other container
  mobileIconsFirstHalf.append(mobileCommentDiv);

  // Create a div element
  let mobileRetweetDiv = document.createElement("div");
  mobileRetweetDiv.classList.add("mobile-retweet");

  // Create an svg element
  mobilePostIconSvg = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  mobilePostIconSvg.setAttribute("viewBox", "0 0 24 24");
  mobilePostIconSvg.setAttribute("aria-hidden", "true");
  mobilePostIconSvg.classList.add("mobile-post-icon");

  // Create the path element and set its attributes
  path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    "M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"
  );

  // Append the path to the svg
  mobilePostIconSvg.appendChild(path);

  // Append the svg to the div
  mobileRetweetDiv.appendChild(mobilePostIconSvg);

  // Append the div to the document body or any other container
  mobileIconsFirstHalf.append(mobileRetweetDiv);

  // Create a div element
  let mobileLikeDiv = document.createElement("div");
  mobileLikeDiv.classList.add("mobile-like");

  // Create an svg element
  mobilePostIconSvg = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  mobilePostIconSvg.setAttribute("viewBox", "0 0 24 24");
  mobilePostIconSvg.setAttribute("aria-hidden", "true");
  mobilePostIconSvg.classList.add(
    "mobile-post-icon",
    "like-post",
    "like-mobile-post"
  );

  // Create the path element and set its attributes
  path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    "M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"
  );

  // Append the path to the svg
  mobilePostIconSvg.appendChild(path);

  mobilePostIconSvg.addEventListener("click", mobileLikeFunction);

  // Append the svg to the div
  mobileLikeDiv.appendChild(mobilePostIconSvg);

  // Create a div for likes count
  let likesCountDiv = document.createElement("div");
  likesCountDiv.classList.add("likes-count", "likes-count-mobile");
  likesCountDiv.textContent = "0"; // Set initial likes count

  // Append the likes count div to the main div
  mobileLikeDiv.appendChild(likesCountDiv);

  // Append the main div to the document body or any other container
  mobileIconsFirstHalf.append(mobileLikeDiv);

  // Create a div element
  let mobileStatsDiv = document.createElement("div");
  mobileStatsDiv.classList.add("mobile-stats");

  // Create an svg element
  mobilePostIconSvg = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  mobilePostIconSvg.setAttribute("viewBox", "0 0 24 24");
  mobilePostIconSvg.setAttribute("aria-hidden", "true");
  mobilePostIconSvg.classList.add("mobile-post-icon");

  // Create the path element and set its attributes
  path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    "M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z"
  );

  // Append the path to the svg
  mobilePostIconSvg.appendChild(path);

  // Append the svg to the div
  mobileStatsDiv.appendChild(mobilePostIconSvg);

  // Append the main div to the document body or any other container
  mobileIconsFirstHalf.append(mobileStatsDiv);

  // Create a div element
  let mobileSaveDiv = document.createElement("div");
  mobileSaveDiv.classList.add("mobile-save");

  // Create an svg element
  mobilePostIconSvg = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  mobilePostIconSvg.setAttribute("viewBox", "0 0 24 24");
  mobilePostIconSvg.setAttribute("aria-hidden", "true");
  mobilePostIconSvg.classList.add("mobile-post-icon");

  // Create the path element and set its attributes
  path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    "M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"
  );

  // Append the path to the svg
  mobilePostIconSvg.appendChild(path);

  // Append the svg to the div
  mobileSaveDiv.appendChild(mobilePostIconSvg);

  // Append the main div to the document body or any other container
  mobileIconsFirstHalf.appendChild(mobileSaveDiv);

  mobilePostCommentIcons.append(mobileIconsFirstHalf);

  // Create a div element
  let mobileUploadDiv = document.createElement("div");
  mobileUploadDiv.classList.add("mobile-upload");

  // Create an svg element
  mobilePostIconSvg = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  mobilePostIconSvg.setAttribute("viewBox", "0 0 24 24");
  mobilePostIconSvg.setAttribute("aria-hidden", "true");
  mobilePostIconSvg.classList.add("mobile-post-icon");

  // Create the path element and set its attributes
  path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    "M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2"
  );

  // Append the path to the svg
  mobilePostIconSvg.appendChild(path);

  // Append the svg to the div
  mobileUploadDiv.appendChild(mobilePostIconSvg);

  // Append the main div to the document body or any other container
  mobilePostCommentIcons.append(mobileUploadDiv);

  mobilePostTemplate.append(mobilePostCommentIcons);

  if (appendPrepend === "prepend") {
    mobilePostSection.prepend(mobilePostTemplate);
  } else {
    mobilePostSection.append(mobilePostTemplate);
  }
}

// like post functionality
let likeMobilePost = document.querySelector(".like-mobile-post");

likeMobilePost.addEventListener("click", mobileLikeFunction);

function mobileLikeFunction(e) {
  if (e.target.classList.contains("like-post")) {
    e.target.classList.remove("like-post");
    e.target.classList.add("unlike-post");
    let temp = e.target.parentNode.querySelector(".likes-count");
    temp.innerText = 1;
    temp.style.display = "block";
  } else if (e.target.classList.contains("unlike-post")) {
    e.target.classList.remove("unlike-post");
    e.target.classList.add("like-post");
    let temp = e.target.parentNode.querySelector(".likes-count");
    temp.innerText = 0;
    temp.style.display = "none";
  }
}

let postsMobileViewId = document.querySelector("#posts-mobile-view-id");

// on scroll paginated apis
postsMobileViewId.addEventListener("scroll", function () {
  if (isScrollAtBottom(postsMobileViewId)) {
    fetchallPostsMobile(); // Fetch more posts when scrolled to the bottom
  }
});

// on click on mobile bottom navigation bar
let mobileBottomMessages = document.querySelector("#mobile-chat-messages");
mobileBottomMessages.addEventListener("click", (e) => {
  let mobileNav = document.querySelector(".mobile-nav");
  mobileNav.style.display = "none";
  let mobileForYouFolllowingSection = document.querySelector(
    ".mobile-foryou-following-section"
  );
  mobileForYouFolllowingSection.style.display = "none";

  let postsMobileViewId = document.querySelector("#posts-mobile-view-id");
  postsMobileViewId.style.display = "none";

  let mobileChatApp = document.querySelector(".mobile-chat-app");
  mobileChatApp.style.display = "block";
});
