import React from 'react'
import { singleItemStyle } from '../styles/singleItem.style'
import { useDispatch, useSelector } from 'react-redux';
import { modifySelectedAddon } from '../redux/RoomsSlice';
import { RootState } from '../redux/store';

interface ISingleitemProps{
    name:string;
  }
function SingleItem2({name}:ISingleitemProps) {
    const roomsDispatch = useDispatch();
    const selectedItems = useSelector((store:RootState)=>store.rooms.selectedAddon)
    function handleAddon(e:React.MouseEvent<HTMLButtonElement, MouseEvent>){
        roomsDispatch(modifySelectedAddon(e.currentTarget.innerText.toLowerCase()))
    }
  return (
    <button className="single-item" style={{...singleItemStyle ,border:selectedItems.includes(name.toLowerCase())?"2px solid #f08a5d":"2px solid black"}}  onClick={(e)=>handleAddon(e)}>
        {name}
    </button>
  )
}

export default SingleItem2