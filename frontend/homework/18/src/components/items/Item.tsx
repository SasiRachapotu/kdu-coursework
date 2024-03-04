import { imageContainer, imageDetails, imageStyle, priceStyle } from './item.style'
import { IAPIResponse } from '../../interfaces/Interface';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface IItemProps{
  readonly id:number
}

function Item({id}:IItemProps) {
  const items:IAPIResponse[] = useSelector((state:RootState)=>state.items.items); 
  const item =items.find((item)=>item.id===id)
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