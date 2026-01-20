import React from "react";
import "./index.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookSummary from "./components/BookSummary";
import Category from "./components/Category";
import About from "./components/About";
import { WishListProvider } from "./context/WishListContext";
import WishListPage from "./components/WishListPage";
import { BasketListProvider } from "./context/BasketListContext";
import BasketListPage from "./components/BasketListPage"

const App = () => {
  return (
    <BrowserRouter>
      <BasketListProvider>
        <WishListProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/:categorySlug" element={<Category />}></Route>
            <Route path="/book/:slug" element={<BookSummary />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/wishlistpage" element={<WishListPage />}></Route>
            <Route path="/basketpage" element={<BasketListPage />}></Route>
          </Routes>
        </WishListProvider>
      </BasketListProvider>
    </BrowserRouter>
  );
};

export default App;
