const users = [
  {
    id: "1",
    user_name: "Sasi",
    user_email_id: "sasi.rachapotu@gmail.com",
    password: "123",
    profile_url: "/images/photo.png",
  },
  {
    id: "2",
    user_name: "Venkatesh",
    user_email_id: "venkatesh.rachapotu@gmail.com",
    password: "1234",
    profile_url: "/images/V.jpg",
  },
  {
    id: "3",
    user_name: "Lakshmi",
    user_email_id: "lakshmi.rachapotu@gmail.com",
    password: "12345",
    profile_url: "/images/L.png",
  },
  {
    id: "4",
    user_name: "Gopal",
    user_email_id: "gopal.rachapotu@gmail.com",
    password: "123456",
    profile_url: "/images/G.jpeg",
  },
  {
    id: "5",
    user_name: "Kusuma",
    user_email_id: "kusu@gmail.com",
    password: "1234567",
    profile_url: "/images/K.png",
  },
];

function getUserByUsername(userName){
    return users.filter((u)=>u.user_name===userName);
}
function getUserByEmailId(userEmail){
    return users.filter((u)=>u.user_email_id===userEmail);
}

module.exports = {users, getUserByUsername, getUserByEmailId};
