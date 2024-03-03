import React from "react";
import { IApiParseResponse } from "../../types/quotes.types";

import './quotes.scss'


interface IFilterHandler{
    filters:string[];
    setFilters: React.Dispatch<React.SetStateAction<string[]>>;
  }

interface IQuoteProps {
  readonly quote: IApiParseResponse;
  readonly filterHandler: IFilterHandler;
}
function Quotes({ quote, filterHandler }: IQuoteProps) {

    function addFilterHandler(e:React.MouseEvent<HTMLSpanElement, MouseEvent>){
        console.log(e.currentTarget.id);
        if(!filterHandler.filters.includes(e.currentTarget.id.toLowerCase())){
            filterHandler.setFilters([...filterHandler.filters,e.currentTarget.id.toLowerCase()])
        }
    }
  return (
    <div className="quote">
      <div className="quote-header">{quote.content}</div>

      <div className="author-date">
      <p className="quote-author">~{quote.author}</p>
      <p className="quote-date-added">{quote.dateAdded}</p>
      </div>
      <div className="tags-container">
        {quote.tags.map((tag) => {
          return <button className="tag" id={tag} key={tag} onClick={(e)=>{addFilterHandler(e)}}>{tag}</button>;
        })}
      </div>
    </div>
  );
}

export default Quotes;
