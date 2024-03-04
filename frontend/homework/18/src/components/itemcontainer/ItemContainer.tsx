import React, { CSSProperties, useEffect, useRef } from "react";
import {
  allItemsStyle,
  headingSectionStyles,
  itemContainerStyles,
  kduStyles,
  mainContainer,
  marketPlaceStyles,
} from "./itemContainer.style";
import Item from "../items/Item";
import { useLocation, useNavigate } from "react-router-dom";
import { itemStyles } from "../items/item.style";
import { IAPIResponse } from "../../interfaces/Interface";
import { useDispatch, useSelector } from "react-redux";
import { RootState, itemsDispatch } from "../../redux/store";
import { setCurrentFilterFunction, setFilterItemsFunction, setSearchItemsFunction, setSnackBarStatus } from "../../redux/ItemSlice";
import { getProducts } from "../../redux/thunk/getProducts";
import ClipLoader from "react-spinners/ClipLoader";
import Snackbar from '@mui/material/Snackbar';
import { Button, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  border: "5px solid gray"
};

export function ItemContainer() {

  const searchRef = useRef<string>("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filterQuery = queryParams.get("filter");

  const items: IAPIResponse[] = useSelector((state: RootState) => state.items.items);
  const currentFilter: string = useSelector((state: RootState) => state.items.currentFilter);
  const filterItems: IAPIResponse[] = useSelector((state: RootState) => state.items.filterItems)
  const sort: string = useSelector((state: RootState) => state.items.sort);
  const search: string = useSelector((state: RootState) => state.items.search);
  const searchItems: IAPIResponse[] = useSelector((state: RootState) => state.items.searchItems);
  const itemsState = useSelector((state: RootState) => state.items.state);

  const snackBarStatus = useSelector((state:RootState)=>state.items.snackBarStatus);

  const itemsDispatch: itemsDispatch = useDispatch();


  if (filterQuery !== null) {
    itemsDispatch(setCurrentFilterFunction(filterQuery));
  }

  const navigate = useNavigate();
  const handleItemClick = (itemId: number) => {
    navigate(`/item/${itemId}`);
  };

  useEffect(() => {
    itemsDispatch(getProducts())
  }, [itemsDispatch]);

  function filteredItems(filter1: string) {
    const itemsTemp = items.filter((item) => item.category === filter1);

    if (sort === "") {
      return itemsTemp;
    }

    return [...itemsTemp].sort((a, b) => {
      return sort === "ascending" ? a.price - b.price : b.price - a.price;
    });
  }

  useEffect(() => {
    itemsDispatch(setFilterItemsFunction(filteredItems(currentFilter)))
  }, [currentFilter, items, sort]);

  useEffect(() => {
    if (currentFilter === "") {
      if (sort === "ascending") {
        itemsDispatch(setFilterItemsFunction([...items].sort((a, b) => a.price - b.price)));
      } else if (sort === "descending") {
        itemsDispatch(setFilterItemsFunction([...items].sort((a, b) => b.price - a.price)));
      } else {
        itemsDispatch(setFilterItemsFunction(items));
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

      itemsDispatch(setFilterItemsFunction(currentFilter === "" ? items : sortedItems));
    }
  }, [sort]);

  useEffect(() => {
    if (search === "") {
      itemsDispatch(setSearchItemsFunction((items.filter((item) => item.title.toLowerCase().includes(searchRef.current)))));
      searchRef.current = "";
    }
    else {
      itemsDispatch(setSearchItemsFunction([]));
      searchRef.current = search;
    }
  }, [search])



  const renderItems = () => {
    let itemsToRender;

    if (
      currentFilter === "" &&
      sort === "" &&
      searchItems.length === 0
    ) {
      itemsToRender = items;
    } else if (searchItems.length !== 0) {
      itemsToRender = searchItems;
    } else {
      itemsToRender = filterItems;
    }

    return itemsToRender.map((ite) => (
      <button
        key={ite.id}
        onClick={() => handleItemClick(ite.id)}
        style={itemStyles}
      >
        <Item key={ite.id} id={ite.id}></Item>
      </button>
    ));
  };



  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    console.log(event);
    if (reason === 'clickaway') {
      return;
    }
    itemsDispatch(setSnackBarStatus(false))
  };
  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );


  return (
    <div className="main-container" style={mainContainer}>
      <div className="all-item-container" style={allItemsStyle}>
        <Snackbar
          open={snackBarStatus}
          autoHideDuration={5000}
          onClose={handleClose}
          message="Note archived"
          action={action}
        ><Alert variant="filled" severity={itemsState==="fulfilled"?"success":"error"} onClose={handleClose}>{itemsState==="fulfilled"?'Items loaded succesfully':"Error loading items"}</Alert>
        </Snackbar>
        <div className="heading-section" style={headingSectionStyles}>
          <div className="kdu" style={kduStyles}>
            KDU
          </div>
          <div className="market-place" style={marketPlaceStyles}>
            MARKETPLACE
          </div>
        </div>
        <br></br>
        <ClipLoader
          color={"blue"}
          loading={itemsState !== "fulfilled" && itemsState !=="rejected"}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <div className="item-container" style={{ ...itemContainerStyles, display: itemsState !== "fulfilled" ? "none" : "flex" }}>
          {renderItems()}
        </div>
      </div>
    </div>
  );
}
