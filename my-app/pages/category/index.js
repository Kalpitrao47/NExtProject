import Link from 'next/link'
import { useEffect, useState } from 'react'

function Categories() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error(error))
  }, [])

  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {categories.map(category => (
          <li key={category}>
            <Link href={`/category/${category}`}>
              <div>{category}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Categories
