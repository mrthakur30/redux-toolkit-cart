import React from 'react'
import { ChevronDown , ChevronUp} from '../icons';
import { useDispatch } from 'react-redux';
import { removeItem , toggle } from '../features/cart/cartSlice';

export const CartItemCard = (props) => {
  
  const {id,title ,img , price , amount} = props ;
  const dispatch = useDispatch();

  return (

       <article className='cart-item'>
      <img src={img} alt={title} />
      <div>
        <h4>{title}</h4>
        <h4 className='item-price'>${price}</h4>
       
        <button onClick={()=>dispatch(removeItem(id))} className='remove-btn'>remove</button>
      </div>
      <div>
      
        <button onClick={()=> dispatch(toggle({id:id,toggle:"up"}))} className='amount-btn'>
          <ChevronUp />
        </button>
      
        <p className='amount'>{amount}</p>
    
        <button onClick={()=>dispatch(toggle({id:id,toggle:"down"}))} className='amount-btn'>
          <ChevronDown />
        </button>
      </div>
    </article>
    
  )
}
