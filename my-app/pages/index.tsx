import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from "../components/Navbar"
import {useSession} from "next-auth/react"

export default function MenuBar() {
  const { data: session, status } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [categories, setCategories] = useState([])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch('https://fakestoreapi.com/products/categories')
      const categories = await response.json()
      setCategories(categories)
    }
    fetchCategories()
  }, [])

  return (
    <>
      {/* <nav className="flex items-center justify-between w-full py-4 px-8 bg-gray-900 text-white">
        <div>
          <Link href="/">
            <div>My Ecommerce Application</div>
          </Link>
        </div>
        <div className="flex flex-row space-x-4">
          <Link href="/">
            <div className="hover:text-gray-500 transition-colors duration-300">Home</div>
          </Link>
          <div className="relative">
            <div className="hover:text-gray-500 transition-colors duration-300 cursor-pointer" onClick={toggleMenu}>
              Categories
              <svg className={`inline-block w-4 h-4 ml-1 fill-current transform ${isMenuOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20">
                <path d="M10 12l-6-6h12l-6 6z" />
              </svg>
            </div>
            <div className={`absolute z-10 top-full left-0 w-40 py-2 mt-2 bg-white rounded-lg shadow-lg ${isMenuOpen ? '' : 'hidden'}`}>
              {categories.map((category) => (
                <Link key={category} href={`/category/${category}`}>
                  <div className="bg-gray-900 text-white px-4 py-2 hover:bg-gray-600 transition-colors duration-300">{category}</div>
                </Link>
              ))}
            </div>
          </div>
          <Link href="/products">
            <div className="hover:text-gray-500 transition-colors duration-300">Products</div>
          </Link>
          <Link href="/cart">
            <div className="hover:text-gray-500 transition-colors duration-300">Cart</div>
          </Link>
          <Link href="/account">
            <div className="hover:text-gray-500 transition-colors duration-300">Account</div>
          </Link>
        </div>
      </nav> */}
      {/* <Navbar /> */}


      {/* <div className="relative w-full h-96">
        <Image src="/main2.jpg" alt="Best Quality Products" layout="fill" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-3xl font-bold">
          <h2>New Launches from electronics,
            jewellery,
            men's clothing,
            women's clothing</h2>
          <Link href="/products">
            <button className="mt-4 bg-black rounded-full hover:bg-gray-500 text-white font-bold py-2 px-4 rounded">Shop Now</button>
          </Link>
        </div>
      </div> */}

      <div className="relative h-screen">
        <div className="absolute inset-0">
          <Image
            src="/main3.jpg"
            alt="background image"
            fill
          />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          <h1 className='text-2xl font-bold text-gray-200'><h2>New Launches from electronics,
            jewellery,
            men's clothing,
            women's clothing</h2> </h1>
          <p className='mt-4 text-sm text-white'>{session ? `${session.user.name},`:''}Welcome!!!!!!!!!!!</p>
          <Link href="/products">
            <button className="mt-4 bg-black rounded-full hover:bg-red-500 text-white font-bold py-2 px-4 rounded">Shop Now</button>
          </Link>
        </div>
      </div>

    </>
  )
}
