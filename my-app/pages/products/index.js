import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import { getSession } from 'next-auth/react'

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([])
  const [cartItems, setCartItems] = useState([]);
  const [session, setSession] = useState(null);

  useEffect(() => {
    async function getData() {
      const session = await getSession()
      setSession(session);
      setLoading(false)
  
      const response = await fetch('https://fakestoreapi.com/products')
      const data = await response.json()
      setProducts(data)
    }
  
    getData()
  }, [])
  

  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product]);
    localStorage.setItem('cartItems', JSON.stringify([...cartItems, product]));
  };

  return (
    <>
      <Head>
        <title>Products | My Ecommerce Application</title>
      </Head>
      {/* <Navbar /> */}


      <div className="flex flex-wrap justify-center items-center bg-gray-300 text-black">
        {!session && <div>Please Signin to view all Products</div>}
        {session && products.map((product) => {

          return (
            <div key={product.id} className="w-80 h-full mx-4 my-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
              <Link href={`/products/${product.id}`}>
                <img src={product.image} alt={product.title} className="object-contain w-full h-48 rounded-t-lg" />
              </Link>
              <div className="p-4">
                <Link href={`/products/${product.id}`}>
                  <h2 className="text-lg font-medium text-gray-800 hover:text-gray-600">{product.title}</h2>
                </Link>
                <p className="text-sm font-medium text-gray-500">{product.category}</p>
                <p className="mt-2 text-lg font-bold text-gray-800">${product.price}</p>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-black rounded-full hover:bg-gray-500 text-white font-bold py-2 px-4 rounded bg-black text-white hover:bg-cyan-400"
                >
                  Add to Cart
                </button>
                <button style={{ marginLeft: '15px' }}>
                  <Link href="/cart">
                    <div className="flex justify-center">
                      <div className="bg-red-500 rounded-full hover:bg-red-600 text-white font-medium py-2 px-4 mt-4 ">Go to Cart</div>
                    </div>
                  </Link>
                </button>

              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Products
