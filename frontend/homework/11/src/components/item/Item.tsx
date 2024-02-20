import React from 'react'

import './item.scss'

interface IItem{
    id:number,
    text:string
}

interface IItemsSetItem{
    todoItems:IItem[],
    setTodoItems:React.Dispatch<React.SetStateAction<{
        id: number;
        text: string;
    }[]>>
}

interface IProps{
    readonly item:IItem;
    readonly propItem1: IItemsSetItem;
}



function Item({item,propItem1}:IProps) {

    function deleteHandler(e:any){
        propItem1.setTodoItems((propItem1.todoItems.filter((item1)=>item1.id!==item.id)));
    }
  return (
    <div className="item">
        <div className="item-content">{item.text}</div>
        <button id="delete-btn" onClick={deleteHandler}>X</button>
    </div>
  )
}

export default Item