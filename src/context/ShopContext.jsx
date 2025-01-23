import { createContext, useState ,useEffect} from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";


export const ShopContext = createContext();

const ShopContextProvitemIder = ({ children }) => {
  const currency = "$";
  const delivey_fee = 5;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});

  const addToCart = (itemId,size) => {
    if(!size){
      toast.error("Please select a size");
      return;
    }
    let cartCopy = structuredClone(cartItems);
    if (cartCopy[itemId]) {
      if(cartCopy[itemId][size]){
        cartCopy[itemId][size] += 1;
      }
      else{
        cartCopy[itemId][size] = 1;
      }
    }
    else{
      cartCopy[itemId] = {[size]:1}
    } 
    setCartItems(cartCopy);

  }

  const updateQuality = async (itemId,size,quantity) => {

    let cartCopy = structuredClone(cartItems);

    cartCopy[itemId][size] = quantity;

    setCartItems(cartCopy);


  }

  const getCartAmount = () => {
    let total = 0;
    for(let item in cartItems){
      let itemInfo = products.find((product)=>product._id === item);
      for(let size in cartItems[item]){
        try {
          if(cartItems[item][size]>0){
            total +=itemInfo.price * cartItems[item][size];
          }
        } catch (error) {
          
        }
      }
    }
    return total ;
  }
  
  const getCartTotal = () => {
    let total = 0;
    for(let item in cartItems){
      for(let size in cartItems[item]){
        try {
          if(cartItems[item][size]>0){
            total += cartItems[item][size];}
        } catch (error) {
          
        }
      }
    }
    return total; 
  }

  

  const value = {
    products,
    currency,
    delivey_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,getCartTotal,updateQuality,
    getCartAmount
  };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvitemIder;
