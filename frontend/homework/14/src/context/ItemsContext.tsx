import React, { createContext, useEffect, useMemo, useRef, useState } from "react";
import { IAPIResponse } from "../interfaces/Interface";

interface IItemsContextProps {
  readonly children: React.ReactNode;
}

interface IItemContextApi {
  items: IAPIResponse[];
  modifyItemList: (itemList: IAPIResponse[]) => void;
  filters: Set<string>;
  currentFilter: string;
  setCurrentFilterFunction: (filter: string) => void;
  filterItems: IAPIResponse[];
  setFilterItemsFunction: (itemList: IAPIResponse[]) => void;
  sort: string;
  setSortFunction: (filter: string) => void;
  search: string;
  setSearchFunction: (filter: string) => void;
  searchItems: IAPIResponse[];
  setSearchItemsFunction: (itemList: IAPIResponse[]) => void;
}

export const ItemContextApi = createContext<IItemContextApi>({
  items: [],
  modifyItemList: () => {},
  filters: new Set(),
  currentFilter: "",
  setCurrentFilterFunction: () => {},
  filterItems: [],
  setFilterItemsFunction: () => {},
  sort: "",
  setSortFunction: () => {},
  search: "",
  setSearchFunction: () => {},
  searchItems: [],
  setSearchItemsFunction: () => {},
});
function ItemsContext({ children }: IItemsContextProps) {
  const searchRef = useRef<string>("");
  const [items, setItems] = useState<IAPIResponse[]>([]);
  const [filters, setFilters] = useState<Set<string>>(new Set());
  const [currentFilter, setCurrentFilter] = useState<string>("");
  const [filterItems, setFilterItems] = useState<IAPIResponse[]>([]);
  const [sort, setSort] = useState<string>("");
  const [search,setSearch] =useState<string>("");
  const [searchItems, setSearchItems] = useState<IAPIResponse[]>([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse: IAPIResponse[]) => {
        setItems(jsonResponse);
        setFilterItems(jsonResponse);
        jsonResponse.forEach((res) => {
          setFilters(filters?.add(res.category));
        });
      });
  }, [filters]);

  function filteredItems(filter1: string) {
    const itemsTemp = items.filter((item) => item.category === filter1);
  
    if (sort === "") {
      return itemsTemp;
    }
  
    return [...itemsTemp].sort((a, b) => {
      return sort === "ascending" ? a.price - b.price : b.price - a.price;
    });
  }

  function setSearchFunction(searchItem:string){
    setSearch(searchItem);
  }

  useEffect(() => {
    setFilterItemsFunction(filteredItems(currentFilter));
  }, [currentFilter,items,sort]);

  useEffect(() => {
    if (currentFilter === "") {
        if (sort === "ascending") {
            setFilterItemsFunction([...items].sort((a, b) => a.price - b.price));
        } else if (sort === "descending") {
            setFilterItemsFunction([...items].sort((a, b) => b.price - a.price));
        } else {
            setFilterItemsFunction(items);
        }
    } else {
        const sortedItems = [...filterItems].sort((a, b) => {
            if (sort === "ascending") {
                return a.price - b.price;
            } else if (sort === "descending") {
                return b.price - a.price;
            }
            return 0;
        });

        setFilterItemsFunction(currentFilter === "" ? items : sortedItems);
    }
}, [sort]);

useEffect(()=>{
    if(search===""){
        setSearchItemsFunction(items.filter((item)=>item.title.toLowerCase().includes(searchRef.current)));
        searchRef.current="";
    }
    else{
        setSearchItemsFunction([]);
        searchRef.current=search;
    }
},[search])


  function setFilterItemsFunction(itemList: IAPIResponse[]) {
    setFilterItems(itemList);
  }

  function setSearchItemsFunction(itemList:IAPIResponse[]){
    setSearchItems(itemList)
  }

  const contextValue = useMemo(() => {
    return {
      items,
      modifyItemList: (itemList: IAPIResponse[]) => setItems(itemList),
      filters,
      currentFilter,
      setCurrentFilterFunction: (filter: string) => setCurrentFilter(filter),
      filterItems,
      setFilterItemsFunction: (itemList: IAPIResponse[]) => setFilterItems(itemList),
      sort,
      setSortFunction: (sort: string) => setSort(sort),
      search,
      setSearchFunction,
      searchItems,
      setSearchItemsFunction,
    };
  }, [items, filters, currentFilter, filterItems, sort,search,searchItems]);

  return (
    <ItemContextApi.Provider value={contextValue}>
      {children}
    </ItemContextApi.Provider>
  );
}

export default ItemsContext;
