import React from 'react'

import './skills.css'

interface ISkills{
    id:number;
    skill:string;
}

interface ISkillProps{
    readonly skills:ISkills[];
}
function Skills({skills}:ISkillProps) {
  return (
    <div className='skills'>
        <h1 className='skills-header'>Skills</h1>
        {
            skills.map((skill)=>{
                return(
                    <li className='skills-list-items' key={skill.id}>{skill.skill}</li>
                )
            })
        }
    </div>
  )
}

export default Skills