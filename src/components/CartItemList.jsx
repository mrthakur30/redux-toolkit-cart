import React from 'react'
import { useSelector , useDispatch} from "react-redux";
import { CartItemCard } from './CartItemCard';
import { openModal } from '../features/modal/modalSlice';

function CartItemList() {
   const dispatch = useDispatch();
   const {cartItems , amount , total}= useSelector((store)=>store.cart);
   
   if (amount < 1) {
    return (
      <section className='cart'>
        <header>
          <h2>your bag</h2>
          <h4 className='empty-cart'>is currently empty</h4>
        </header>
      </section>
    );
  }


  return (

         <section className='cart'>

      <header>
        <h2>your bag</h2>
      </header>

      <div>
            {cartItems.map( item => <CartItemCard key={item.id} id = {item.id} title={item.title} price={item.price} img={item.img} amount={item.amount} />)}
      </div>
     
      <footer>
        <hr />
        <div className='cart-total'>
          <h4>
            total <span>${total}</span>
          </h4>
        </div>
        <button onClick={() => dispatch(openModal())} className='btn clear-btn'>clear cart</button>
      </footer>

    </section>
 
  )
}

export default CartItemList ;