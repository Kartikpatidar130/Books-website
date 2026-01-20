import React from "react";
import { useWishList } from "../context/WishListContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const WishListPage = () => {
  const { wishList, removeFromWishList } = useWishList();
  const navigate = useNavigate()

  return (
    <>
        <button
          className="text-2xl px-4 py-2 rounded-full hover:bg-gray-200"
          onClick={() => navigate("/")}
        >
          <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
        </button>
      {wishList.length === 0 ? (
        <p className="text-center mt-10">No wishlist items 😔</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {wishList.map((book) => (
            <div key={book.id} className="border p-4 rounded">
              <img src={book.img} className="h-40 mx-auto" />
              <h3 className="font-semibold mt-2">{book.name}</h3>
              <button
                onClick={() => removeFromWishList(book.id)}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default WishListPage;
