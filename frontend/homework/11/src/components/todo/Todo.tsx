import React, { useState } from 'react'

import './todo.scss'
import Header from '../header/Header'
import ItemsContainer from '../itemsContainer/ItemsContainer'
interface ITemplate{
    id:number;
    text:string;
}
function Todo() {
    const [todoItems, setTodoItems] = useState<ITemplate[]>([]);
    const [searchTerm,setSearchTerm]=useState<string>("");
  return (
    <div className='main-container'>
      <Header itemHandler={{todoItems,setTodoItems}} searchTermHandler={{searchTerm,setSearchTerm}} ></Header>
      <ItemsContainer propItem={{todoItems,setTodoItems}} searchTermHandler={{searchTerm,setSearchTerm}}></ItemsContainer>
    </div>
  )
}

export default Todo