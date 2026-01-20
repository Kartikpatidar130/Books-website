import React from "react";
import { useBasketList } from "../context/BasketListContext";

const BasketPage = () => {
  const { basketList, removeFromBasketList , updateQuantity } = useBasketList();
  console.log(basketList);

  const totalPrice = basketList.reduce(
    (sum, book) => sum + book.price * (book.quantity || 1),
    0
  );

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Your Basket</h1>

      {basketList.length === 0 ? (
        <p className="text-gray-600">Your basket is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            {basketList.map((book) => (
              <div
                key={book.id}
                className="flex items-center bg-white p-4 rounded-lg shadow"
              >
                <img
                  src={book.img}
                  alt={book.name}
                  className="h-24 w-20 object-cover rounded"
                />

                <div className="ml-4 flex-1">
                  <h2 className="font-semibold">{book.name}</h2>
                  <p className="text-gray-500">{book.author}</p>
                  <p className="font-medium text-green-600">₹{book.price}</p>

                  <button
                    onClick={() => removeFromBasketList(book.id)}
                    className="mt-2 text-red-600 hover:underline text-sm"
                  >
                    Remove
                  </button>
                </div>

                <div className="ml-4 flex items-center space-x-2">
                  <button
                    className="px-2 py-1 bg-gray-200 rounded"
                    onClick={() => {
                     updateQuantity(book.id, (book.quantity || 1) - 1);
                    }}
                  >
                    -
                  </button>
                  <span>{book.quantity || 1}</span>
                  <button
                    className="px-2 py-1 bg-gray-200 rounded"
                    onClick={() => {
                      updateQuantity(book.id, (book.quantity || 1) + 1);
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <p className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </p>
            <p className="flex justify-between mb-4">
              <span>Delivery:</span>
              <span>₹50</span>
            </p>
            <p className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>₹{(totalPrice + 50).toFixed(2)}</span>
            </p>

            <button className="mt-4 w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-semibold transition">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BasketPage;
