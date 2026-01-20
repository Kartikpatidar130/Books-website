import React, { useEffect , useState } from 'react'
// import {NavLink} from 'react-router-dom'

const SubCategory = ({navigationId}) => {
  const [categories, setCategories] = useState([])
  useEffect(()=>{
    const fetchData = async()=>{
        const res = await fetch("/database/category.json")
        const data = await res.json()
        const filtered = data.filter((item => item.navigationId === navigationId))
        setCategories(filtered)
    }
    fetchData()
  },[navigationId])
  console.log(categories)
  return (
  <>
    {categories.length > 0 && (
      <div className="w-56 bg-white rounded-xl shadow-lg py-2 border border-gray-200 mt-1">
        {categories.map((cat) => (
          <a
            key={cat.id}
            href={`/category/${cat.slug}`}
            className="block px-4 py-2 text-gray-800 font-light hover:bg-green-50 hover:text-green-700 rounded transition-colors "
          >
            {cat.title}
          </a>
        ))}
      </div>
    )}
  </>
)
}

export default SubCategory
