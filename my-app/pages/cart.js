import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useSession } from 'next-auth/react'

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(items);
  }, []);

  const handleRemoveFromCart = (product) => {
    setCartItems(cartItems.filter((item) => item.id !== product.id));
    localStorage.setItem(
      'cartItems',
      JSON.stringify(cartItems.filter((item) => item.id !== product.id))
    );
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {

    return (
      <>
      {/* <Navbar/> */}
      <div className="flex flex-wrap justify-center items-center bg-gray-300 text-black">
        Please Signin to view your Cart.
       </div> 
      </>
      
    )
  }

  return (
    <>
    {/* <Navbar/> */}
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 p-4 md:p-8 lg:p-12 xl:p-16 bg-gray-300">
  {cartItems.map((product) => (
    <div key={product.id} className="bg-white shadow-sm p-4 rounded-lg border border-gray-200 hover:shadow-lg transition duration-300">
      <h2 className="text-xl font-medium">{product.title}</h2>
      <img src={product.image} alt={product.title} className="w-full mt-4" />
      <p className="text-lg font-medium mt-4">${product.price}</p>
      <button onClick={() => handleRemoveFromCart(product)} className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 mt-4 rounded-full">
        Remove from cart
      </button>
    </div>
  ))}
</div>
<div className="mt-8 text-2xl font-medium">Total Price: ${totalPrice}</div>

    </>
    

  );
}
