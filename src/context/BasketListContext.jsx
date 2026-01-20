import { createContext, useContext, useState } from "react";

const BasketListContext = createContext();

export const BasketListProvider = ({ children }) => {
  const [basketList, setBasketList] = useState([]);
  const addToBasketList = (book) => {
    setBasketList((prev) => {
      const exists = prev.find((b) => b.id === book.id);
      if (exists) return prev;
      return [...prev, { ...book, quantity: 1 }];
    });
  };
  const removeFromBasketList = (id) => {
    setBasketList((prev) => prev.filter((b) => b.id !== id));
  };
  const updateQuantity = (id, qty) => {
    setBasketList((prev) =>
      prev.map((b) => (b.id === id ? { ...b, quantity: qty } : b))
    );
  };

  return (
    <BasketListContext.Provider
      value={{
        basketList,
        addToBasketList,
        removeFromBasketList,
        updateQuantity,
      }}
    >
      {children}
    </BasketListContext.Provider>
  );
};

export const useBasketList = () => useContext(BasketListContext);
