import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [categories, setCategories] = useState([])
  const { data: session, status } = useSession()

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
    <nav className="flex items-center justify-between w-full py-4 px-8 bg-gray-900 text-white">
      <div>
        <Link href="/">
          <div className='uppercase'>My Ecommerce Application</div>
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
                <div className="bg-gray-900 text-white px-4 py-2 hover:bg-gray-600 transition-colors duration-300 uppercase">{category}</div>
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
        {status === "authenticated" ? (
          <button className="hover:text-gray-500 transition-colors duration-300" onClick={signOut}>
            Sign Out
          </button>
        ) : (
          <button className="hover:text-gray-500 transition-colors duration-300" onClick={signIn}>
            Sign In
          </button>
        )}
      </div>
    </nav>
  )
}
