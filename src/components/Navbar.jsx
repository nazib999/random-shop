import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink,Link } from "react-router-dom";
import clsx from "clsx";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
    const [open,setOpen] = useState(false);
    const {setShowSearch,getCartTotal} = useContext(ShopContext)

    const Links=({className})=>(
        <ul className={className}>
        <NavLink onClick={()=>setOpen(false)} to={"/"} className={clsx("flex flex-col items-center gap-1")}>
          <p>Home</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink onClick={()=>setOpen(false)}
          to={"/collection"}
          className="flex flex-col items-center gap-1"
        >
          <p>Collection</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink onClick={()=>setOpen(false)} to={"/about"} className="flex flex-col items-center gap-1">
          <p>About</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink onClick={()=>setOpen(false)} to={"/contact"} className="flex flex-col items-center gap-1">
          <p>Contact</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-600 hidden" />
        </NavLink>
      </ul>
    )
  return (
    <header className="flex justify-between items-center py-5 font-medium ">
      <Link to={'/'}><img src={assets.logo} className="w-36" alt="" /></Link>
      
      <Links className={'hidden sm:flex  gap-5 text-sm text-gray-500'}/>
     
      <div className="flex items-center gap-6">
        <img onClick={()=>setShowSearch(true)} src={assets.search_icon} className="w-5 cursor-pointer" alt="" />
        <div className="group relative">
          <Link to={'/login'}><img
            src={assets.profile_icon}
            className="w-5 cursor-pointer"
            alt=""
          /></Link>
          <div className="absolute group-hover:block hidden  right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p className="cursor-pointer hover:text-black">Orders</p>
              <p className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
        </div>
        <Link to='/cart' className="relative">
        
        <img src={assets.cart_icon} className="w-5" alt="" />
        <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white rounded-full aspect-square text-[8px]">{getCartTotal()}</p>
        </Link>
     
        <img onClick={()=>setOpen((pre)=>!pre)} src={assets.menu_icon} className="w-5 sm:hidden cursor-pointer" alt="menu" />
   
      </div>
      {/* mobile menu  */}
      <div className={clsx("sm:hidden absolute inset-0 bg-slate-200 overflow-hidden flex items-center justify-center transition-all duration-500",open?"h-full ":"h-0 ")}>
      {open && <Links className={clsx('flex  gap-10 flex-col  text-4xl text-gray-500')}/> }
      </div>
    </header>
  );
};

export default Navbar;
