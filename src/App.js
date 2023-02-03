import Navbar from "./components/Navbar";
import CartItemList from "./components/CartItemList";
import { useDispatch, useSelector } from 'react-redux';
import { calculateTotals , getCartItems } from './features/cart/cartSlice';
import { useEffect } from 'react';
import Modal from './components/Modal';

function App() {
  
  const {cartItems , isLoading }= useSelector((store)=>store.cart);
  const { isOpen}  = useSelector((store) => store.modal);
  const dispatch = useDispatch();
 
  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);
 
  useEffect(()=>{
    dispatch(getCartItems());
  },[dispatch]);
 
  if(isLoading){
    return(
      <div className="loading">
         <h1>Loading......</h1>
      </div>
    )
  }

return (
  <main>
   {isOpen&&<Modal />}
    <Navbar />
    
    <CartItemList />
  </main>
); 
}
export default App;
