import clsx from 'clsx'
import React, { useContext, useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import { ShopContext } from '../context/ShopContext'
import ProductItem from '../components/ProductItem'

const Collection = () => {
  const {products,search,showSearch} = useContext(ShopContext)
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showFilter, setShowFilter] = useState(false)
  const [catagory, setCatagory] = useState([])
  const [subCatagory, setSubCatagory] = useState([])
  const [sortType, setSortType] = useState('relavent')

  const toggleCatagory =(e)=>{
     if(catagory.includes(e.target.value)){
      setCatagory((pre)=>pre.filter((item)=>item!==e.target.value))
     }
     else{
      setCatagory((pre)=>[...pre,e.target.value])
     }
  }

  const toggleSubCatagory =(e)=>{
    if(subCatagory.includes(e.target.value)){
     setSubCatagory((pre)=>pre.filter((item)=>item!==e.target.value))
    }
    else{
     setSubCatagory((pre)=>[...pre,e.target.value])
    }
 }

 const applyFilter = ()=>{
    let productCopy = products.slice();
    if(showSearch && search.length>0){
      productCopy = productCopy.filter((item)=>item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if(catagory.length>0){
      productCopy = productCopy.filter((item)=>catagory.includes(item.category))
    }
    if(subCatagory.length>0){
      productCopy = productCopy.filter((item)=>subCatagory.includes(item.subCategory))
    }
    setFilteredProducts(productCopy);

 }

 const sortProducts = ()=>{
  const fpCopy = filteredProducts.slice();
    switch (sortType) {
      case 'low-high':
        console.log("first")
        setFilteredProducts(fpCopy.sort((a,b)=>(a.price-b.price)))
        break;
    case 'high-low':
      console.log("second")
        setFilteredProducts(fpCopy.sort((a,b)=>(b.price-a.price)))
        break;
    
      default:
        applyFilter()
        break;
    }
 }



  useEffect(() => {
    
    applyFilter()
   
   
  }, [catagory,subCatagory,search])

  useEffect(() => {
    sortProducts()
    console.log(sortType)
  },[sortType])


  
  
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
     
     {/* filter option  */}
     <div className='min-w-60 '>
      <p onClick={()=>setShowFilter(!showFilter)} className='text-xl my-2 flex items-center cursor-pointer gap-2'>FILTERS
        <img src={assets.dropdown_icon} className={clsx('h-3 sm:hidden ',showFilter?'rotate-90':"")} alt="" />
      </p>

      <div className={clsx('border border-gray-300 pl-5 py-3 mt-6 sm:block',showFilter?"block":"hidden")}>
       <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
       <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
        <p className='flex gap-2'>
          <input type="checkbox" className='w-3' value={'Men'} onChange={toggleCatagory} />Men
        </p>
        <p className='flex gap-2'>
          <input type="checkbox" className='w-3' value={'Women'} onChange={toggleCatagory} />Women
        </p>
        <p className='flex gap-2'>
          <input type="checkbox" className='w-3' value={'Kids'} onChange={toggleCatagory} />Kids
        </p>
       </div>
      </div>

      <div className={clsx('border border-gray-300 pl-5 py-3 mt-6 my-5 sm:block',showFilter?"block":"hidden")}>
       <p className='mb-3 text-sm font-medium'>TYPE</p>
       <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
        <p className='flex gap-2'>
          <input type="checkbox" className='w-3' value={'Topwear'} onChange={toggleSubCatagory}/>Topwear
        </p>
        <p className='flex gap-2'>
          <input type="checkbox" className='w-3' value={'Bottomwear'} onChange={toggleSubCatagory}/>Bottomwear
        </p>
        <p className='flex gap-2'>
          <input type="checkbox" className='w-3' value={'Winterwear'} onChange={toggleSubCatagory}/>Winterwear
        </p>
       </div>
      </div>

       

     </div>

      {/* product list */}
      <div className='flex-1'>
      <div className='flex justify-between text-base sm:text-2xl mb-4'>
        <Title text1={'All'} text2={'Collections'}/>
        <select
  onChange={(e) => setSortType(e.target.value)} value={sortType} 
  className="border-2 border-gray-400 text-sm px-2"
>
  
  <option value="relavent">Sort by: Relevent</option>
  <option value="low-high">Sort by: Low to High</option>
  <option value="high-low">Sort by: High to Low</option>
</select>

      </div>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
        {
          filteredProducts.map((item,index)=>(
            <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image}/>
          ))
        }
      </div>
      </div>
    </div>
  )
}

export default Collection