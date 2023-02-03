import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const url = "https://course-api.com/react-useReducer-cart-project" ;

const initialState = {
    cartItems : [],
    amount : 0 ,
    total : 0 ,
    isLoading :true 
}

export const getCartItems = createAsyncThunk('cart/getCartItems',async () =>{
    try{
      const res = await axios(url)
      return res.data ;
    }catch(err){
      console.log(err);
    }
})

const cartSlice = createSlice({
  
    name : "cart",
    initialState,
    reducers:{
       clearCart:(state)=>{
          state.cartItems = [];
       },
       removeItem :(state,action)=>{
         const itemId = action.payload;
         state.cartItems = state.cartItems.filter((item)=>
          item.id!==itemId)
          
       } ,
    
       toggle : (state,action)=>{
        const {id , toggle} = action.payload ;
        const item = state.cartItems.find(item=>item.id ===id)  ;
       
        if(toggle==="up"){
            item.amount++
        }else{
           if(item.amount>0) item.amount-- ;
        }

       }  ,

       calculateTotals : (state)=>{
            var total = 0 ;
            var amount = 0 ;
            state.cartItems.forEach(item => {
                  total = total + item.amount ;
                  amount = amount + item.price*item.amount ; 
            });
            state.amount = total ;
            state.total = Math.trunc(amount) ;
       } ,
    },
    extraReducers:{
      [getCartItems.pending] :(state) =>{
          state.isLoading = true ;
      },
      [getCartItems.fulfilled] :(state,action) =>{
         state.isLoading = false ;
         state.cartItems = action.payload ;
     },
     [getCartItems.rejected] :(state) =>{
      state.isLoading = false ;
  }
    }
});

export const {clearCart , removeItem , toggle , calculateTotals} = cartSlice.actions ;

export default cartSlice.reducer ;