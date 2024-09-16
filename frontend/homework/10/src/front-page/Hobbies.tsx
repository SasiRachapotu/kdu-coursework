import React from 'react'

import './hobbies.css'

interface IHobbies{
    id:number,
    hobby:string,
}

interface IHobbiesProps{
    readonly hobbies:IHobbies[]
}
function Hobbies({hobbies}:IHobbiesProps) {
  return (
    <div className='hobbies'>
        <h1 className='hobbies-header'>Hobbies</h1>
        {hobbies.map((hobby)=>{
            return(
                <li className='hobby-list-item' key={hobby.id}>{hobby.hobby}</li>
            )
        })}
    </div>
  )
}

export default Hobbies