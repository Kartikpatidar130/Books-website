import React from "react";
import {useNavigate} from "react-router-dom"

const BFLayout = ({ title , books }) => {

  const navigate = useNavigate()

  return (
    <div className="w-full px-0 sm:px-4 py-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg sm:text-xl md:text-2xl font-medium text-green-700 font-sans">
          {title}
        </h1>
        {/* <button className="text-green-700 underline underline-offset-2 hover:text-green-900">
          View All
        </button> */}
      </div>

      <div className="flex gap-4 flex-nowrap overflow-x-auto scrollbar-hide py-3">
        {books?.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-xl shadow-md p-3 flex flex-col items-center min-w-35 max-w-35 sm:min-w-40 sm:max-w-40 md:min-w-50 md:max-w-50 hover:scale-105 transition duration-300 "
            onClick={()=>navigate(`/book/${book.slug}`)}

          >
            <img
              src={book.img}
              alt={book.name}
              className="w-32 h-48 object-cover rounded-md mb-2"
            />
            <h2 className="font-semibold text-gray-800 text-sm text-center line-clamp-1">
              {book.name}
            </h2>
            <p className="text-gray-500 text-xs">{book.author}</p>
            <p className="text-green-700 font-medium mt-1">${book.price}</p>
            <button className="mt-2 w-full py-1 bg-green-700 text-white rounded hover:bg-green-800 transition text-sm">
              Add To Basket
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BFLayout;
