import React from 'react'
import Header from './Header'
import ListItem from './ListItem'

import './TodoList.css'

export function TodoList() {

    const list =[
        {
            id:1,
            text: "List item 1"
        },
        {
            id:2,
            text: "List item 2"
        },
        {
            id:3,
            text: "List item 3"
        },
        {
            id:4,
            text: "List item 4"
        },
        {
            id:5,
            text: "List item 5"
        },
        {
            id:6,
            text: "List item 6"
        }
    ]
  return (
    <div className='todo-list'>
      <Header/>
      <ListItem listItems ={list}/>
    </div>
  )
}
