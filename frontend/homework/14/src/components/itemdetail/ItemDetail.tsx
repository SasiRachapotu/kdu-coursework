import { useContext } from "react";
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
import { ItemContextApi } from "../../context/ItemsContext";

function ItemDetail() {
    const {id} = useParams();
    const itemContainerContext = useContext(ItemContextApi);
    const product = itemContainerContext.items.find((pdt)=>pdt.id===parseInt(id!))
  return (
    <div className="main-container" style={mainContainerStyle}>
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
              Your perfect pack for everyday use and walks in the forest. Stash
              your laptop up to 15 inches in the padded sleeve, your everyday
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
  );
}

export default ItemDetail;
