import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import BFLayout from "./BFLayout";
import { useParams, useNavigate } from "react-router-dom";
import WishListButton from "./WishListButton";
import { useBasketList } from "../context/BasketListContext";

const BookSummary = () => {
  const { slug } = useParams();
  const [book, setBook] = useState([]);
  const [title, setTitle] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [reccBook, setReccBook] = useState([]);
  const [bookData, setBookData] = useState([]);
  const navigate = useNavigate();

  const {basketList , addToBasketList , removeFromBasketList} = useBasketList()
  
  const exists = basketList.find((b) => b.id === book.id);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/database/books.json");
      const data = await res.json();
      console.log(data);
      setBookData(data);

      const subCatRes = await fetch("/database/subcategory.json");
      const subCats = await subCatRes.json();
      setSubCategories(subCats);
      console.log(subCats);
    };
    fetchData();
  }, []);

  console.log(subCategories);
  console.log(bookData);

  useEffect(() => {
    if (bookData.length > 0 && subCategories.length > 0) {
      const foundBook = bookData.find((b) => b.slug === slug);
      setBook(foundBook);

      if (foundBook) {
        const result = subCategories.filter(
          (subcat) => subcat.id === foundBook.subcategoryId
        );

        setTitle(result[0].title);

        const filteredBook = bookData.filter(
          (b) =>
            b.subcategoryId === foundBook.subcategoryId && b.id !== foundBook.id
        );
        setReccBook(filteredBook);
      }
    }
  }, [slug, bookData, subCategories]);

  console.log(reccBook);
  return (
    <div className="w-full px-4 py-6">
      <button
        className="text-2xl p-1 rounded-full hover:bg-gray-200"
        onClick={() => navigate("/")}
      >
        <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
      </button>

        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg  p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
            {/* Image */}
            <div className="w-full sm:w-52 h-64 sm:h-72 rounded-2xl overflow-hidden shadow-md">
              <img
                src={book.img}
                alt={book.name}
                className="w-full h-full object-cover hover:scale-105 transition duration-300"
              />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col gap-3 text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
                {book.name}
              </h1>

              <p className="text-lg sm:text-xl font-semibold text-green-700">
                $ {book.price}
              </p>

              <p className="text-sm text-gray-500">
                Condition: <span className="font-medium">{book.condition}</span>
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <button onClick = {()=>{exists ? removeFromBasketList(book.id) : addToBasketList(book)}} 

                className={`flex-1  text-white py-3 transition rounded-xl text-sm sm:text-base font-semibold ${exists ? "hover:bg-gray-400 bg-gray-400" : "hover:bg-green-800  bg-green-700" }`}>

                {exists ?  (<p>Remove From Basket</p>) : (<p>Add To Basket</p>)}
                </button>
                 
                <div className="flex justify-center sm:justify-start">
                  <WishListButton book={book} />
                </div>
              </div>
            </div>
          </div>
        </div>
      

      <div className="max-w-3xl mx-auto mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Summary</h2>
        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
          {book.summary}
        </p>
      </div>
      <div className="w-full px-0 lg:px-4 ">
        <BFLayout
          title={`Recommended ${title} books`}
          topic={book.title}
          books={reccBook}
        />
      </div>
    </div>
  );
};

export default BookSummary;
