import React from "react";
import { useWishList } from "../context/WishListContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHeart , regularHeart , solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

const WishListButton = ({ book }) => {
  const { wishList, addToWishList, removeFromWishList } = useWishList();

  console.log(wishList)
  const exists = wishList.find((b) => b.id === book.id);

  return (
    <button
      onClick={() =>
        exists ? removeFromWishList(book.id) : addToWishList(book)
      }
        className={`px-3 py-1 rounded text-md border`}
    >
      {exists ? (
        <FontAwesomeIcon icon={solidHeart} className="text-red-500" />
      ) : (
        <FontAwesomeIcon icon={regularHeart} />
      )}
    </button>
  );
};

export default WishListButton;
