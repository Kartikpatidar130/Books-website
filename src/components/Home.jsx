import React, { useEffect, useState } from "react";
import BFLayout from "./BFLayout";
import BSLayout from "./BSLayout";
import BookSummary from "./BookSummary";
const Home = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const catRes = await fetch("/database/category.json");
      const cats = await catRes.json();
      setCategories(cats);

      const subCatRes = await fetch("/database/subcategory.json");
      const subCats = await subCatRes.json();
      setSubCategories(subCats);

      const booksRes = await fetch("/database/books.json");
      const booksData = await booksRes.json();
      setBooks(booksData);
    };

    fetchData();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/database/books.json");
      const data = await res.json();
      console.log(data);
      setBooks(data);
    };
    fetchData();
  }, []);

  console.log(books);

   const getBooksByCategory = (categorySlug) => {
    const mainCategory = categories.find((c) => c.slug === categorySlug);
    if (!mainCategory) return [];

    const subCatIds = subCategories
      .filter((sub) => sub.categoryId === mainCategory.id)
      .map((sub) => sub.id);

    return books.filter((book) => subCatIds.includes(book.subcategoryId));
  };


  return (
    <>
      <div className="space-y-12 px-4 py-6">
      {categories.map((cat) => {
        const catBooks = getBooksByCategory(cat.slug);
        if (catBooks.length === 0) return null; 

        return (
          <React.Fragment key={cat.id}>
            <BFLayout
              title={`Best Selling ${cat.title} Books`}
              books={catBooks}
            />

          </React.Fragment>
        );
      })}
    </div>
    </>
  );
};

export default Home;
