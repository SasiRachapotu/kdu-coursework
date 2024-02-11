const tweetBtn = document.querySelector(".tweet-btn-desktop");
console.log(tweetBtn)
tweetBtn.disabled=true;
console.log(tweetBtn.disabled)


const postInput = document.querySelector(".post-input-desktop")
console.log(postInput)

postInput.addEventListener("input",(e)=>{
    console.log(e.target.value)
    tweetBtn.disabled = e.target.value === "";
    console.log(tweetBtn.disabled)
})


const postSection = document.querySelector(".posts-desktop-view")

tweetBtn.addEventListener("click",(e)=>{
    let tweettext = postInput.value;
    console.log(tweettext)

    let testPost = document.createElement("div");
    testPost.classList.add("testpost");
    let postFirst = document.createElement("div");
    postFirst.classList.add("post-first");
    let postTestProfile = document.createElement("div");
    postTestProfile.classList.add("post-test-profile");
    let postTestProfileImage = document.createElement("div");
    postTestProfileImage.classList.add("post-test-profile-image")
    postTestProfile.append(postTestProfileImage)
    postFirst.append(postTestProfile);
    // testPost.append(postFirst);
    // postSection.append(testPost)
    // console.log(postSection)

    let postContent = document.createElement("div");
    postContent.classList.add("post-content");

    let postContentNameId = document.createElement("div");
    postContentNameId.classList.add("post-content-name-id");
    let mainName = document.createElement("div");
    mainName.classList.add("main-name");

    let postContentName = document.createElement("div");
    postContentName.classList.add("post-content-name")
    postContentName.classList.add("post-content-item")
    postContentName.innerText="Nitesh Gupta"

    let postContentId = document.createElement("div");
    postContentId.classList.add("post-content-id");
    postContentId.classList.add("post-content-item")

    postContentId.innerText="@nit_hck";

    let postContentDot = document.createElement("div");
    postContentDot.classList.add("post-content-dot");
    postContentDot.classList.add("post-content-item")
    postContentDot.innerText="·";

    let time = document.createElement("div");
    time.classList.add("time");
    time.innerText="1s";

    mainName.append(postContentName);
    mainName.append(postContentId)
    mainName.append(postContentDot)
    mainName.append(time);

    postContentNameId.append(mainName);


  var newDiv = document.createElement("div");
  newDiv.classList.add("menu-more"); // Add the menu-more class to the div

  // Create an svg element and set its attributes
  var newSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  newSvg.setAttribute("viewBox", "0 0 24 24");
  newSvg.setAttribute("aria-hidden", "true");
  newSvg.classList.add("nav-icons"); // Add the nav-icons class to the svg

  // Create the path element and set its attributes
  var newPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  newPath.setAttribute("d", "M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z");

  // Append the path to the svg
  newSvg.appendChild(newPath);

  console.log(newSvg)
  newSvg.style.fill="white";
  // Append the svg to the div
  newDiv.appendChild(newSvg);

  postContentNameId.append(newDiv);
  postContent.append(postContentNameId);
  tweetContent= document.createElement("div");
   tweetContent.classList.add("tweet-content");
   tweetContent.innerText = tweettext
  postContent.append(tweetContent)
   postFirst.append(postContent);

   

   testPost.append(postFirst)

   // appending the element....
//    postSection.prepend(testPost)
//    console.log(postSection)

   let secondHalf = document.createElement("div");
   secondHalf.classList.add("second-half");

   let firstHalfIcons = document.createElement("div");
   firstHalfIcons.classList.add("first-half-icons")

   const commentDiv = document.createElement("div");
    commentDiv.classList.add("comment");

    const commentSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    commentSVG.setAttribute("viewBox", "0 0 24 24");
    commentSVG.setAttribute("aria-hidden", "true");
    commentSVG.classList.add("tweet-post-icon");

    const commentPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    commentPath.setAttribute("d", "M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z");

    commentSVG.appendChild(commentPath);
    commentDiv.appendChild(commentSVG);

    firstHalfIcons.append(commentDiv);

    const retweetDiv = document.createElement("div");
    retweetDiv.classList.add("retweet");

    const retweetSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    retweetSVG.setAttribute("viewBox", "0 0 24 24");
    retweetSVG.setAttribute("aria-hidden", "true");
    retweetSVG.classList.add("tweet-post-icon");

    const retweetPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    retweetPath.setAttribute("d", "M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z");

    retweetSVG.appendChild(retweetPath);
    retweetDiv.appendChild(retweetSVG);

    firstHalfIcons.append(retweetDiv)

    const likeDiv = document.createElement("div");
    likeDiv.classList.add("like");

    // Create the SVG element for the like icon
    const likeSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    likeSVG.setAttribute("viewBox", "0 0 24 24");
    likeSVG.setAttribute("aria-hidden", "true");
    likeSVG.classList.add("tweet-post-icon", "like-post");

    // Create the path element for the like icon
    const likePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    likePath.setAttribute("d", "M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z");

    // Append the path to the SVG
    likeSVG.appendChild(likePath);

    likeSVG.addEventListener("click",likeFunction);
    likeDiv.appendChild(likeSVG);

    // Create the div for the likes count
    const likesCountDiv = document.createElement("div");
    likesCountDiv.classList.add("likes-count");
    likesCountDiv.innerText = "0"; // Initial likes count

    // Append the like icon and likes count to the container
    likeDiv.appendChild(likesCountDiv);

    firstHalfIcons.append(likeDiv)

    const statsDiv = document.createElement("div");
    statsDiv.classList.add("stats");

    // Create the SVG element for the stats icon
    const statsSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    statsSVG.setAttribute("viewBox", "0 0 24 24");
    statsSVG.setAttribute("aria-hidden", "true");
    statsSVG.classList.add("tweet-post-icon", "stats-post");

    // Create the path element for the stats icon
    const statsPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    statsPath.setAttribute("d", "M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z");

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
    const savePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    savePath.setAttribute("d", "M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z");

    // Append the path to the SVG
    saveSVG.appendChild(savePath);
    saveDiv.appendChild(saveSVG);

    firstHalfIcons.append(saveDiv);

    secondHalf.append(firstHalfIcons);

    const uploadDiv = document.createElement("div");
    uploadDiv.classList.add("upload");

    // Create the SVG element for the upload icon
    const uploadSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    uploadSVG.setAttribute("viewBox", "0 0 24 24");
    uploadSVG.setAttribute("aria-hidden", "true");
    uploadSVG.classList.add("tweet-post-icon", "upload-post");

    // Create the path element for the upload icon
    const uploadPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    uploadPath.setAttribute("d", "M17 4c-1.1 0-2 .9-2 2 0 .33.08.65.22.92C15.56 7.56 16.23 8 17 8c1.10 0 2-.9 2-2s-.9-2-2-2zm-4 2c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4c-1.17 0-2.22-.5-2.95-1.3l-4.16 2.37c.07.3.11.61.11.93s-.04.63-.11.93l4.16 2.37c.73-.8 1.78-1.3 2.95-1.3 2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4c0-.32.04-.63.11-.93L8.95 14.7C8.22 15.5 7.17 16 6 16c-2.21 0-4-1.79-4-4s1.79-4 4-4c1.17 0 2.22.5 2.95 1.3l4.16-2.37c-.07-.3-.11-.61-.11-.93zm-7 4c-1.1 0-2 .9-2 2s.9 2 2 2c.77 0 1.44-.44 1.78-1.08.14-.27.22-.59.22-.92s-.08-.65-.22-.92C7.44 10.44 6.77 10 6 10zm11 6c-.77 0-1.44.44-1.78 1.08-.14.27-.22.59-.22.92 0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2z");

    // Append the path to the SVG
    uploadSVG.appendChild(uploadPath);
    uploadDiv.appendChild(uploadSVG);

    secondHalf.append(uploadDiv);

    testPost.append(secondHalf);

    postSection.prepend(testPost)
   console.log(postSection)
   postInput.value="";
   tweetBtn.disabled=true;
})


let likePost = document.querySelector(".like-post-desktop");
console.log(likePost)

likePost.addEventListener("click",likeFunction)

function likeFunction(e){
    console.log(e)
    console.log("clicked")
    let likeCount = document.querySelector(".likes-count");
    console.log(likeCount)
    if(e.target.classList.contains("like-post")){
        e.target.classList.remove("like-post");
        e.target.classList.add("unlike-post");
        console.log(likePost.classList)
        let temp = e.target.parentNode.querySelector(".likes-count");
        console.log(temp)
        temp.innerText=1;
        // likeCount.innerText=1;
        temp.style.display="block";
        // likeCount.style.display="block";
    }
    else if(e.target.classList.contains("unlike-post")){
        e.target.classList.remove("unlike-post");
        e.target.classList.add("like-post");
        console.log(likePost.classList)
        let temp = e.target.parentNode.querySelector(".likes-count");
        console.log(temp)
        temp.innerText=0;
        // likeCount.innerText=1;
        temp.style.display="none";
    }
}

// Mobile view java script

const profileIcon = document.querySelector(".profile-icon");
profileIcon.addEventListener("click",(e)=>{
    const navSection = e.target.parentNode.querySelector(".navigation-section");
    navSection.style.display="block";
})

const floatingButton = document.querySelector(".floating-tweet-box-icon");
console.log(floatingButton)
var globalTweetBox=null;
floatingButton.addEventListener("click",async (e)=>{

    console.log(e.target.parentNode.parentNode.parentNode)
    let tweetBox = await e.target.parentNode.parentNode.parentNode.querySelector(".tweet-box");
    globalTweetBox=tweetBox;
    tweetBox.style.display="block";

})

const postInputMobileView = document.querySelector(".post-input-mobile-view");
console.log(postInputMobileView)

let tweetBtnMobile = document.querySelector(".tweet-btn-mobile");
console.log(tweetBtnMobile)
tweetBtnMobile.disabled=true;
console.log(tweetBtnMobile.disabled)

postInputMobileView.addEventListener("input",(e)=>{
    tweetBtnMobile.disabled = e.target.value==="";
    console.log(e.target.value);
    console.log(tweetBtnMobile.disabled)
})

const postsMobileView = document.querySelector(".posts-mobile-view");
console.log(postsMobileView)

const mobilePostSection = document.querySelector(".posts-mobile-view")

tweetBtnMobile.addEventListener("click", (e)=>{
    globalTweetBox.style.display="none";
    let mobileTweetValue = postInputMobileView.value;
    postInputMobileView.value="";
    console.log(mobileTweetValue)
    let mobilePostTemplate = document.createElement("div");
    mobilePostTemplate.classList.add("mobile-post-template");

    let mobilePostFirstHalf = document.createElement("div");
    mobilePostFirstHalf.classList.add("mobile-post-first-half");

    let mobilePostProfile = document.createElement("div");
    mobilePostProfile.classList.add("mobile-post-profile");

    let mobilePostImage = document.createElement("div");
    mobilePostImage.classList.add("mobile-post-image")

    mobilePostProfile.append(mobilePostImage);

    mobilePostFirstHalf.append(mobilePostProfile);

    let mobilePostContent = document.createElement("div");
    mobilePostContent.classList.add("mobile-post-content");

    let mobilePostNameId = document.createElement("div");
    mobilePostNameId.classList.add("mobile-post-name-id");

    let mobilePostMainName= document.createElement("div");
    mobilePostMainName.classList.add("mobile-post-main-name");

    let name = document.createElement("div");
    name.classList.add("name");
    name.innerText="Nitesh Gupta";

    let idTime = document.createElement("div");
    idTime.innerText="@nit_hck · 1s";
    idTime.classList.add("id-time");
    mobilePostMainName.append(name);
    mobilePostMainName.append(idTime);

    mobilePostNameId.append(mobilePostMainName);

    // Create a div element
var mobilePostMenuMore = document.createElement("div");
mobilePostMenuMore.classList.add("mobile-post-menu-more");

// Create an svg element
var mobilePostNavIcons = document.createElementNS("http://www.w3.org/2000/svg", "svg");
mobilePostNavIcons.setAttribute("viewBox", "0 0 24 24");
mobilePostNavIcons.setAttribute("aria-hidden", "true");
mobilePostNavIcons.classList.add("mobile-post-nav-icons");

// Create the path element and set its attributes
var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
path.setAttribute("d", "M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z");

// Append the path to the svg
mobilePostNavIcons.appendChild(path);

// Append the svg to the div
mobilePostMenuMore.appendChild(mobilePostNavIcons);

// Append the div to the document body or any other container
mobilePostNameId.append(mobilePostMenuMore);

mobilePostContent.append(mobilePostNameId);

let mobiletweetContent = document.createElement("div");
mobiletweetContent.classList.add("mobile-tweet-content")
mobiletweetContent.innerText=mobileTweetValue
mobilePostContent.append(mobiletweetContent)
mobilePostFirstHalf.append(mobilePostContent)

    mobilePostTemplate.append(mobilePostFirstHalf);

    let mobilePostCommentIcons = document.createElement("div");
    mobilePostCommentIcons.classList.add("mobile-post-comment-icons");

    let mobileIconsFirstHalf = document.createElement("div");
    mobileIconsFirstHalf.classList.add("mobile-icons-first-half")

    // Create a div element
var mobileCommentDiv = document.createElement("div");
mobileCommentDiv.classList.add("mobile-comment");

// Create an svg element
var mobilePostIconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
mobilePostIconSvg.setAttribute("viewBox", "0 0 24 24");
mobilePostIconSvg.setAttribute("aria-hidden", "true");
mobilePostIconSvg.classList.add("mobile-post-icon");

// Create the path element and set its attributes
var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
path.setAttribute("d", "M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z");

// Append the path to the svg
mobilePostIconSvg.appendChild(path);

// Append the svg to the div
mobileCommentDiv.appendChild(mobilePostIconSvg);

// Append the div to the document body or any other container
mobileIconsFirstHalf.append(mobileCommentDiv);

// Create a div element
var mobileRetweetDiv = document.createElement("div");
mobileRetweetDiv.classList.add("mobile-retweet");

// Create an svg element
var mobilePostIconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
mobilePostIconSvg.setAttribute("viewBox", "0 0 24 24");
mobilePostIconSvg.setAttribute("aria-hidden", "true");
mobilePostIconSvg.classList.add("mobile-post-icon");

// Create the path element and set its attributes
var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
path.setAttribute("d", "M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z");

// Append the path to the svg
mobilePostIconSvg.appendChild(path);

// Append the svg to the div
mobileRetweetDiv.appendChild(mobilePostIconSvg);

// Append the div to the document body or any other container
mobileIconsFirstHalf.append(mobileRetweetDiv);


// Create a div element
var mobileLikeDiv = document.createElement("div");
mobileLikeDiv.classList.add("mobile-like");

// Create an svg element
var mobilePostIconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
mobilePostIconSvg.setAttribute("viewBox", "0 0 24 24");
mobilePostIconSvg.setAttribute("aria-hidden", "true");
mobilePostIconSvg.classList.add("mobile-post-icon", "like-post", "like-mobile-post");

// Create the path element and set its attributes
var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
path.setAttribute("d", "M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z");

// Append the path to the svg
mobilePostIconSvg.appendChild(path);

mobilePostIconSvg.addEventListener("click",mobileLikeFunction)

// Append the svg to the div
mobileLikeDiv.appendChild(mobilePostIconSvg);

// Create a div for likes count
var likesCountDiv = document.createElement("div");
likesCountDiv.classList.add("likes-count", "likes-count-mobile");
likesCountDiv.textContent = "0"; // Set initial likes count

// Append the likes count div to the main div
mobileLikeDiv.appendChild(likesCountDiv);

// Append the main div to the document body or any other container
mobileIconsFirstHalf.append(mobileLikeDiv);

// Create a div element
var mobileStatsDiv = document.createElement("div");
mobileStatsDiv.classList.add("mobile-stats");

// Create an svg element
var mobilePostIconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
mobilePostIconSvg.setAttribute("viewBox", "0 0 24 24");
mobilePostIconSvg.setAttribute("aria-hidden", "true");
mobilePostIconSvg.classList.add("mobile-post-icon");

// Create the path element and set its attributes
var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
path.setAttribute("d", "M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z");

// Append the path to the svg
mobilePostIconSvg.appendChild(path);

// Append the svg to the div
mobileStatsDiv.appendChild(mobilePostIconSvg);

// Append the main div to the document body or any other container
mobileIconsFirstHalf.append(mobileStatsDiv);

// Create a div element
var mobileSaveDiv = document.createElement("div");
mobileSaveDiv.classList.add("mobile-save");

// Create an svg element
var mobilePostIconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
mobilePostIconSvg.setAttribute("viewBox", "0 0 24 24");
mobilePostIconSvg.setAttribute("aria-hidden", "true");
mobilePostIconSvg.classList.add("mobile-post-icon");

// Create the path element and set its attributes
var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
path.setAttribute("d", "M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z");

// Append the path to the svg
mobilePostIconSvg.appendChild(path);

// Append the svg to the div
mobileSaveDiv.appendChild(mobilePostIconSvg);

// Append the main div to the document body or any other container
mobileIconsFirstHalf.appendChild(mobileSaveDiv);

mobilePostCommentIcons.append(mobileIconsFirstHalf);

// Create a div element
var mobileUploadDiv = document.createElement("div");
mobileUploadDiv.classList.add("mobile-upload");

// Create an svg element
var mobilePostIconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
mobilePostIconSvg.setAttribute("viewBox", "0 0 24 24");
mobilePostIconSvg.setAttribute("aria-hidden", "true");
mobilePostIconSvg.classList.add("mobile-post-icon");

// Create the path element and set its attributes
var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
path.setAttribute("d", "M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2");

// Append the path to the svg
mobilePostIconSvg.appendChild(path);

// Append the svg to the div
mobileUploadDiv.appendChild(mobilePostIconSvg);

// Append the main div to the document body or any other container
mobilePostCommentIcons.append(mobileUploadDiv);

mobilePostTemplate.append(mobilePostCommentIcons)

mobilePostSection.prepend(mobilePostTemplate)

})


let likeMobilePost = document.querySelector(".like-mobile-post");

likeMobilePost.addEventListener("click",mobileLikeFunction)

function mobileLikeFunction(e){
    console.log(e)
    console.log("clicked")
    let likeCount = document.querySelector(".likes-count-mobile");
    console.log(likeCount)
    if(e.target.classList.contains("like-post")){
        e.target.classList.remove("like-post");
        e.target.classList.add("unlike-post");
        console.log(likeMobilePost.classList)
        let temp = e.target.parentNode.querySelector(".likes-count");
        console.log(temp)
        temp.innerText=1;
        // likeCount.innerText=1;
        temp.style.display="block";
        // likeCount.style.display="block";
    }
    else if(e.target.classList.contains("unlike-post")){
        e.target.classList.remove("unlike-post");
        e.target.classList.add("like-post");
        console.log(likeMobilePost.classList)
        let temp = e.target.parentNode.querySelector(".likes-count");
        console.log(temp)
        temp.innerText=0;
        // likeCount.innerText=1;
        temp.style.display="none";
    }
}



