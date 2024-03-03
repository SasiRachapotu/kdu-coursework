import React, { useEffect, useState, CSSProperties } from 'react'
import './quotesContainer.scss'
import FilterContainer from '../filterContainer/FilterContainer'
import { IApiParseResponse } from '../../types/quotes.types';
import Quotes from '../quotes/Quotes';

import ClipLoader from "react-spinners/ClipLoader";

function QuotesContainer() {

  const [quotes, setQuotes] = useState<IApiParseResponse[]>([]);

  const [allQuotes, setAllQuotes] = useState<IApiParseResponse[]>([])

  const [filters, setFilters] = useState<string[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(()=>{
    fetch("https://api.quotable.io/quotes/random?limit=3").then((response)=>{
      return response.json();
    }).then((data:IApiParseResponse[])=>{
      setAllQuotes(data)
    })
  },[])

  useEffect(()=>{
    if(filters.length===0){
      setQuotes(allQuotes);
    }
    else{
      setQuotes(allQuotes.filter((quote)=>{
        for(let i of quote.tags){
          if(filters.indexOf(i.toLowerCase())!==-1){
            return true;
          }
        }
        return false;
      }))
    }

  },[filters,allQuotes])

  async function newQuoteBtnHandler(e:React.MouseEvent<HTMLButtonElement, MouseEvent>){
    console.log(loading);
    setLoading(true);
    await fetch("https://api.quotable.io/quotes/random?limit=1").then((response)=>{
      return response.json();
    }).then((data:IApiParseResponse[])=>{
      setAllQuotes((prevState)=>{
        return [data[0],...prevState]
      })
    })
    setLoading(false);
  }

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "5px solid black",
    marginLeft:"1rem"
  };

  return (
    <div className="main-container">
      <div className="second-container">
        <button id='new-quote' disabled={loading} style={{opacity:loading?0.6:1}} onClick={(e)=>{
          newQuoteBtnHandler(e)
        }}>New Quote <ClipLoader
        color="black"
        loading={loading}
        cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      /></button> 
        <FilterContainer filterHandler={{filters,setFilters}}></FilterContainer>
        <div className="quote-container">
        {quotes.map((quote)=>{
          return(
            <Quotes key={quote._id} quote={quote} filterHandler={{filters,setFilters}}></Quotes>
          )
        })}
        </div>
      </div>
    </div>
  )
}

export default QuotesContainer
