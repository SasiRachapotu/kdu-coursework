import React from 'react'
import Header from './Header'
import Skills from './Skills';
import Hobbies from './Hobbies';

import './profile.css'

interface ISkills{
    id:number;
    skill:string;
}

interface IHobbies{
    id:number;
    hobby:string;
}

interface IProfileName{
    name:string,
    fullName:string,
    qualification:string
}
interface IProfile{
    person:IProfileName;
    skills:ISkills[];
    hobbies:IHobbies[];
}

interface IProfileProps{
    readonly profile:IProfile;
}


function Profile({profile}:IProfileProps) {
    
  return (
    <div className='profile-card'>
        <Header profileDetailsProps={profile.person}/>
        <div className="skills-hobbbies">
            <Skills skills={profile.skills}></Skills>
            <Hobbies hobbies={profile.hobbies}></Hobbies>
        </div>
    </div>
  )
}

export default Profile