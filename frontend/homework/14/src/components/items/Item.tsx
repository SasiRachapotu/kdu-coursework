import { useContext } from 'react'
import { imageContainer, imageDetails, imageStyle, priceStyle } from './item.style'
import { ItemContextApi } from '../../context/ItemsContext';

interface IItemProps{
  readonly id:number
}

function Item({id}:IItemProps) {
  const itemContainerContext = useContext(ItemContextApi);
  const item =itemContainerContext.items.find((item)=>item.id===id)
  return (
    <div className='item' >
      <div className="image-container" style={imageContainer}>
        <img src={item?.image} alt='product' style={imageStyle}></img>
      </div>
      <div className="image-details" style={imageDetails}>
        <div className="title">
        {item?.title}
        </div>
        <div className="price" style={priceStyle}>
        {item?.price} $
        </div>
      </div>
    </div>
  )
}

export default Item