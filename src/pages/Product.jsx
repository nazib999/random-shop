import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import index from "toastify";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { products,addToCart } = useContext(ShopContext);
  const [product, setProduct] = useState(null);
  const { productId } = useParams();
  const [images, setImages] = useState(null);
  const [size, setSize] = useState(null);

  const fetchProduct = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProduct(item);
        setImages(item.image[0]);
      }
    });
  };
  useEffect(() => {
    fetchProduct();
  }, [productId, products]);

  return product ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-2 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto justify-between sm:justify-normal sm:w-[18.7%]  w-full">
            {product?.image.map((img, index) => (
              <img
                onClick={() => setImages(img)}
                key={index}
                src={img}
                alt=""
                className="w-[24%] sm:w-full cursor-pointer sm:mb-3 flex-shrink-0 "
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%] sm:h-80">
            <img
              src={images}
              className="w-full h-auto  object-contain"
              alt=""
            />
          </div>
        </div>
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{product.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} className="w-3.5" alt="" />
            <img src={assets.star_icon} className="w-3.5" alt="" />
            <img src={assets.star_icon} className="w-3.5" alt="" />
            <img src={assets.star_icon} className="w-3.5" alt="" />
            <img src={assets.star_dull_icon} className="w-3.5" alt="" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">${product.price}</p>
          <p className="mt-5 to-gray-500 md:w-4/5">{product.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {product.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${
                    item === size ? "border-orange-500" : ""
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button onClick={()=>addToCart(product._id,size)} className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700">
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-3/4" />
          <div className="flex flex-col mt-5 text-sm text-gray-500 gap-1">
            <p>100% Original product</p>
            <p>Cash on delivery is available on this product</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border text-sm px-5 py-3 ">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et expedita
            ducimus repellat animi doloremque architecto iure aut atque dolore
            delectus illum minus, cupiditate dolores fuga quidem libero veniam a
            quod vitae tenetur quisquam. Ut pariatur esse accusantium vel
            necessitatibus quibusdam possimus, alias sed, et enim, ad corrupti
            magnam inventore perferendis!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            accusamus nulla in quisquam fugit nisi ex enim iure asperiores
            consequuntur!
          </p>
        </div>
      </div>

      <RelatedProducts category={product.category} subCategory = {product.subCategory}/>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
