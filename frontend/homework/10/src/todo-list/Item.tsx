import React from 'react'

interface IItem{
    readonly text:string;
}
function Item({text}:IItem) {
  return (
    <li className='list-item'>{text}</li>
  )
}

export default Item