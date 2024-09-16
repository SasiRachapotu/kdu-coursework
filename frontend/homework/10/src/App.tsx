import React from "react";
import "./App.css";
import Profile from "./front-page/Profile";

interface ISkills{
  id:number;
  skill:string;
}

interface IHobbies{
  id:number;
  hobby:string;
}
interface IApiResponse{
  name:string;
  fullName:string;
  qualification:string;
  skills:ISkills[];
  hobbies:IHobbies[];
}

interface IPerson{
  name:string;
  fullName:string;
  qualification:string;
}

interface IPropsToProfileCard{
  person:IPerson;
  skills:ISkills[];
  hobbies:IHobbies[];
}

function App() {

  function mockApiCall(){
    // Mock api call made and response recieved
    const details:IApiResponse = {
      name: "Amey",
      fullName: "Amey Aditya",
      qualification: "SSE",
      skills: [
        {
          id: 1,
          skill: "Python",
        },
        {
          id: 2,
          skill: "React",
        },
      ],
      hobbies: [
        {
          id: 1,
          hobby: "Cricket",
        },
      ],
    }; 
    let newDetails:IPropsToProfileCard ={
      person:{
        name:details.name,
        fullName: details.fullName,
        qualification: details.qualification,
      },
      skills: details.skills,
      hobbies:details.hobbies
    }

    return newDetails;

  }


  return (
    <Profile profile={mockApiCall()}/>
  );
}

export default App;
