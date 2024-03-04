import {
    backToHomeBtnStyles,
  headingStyle,
  imageDetailStyle,
  imageStyle,
  imagedivStyle,
  informationStyle,
  mainContainerStyle,
  tagStyle,
  tagValueStyle,
  valueStyle,
} from "./itemDetail.style";
import { Link, useParams } from "react-router-dom";
import { IAPIResponse } from "../../interfaces/Interface";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import ClipLoader from "react-spinners/ClipLoader";
import { CSSProperties } from "react";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  border:"5px solid gray",
  marginTop:"1rem"
};

function ItemDetail() {
    const {id} = useParams();
    const items:IAPIResponse[] = useSelector((state:RootState)=>state.items.items); 
    const product = items.find((pdt)=>pdt.id===parseInt(id!))
    const itemsState = useSelector((state:RootState)=>state.items.state);
  return (
    <>
    <ClipLoader
        color={"blue"}
        loading={itemsState!=="fulfilled"}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    <div className="main-container" style={{ ...mainContainerStyle, display: itemsState !== "fulfilled" ? "none" : "block" }}
>
      <div className="heading" style={headingStyle}>
        {product?.title}
      </div>

      <div className="item-detail" style={imageDetailStyle}>
        <div className="item-image" style={imagedivStyle}>
          <img
            src={product?.image}
            style={imageStyle}
            alt="details"
          ></img>
        </div>
        <div className="item-information" style={informationStyle}>
          <div className="title" style={tagValueStyle}>
            <div className="tag" style={tagStyle}>Title:</div>
            <div className="value" style={valueStyle}>
              {product?.title}
            </div>
          </div>
          <div className="price" style={tagValueStyle}>
            <div className="tag" style={tagStyle}>Price:</div>
            <div className="value" style={valueStyle}>{product?.price} </div>
          </div>
          <div className="description" style={tagValueStyle}>
            <div className="tag" style={tagStyle}>Description:</div>
            <div className="value" style={valueStyle}>
              {product?.description}
            </div>
          </div>
          <div className="category" style={tagValueStyle}>
            <div className="tag" style={tagStyle}>Category:</div>
            <div className="value" style={valueStyle}>{product?.category} </div>
          </div>
          <div className="rating-rate" style={tagValueStyle}>
            <div className="tag" style={tagStyle}>Rate:</div>
            <div className="value" style={valueStyle}> {product?.rating.rate}</div>
          </div>
          <div className="rating-count" style={tagValueStyle}>
            <div className="tag" style={tagStyle}>Count:</div>
            <div className="value" style={valueStyle}>{product?.rating.count} </div>
          </div>
          <Link to="/">
          <div className="back-to-home-btn" style={backToHomeBtnStyles}>
            Back to Products
          </div>
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}

export default ItemDetail;
