import React from 'react'
import { singleItemStyle } from '../styles/singleItem.style'
import { useDispatch, useSelector } from 'react-redux';
import { modifyCurrentSelected } from '../redux/RoomsSlice';
import { RootState } from '../redux/store';

interface ISingleitemProps{
  name:string;
}

function SingleItem({name}:ISingleitemProps) {
  const roomsDispatch = useDispatch();
  const currentSelected = useSelector((store:RootState)=>store.rooms.currentSelected);
  function clickHandler(e:React.MouseEvent<HTMLButtonElement>){
    roomsDispatch(modifyCurrentSelected(e.currentTarget.innerText.toLowerCase()))
  }
  return (
    <button className="single-item" style={{...singleItemStyle, border:currentSelected===name.toLowerCase()?"2px solid #f08a5d":"2px solid black"}} onClick={(e)=>{clickHandler(e)}}>
        {name}
    </button>
  )
}

export default SingleItem