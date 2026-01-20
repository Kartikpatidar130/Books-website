import React from "react";
import { useNavigate } from "react-router-dom";
const BSLayout = ({ title , books }) => {
  
  const navigate = useNavigate();

  return (
    <div className="w-full px-4 py-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg sm:text-xl md:text-2xl font-medium text-green-700 font-sans">
          {title}
        </h1>
        <button className="text-green-700 underline underline-offset-2 hover:text-green-900">
          View All
        </button>
      </div>
      <div className="flex gap-4 flex-nowrap overflow-x-auto scrollbar-hide py-3">
        {books?.map((book, index) => (
          <div key={index} onclick = {()=>navigate(`/book/${book.slug}`)}className="flex flex-col items-center max-15 sm:max-50 md:max-w-60  " >
            <div className="w-40 h-40 sm:w-40 sm:h-40 md:w-50 md:h-50 bg-gray-200 rounded-full flex items-center justify-center">
              <div className="overflow-hidden  h-35 w-25 md:h-40 p-2 hover:scale-105 transition-transform  duration-300">
              <img
                src={book.img}
                alt={book.name}
                className="object-cover w-full h-full"
              />
            </div>
            </div>
            <p className="font-semibold text-gray-800 text-center line-clamp-1">{book.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BSLayout;
