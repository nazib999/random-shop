import React, {useEffect, useContext,useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProducts = ({category,subCategory}) => {
    const [relatedProducts, setRelatedProducts] = useState([]);
    const { products } = useContext(ShopContext);

    useEffect(() => {
      
        if (products.length > 0) {
            let pcopy = products.slice();
            pcopy = pcopy.filter((item)=>item.category === category);
            pcopy = pcopy.filter((item)=>item.subCategory !== subCategory);
            pcopy = pcopy.slice(0, 5);
            setRelatedProducts(pcopy);
        }
    }, [products])
    
  return (
    <div className='my-24'>
        <div className='text-center text-3xl py-2'>
            <Title text1={'RELATED'} text2={"PRODUCTS"}/>

        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {relatedProducts.map((product)=>(
                <ProductItem key={product._id} id={product._id}  image={product.image} name={product.name} price={product.price}/>
            ))}
        </div>


    </div>
  )
}

export default RelatedProducts