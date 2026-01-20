import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faQuestionCircle,
  faUser,
  faHeart,
  faBasketShopping,
  faBars,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import SubCategory from "./SubCategory";
import { NavLink , useNavigate } from "react-router-dom";


const Navbar = () => {

  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [active, setActive] = useState(null);
  const [value, setValue] = useState("");
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const booksRes = await fetch("/database/books.json");
      const booksData = await booksRes.json();
      setBooks(booksData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = books.filter((b) =>
      b.name.toLowerCase().includes(value.toLowerCase())
    );
    if (filtered.length > 0) {
      setFilteredBooks(filtered);
    }
  }, [value, books]);

  console.log(filteredBooks);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/database/category.json");
      const data = await res.json();
      console.log(data);
      setMenuItems(data);
    };
    fetchData();
  }, []);
  const handleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white  ">
      <div className="shadow-md px-4 py-2">
        <div className="max-w-7xl mx-auto flex flex-row items-center lg:justify-between gap-4">
          <div className="flex items-center gap-2 lg:hidden justify-between">
            <button className="p-2" onClick={handleMenu}>
              <FontAwesomeIcon icon={faBars} className="text-2xl" />
            </button>
            
          </div>

          <div className="shrink-0 mx-auto lg:mx-0">
            <img
              src="https://www.worldofbooks.com/cdn/shop/files/Logo740_4e468e8d1e.svg?v=1759237354&width=160"
              alt="Logo"
              className="h-10 w-auto"
            />
          </div>

          {/* desktop */}
          {/* Desktop Search */}
<div className="hidden lg:block relative w-full lg:w-150">
  <div className="flex border rounded-md overflow-hidden w-full">
    <span className="flex items-center px-3 text-gray-500 border-r">
      <FontAwesomeIcon icon={faSearch} />
    </span>
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Search by title, author or ISBN"
      className="grow px-4 py-2 text-base outline-none"
    />
    <button className="bg-green-700 text-white px-6 py-2 text-sm font-bold hover:bg-green-800">
      Search
    </button>
  </div>

  {/* Dropdown */}
  {value && filteredBooks.length > 0 && (
    <div className="absolute top-full left-0 right-0 bg-white border rounded-md mt-1 shadow-xl max-h-72 overflow-auto z-50">
      {filteredBooks.map((book) => (
        <div
          key={book.id}
          onClick={() => {setValue("") , navigate(`/book/${book.slug}`)}}
          className="px-4 py-2 cursor-pointer hover:bg-green-50"
        >
          <p className="text-sm font-semibold">{book.name}</p>
          <p className="text-xs text-gray-500">{book.author}</p>
        </div>
      ))}
    </div>
  )}
</div>


          <div className="flex gap-4 items-center text-gray-700">
            <div className="hidden lg:flex flex-col items-center text-sm hover:text-blue-600 cursor-pointer">
              <FontAwesomeIcon icon={faQuestionCircle} className="text-lg" />
              <span>Help</span>
            </div>
            
            <div className="flex flex-col items-center text-sm hover:text-red-500 cursor-pointer">
              <FontAwesomeIcon icon={faHeart} className="text-lg" />
              <NavLink to="/wishlistpage">Wishlist</NavLink>
            </div>
            <div className="flex flex-col items-center text-sm hover:text-red-500 cursor-pointer">
              <FontAwesomeIcon icon={faBasketShopping} className="text-lg" />
              <NavLink to="/basketpage">Basket</NavLink>
            </div>
          </div>
        </div>

        {/* Mobile search */}
        <div className="lg:hidden w-full max-w-120 mx-auto mt-3 relative">
          <div className="flex border rounded-md overflow-hidden w-full">
            <span className="flex items-center px-3 text-gray-500 border-r">
              <FontAwesomeIcon icon={faSearch} />
            </span>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Search by title, author or ISBN"
              className="grow min-w-0 px-2 py-2 text-sm truncate outline-none"
            />
            <button className="bg-green-700 text-white px-4 py-1 text-sm font-bold hover:bg-green-800">
              Search
            </button>
          </div>

          {/* Dropdown */}
          {value && filteredBooks.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border rounded-md mt-1 shadow-lg max-h-60 overflow-auto z-50">
              {filteredBooks.map((book) => (
                <div
                  key={book.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {setValue(book.name) , navigate(`/book/${book.slug}`)}}
                >
                  <p className="text-sm font-medium">{book.name}</p>
                  <p className="text-xs text-gray-500">{book.author}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <ul className="hidden lg:flex items-center justify-center gap-8 py-2 border">
        <li className="text-green-700 text-lg font-medium hover:underline underline-offset-2 cursor-pointer">
          <NavLink to="/">Home</NavLink>
        </li>

        {menuItems.map((item) => (
          <li
            key={item.id}
            onMouseEnter={() => setActive(item.id)}
            onMouseLeave={() => setActive(null)}
            className="text-green-700 text-lg font-medium hover:underline underline-offset-2 cursor-pointer relative"
          >
            <NavLink to={`/${item.slug}`}>{item.title}</NavLink>

            {/* {active === item.id && (
              <div className="absolute top-full left-0 z-50">
                <SubCategory navigationId={item.id} />
              </div>
            )} */}
          </li>
        ))}

        <li className="text-green-700 text-lg font-medium hover:underline underline-offset-2 cursor-pointer">
          <NavLink to="about">About</NavLink>
        </li>
      </ul>

      <ul
        className={`${
          isOpen ? "flex" : "hidden"
        } flex-col gap-2 py-4 px-4 max-w-xs border-r h-screen overflow-auto`}
      >
        <li className="flex items-center justify-between px-4 py-3 text-green-700 text-lg font-medium rounded-lg hover:bg-black hover:text-white transition-colors cursor-pointer">
          <NavLink to="/" onClick={() => setIsOpen(false)}>
            Home
          </NavLink>
          <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
        </li>

        {menuItems.map((item) => (
          <li
            key={item.id}
            className="relative flex flex-col  items-start md:items-center justify-between px-4 py-3 text-green-700 text-lg font-medium rounded-lg hover:bg-black hover:text-white transition-colors cursor-pointer"
            onClick={() => setActive(item.id === active ? null : item.id)}
          >
            <div className="flex items-center justify-between w-full">
              <NavLink to={`/${item.slug}`} onClick={() => setIsOpen(false)}>
                {item.title}{" "}
              </NavLink>
              <FontAwesomeIcon
                icon={faChevronRight}
                className={`text-sm ml-2 transition-transform duration-200 `}
              />
            </div>

            {/* {active === item.id && (
              <div className="w-full  bg-white rounded-xl z-50">
                <SubCategory navigationId={item.id} />
              </div>
            )} */}
          </li>
        ))}
        <li className="flex items-center  justify-between px-4 py-3 text-green-700 text-lg font-medium rounded-lg hover:bg-black hover:text-white transition-colors cursor-pointer">
          <NavLink to="/about" onClick={() => setIsOpen(false)}>
            About
          </NavLink>
          <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
