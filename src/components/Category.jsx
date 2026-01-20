import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BFLayout from "./BFLayout";


const Category = () => {
  const { categorySlug } = useParams();
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [book, setBook] = useState([]);
  const [bookData, setBookData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const catRes = await fetch("/database/category.json");
      const cats = await catRes.json();
      setCategories(cats);
      console.log(cats);

      const subCatRes = await fetch("/database/subcategory.json");
      const subCats = await subCatRes.json();
      setSubCategories(subCats);
      console.log(subCats);

      const res = await fetch("/database/books.json");
      const data = await res.json();
      console.log(data);
      setBookData(data);
    };
    fetchData();
  }, []);

  //   console.log(bookData);
  useEffect(() => {
    if (
      bookData.length > 0 &&
      categories.length > 0 &&
      subCategories.length > 0
    ) {
      const category = categories.find((c) => c.slug === categorySlug);
      if (!category) return setBook([]);

      const relatedSubcategories = subCategories.filter(
        (sub) => sub.categoryId === category.id
      );
      setFilteredSubCategories(relatedSubcategories);

      const subCatIds = relatedSubcategories.map((sub) => sub.id);

      const filteredBooks = bookData.filter((b) =>
        subCatIds.includes(b.subcategoryId)
      );

      setBook(filteredBooks);
    }
  }, [categorySlug, categories, subCategories, bookData]);

  console.log(subCategories);
  console.log(book);
  console.log(filteredSubCategories);

  return (
    <>
      <div className="space-y-12 px-4 py-6">
        {filteredSubCategories.map((subCat) => {
          const filteredBooks = book.filter(
            (b) => b.subcategoryId === subCat.id
          );

          if (filteredBooks.length === 0) return null;

          console.log(filteredBooks);

          return (
            <React.Fragment key={subCat.id}>
              <BFLayout
                title={`Recommended ${subCat.title} Books`}
                books={filteredBooks}
              />
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};

export default Category;
