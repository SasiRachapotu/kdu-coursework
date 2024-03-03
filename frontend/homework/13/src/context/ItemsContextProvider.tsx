import React, { createContext, useMemo, useState } from 'react'

interface ITemplate {
    id: number;
    text: string;
  }

  interface IItemsSetItem {
    todoItems: ITemplate[];
    setTodoItemsFunction:(list:ITemplate[])=>void;
  }

export const itemsContext = createContext<IItemsSetItem>({
    todoItems:[],
    setTodoItemsFunction:(list:ITemplate[])=>{},
})

interface IItemsContextProps{
    readonly children:React.ReactNode
}

function ItemsContextProvider({ children }: IItemsContextProps) {
  const [todoItems, setTodoItems] = useState<ITemplate[]>([]);

  const contextValue = useMemo(() => ({
    todoItems,
    setTodoItemsFunction: (list: ITemplate[]) => {
      setTodoItems(list);
    },
  }), [todoItems]);

  return (
    <itemsContext.Provider value={contextValue}>
      {children}
    </itemsContext.Provider>
  );
}

export default ItemsContextProvider