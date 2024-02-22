import React, { createContext, useMemo, useState } from 'react'

interface ITodoContextProps{
    readonly children:React.ReactNode
}

export const searchContextApi = createContext({
  searchTerm:"",
  setSearchTermFunction:(term:string)=>{},
})


function SearchContextProvider({ children }: ITodoContextProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const contextValue = useMemo(() => ({
    searchTerm,
    setSearchTermFunction: (term: string) => {
      setSearchTerm(term);
    },
  }), [searchTerm]);

  return (
    <searchContextApi.Provider value={contextValue}>
      {children}
    </searchContextApi.Provider>
  );
}

export default SearchContextProvider