import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Navbar from "../../components/Navbar"

function Category() {
  const router = useRouter()
  const { category } = router.query
  const [products, setProducts] = useState([])
  const [addedToCart, setAddedToCart] = useState({})

  useEffect(() => {
    if (category) {
      fetch(`https://fakestoreapi.com/products/category/${category}`)
        .then(response => response.json())
        .then(data => setProducts(data))
        .catch(error => console.error(error))
    }
  }, [category])

  if (!category) {
    return <div>Loading...</div>
  }

  return (
    <>
      {/* <Navbar/> */}
      <div className="flex flex-wrap justify-center items-center bg-gray-300 text-black">
        <h1 className="text-2xl font-bold mb-4 uppercase">{category}</h1>
        <ul className="bg-gray-300 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map(product => (
            <li key={product.id} className="border border-gray-300 rounded-lg overflow-hidden shadow-md bg-white">
              <div className="p-4">
                <h2 className="text-lg font-bold mb-2 text-black">{product.title}</h2>
                <img src={product.image} alt={product.title} className="w-full h-48 object-cover mb-4 text-black" />
                <div className="font-bold text-lg mb-2 text-black">${product.price}</div>
                <button
                  className={`bg-black rounded-full hover:bg-gray-500 text-white font-bold py-2 px-4 rounded ${addedToCart[product.id] ? 'bg-green-500' : ''}`}

                  onClick={() => {
                    setAddedToCart(prevState => ({ ...prevState, [product.id]: true }))
                  }}
                >
                  {addedToCart[product.id] ? 'Added to Cart' : 'Add to Cart'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Category
