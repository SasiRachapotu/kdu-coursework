import React from 'react'

interface IProfileDetails{
    name:string;
    fullName:string;
    qualification:string
}

interface IProfileProps{
    readonly profileDetailsProps:IProfileDetails;
}

function Header({profileDetailsProps}:IProfileProps) {
  return (
    <div>
        <h1>{profileDetailsProps.name}</h1>
        <h3>{profileDetailsProps.fullName}</h3>
        <h1>{profileDetailsProps.qualification}</h1>
    </div>
  )
}

export default Header