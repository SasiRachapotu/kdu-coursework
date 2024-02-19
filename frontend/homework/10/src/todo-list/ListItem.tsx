import React from 'react'
import './ListItem.css';
import Item from './Item';

interface IListItem{
    id:number,
    text:string;
}

interface IListItemProps{
    readonly listItems:IListItem[];
}


function ListItem({listItems}:IListItemProps) {

  return (
    <ul>
        {
            listItems.map((item)=>{
                return(
                    <Item key={item.id} text={item.text}></Item>
                    // <li key={item.id} className='list-item'>{item.text}</li>
                )
            })
        }
      </ul>
  )
}

export default ListItem