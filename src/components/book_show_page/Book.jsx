import React from "react";
import Navbar from "../navbar/Navbar";
import BookCard from "../book_show/BookCard";
import Footer from "../footer/Footer";

function Book() {
    return (
        <>
            <Navbar />
            <BookCard
            imageSrc="book-4.png"
            category="Action"
            title="Some Book"
            description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, possimus nostrum!"
            author="Name Surname"
            pagesNum="289"
            price="12,99$"
            copiesNum="200"
            soldCopies="124"
            language="English"
            />
            <Footer/>
        </>
    )
}

export default Book;