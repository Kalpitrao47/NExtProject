import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar';

const ProductId = () => {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [isAddedToCart, setIsAddedToCart] = useState(false); 
  const productId = router.query.productid;

  useEffect(() => {
    async function fetchProduct() {
      const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
      const data = await response.json();
      setProduct(data);
    }
    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    setIsAddedToCart(true);
  };

  return (
    <>
      <Navbar/>
    <div className="bg-gray-200 min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto py-8">
        {product ? (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img className="w-full h-64 object-cover" src={product.image} alt={product.title} />
            <div className="p-6">
              <h1 className="text-3xl font-semibold text-gray-800 mb-4">{product.title}</h1>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <p className="text-gray-600">Price: ${product.price}</p>
                <button 
                  className={`bg-black rounded-full hover:bg-gray-500 text-white font-bold py-2 px-4 rounded ${isAddedToCart ? 'bg-green-500' : ''}`} 
                  onClick={handleAddToCart} 
                  disabled={isAddedToCart} 
                >
                  {isAddedToCart ? 'Added to Cart' : 'Add to Cart'} 
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center mt-16">
            <svg className="animate-spin h-8 w-8 text-gray-600 mx-auto" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm12 0a8 8 0 100-16 8 8 0 000 16zm-4 4a4 4 0 110-8 4 4 0 010 8z" />
            </svg>
            <p className="text-gray-600 mt-4">Loading...</p>
          </div>
        )}
      </div>
    </div>
    </>
    
  );
}

export default ProductId;
