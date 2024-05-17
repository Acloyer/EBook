import React, { useState, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import BookCard from "../book_show/BookCard";
import Footer from "../footer/Footer";
import axios from "axios";
import config from "../../config";

function Book() {
    const [bookData, setBookData] = useState(null);

    useEffect(() => {
        const id = new URLSearchParams(window.location.search).get("id");
        if (id) {
            fetchBookData(id);
        }
    }, []);

    const fetchBookData = async (id) => {
        try {
            const response = await axios.get(`${config.backApi}/books/${id}`);
            setBookData(response.data);
        } catch (error) {
            console.error("Error fetching book data:", error);
        }
    };

    return (
        <>
            <Navbar />
            {bookData && (
                <BookCard
                    imageSrc={bookData.posterUrl}
                    category={bookData.genre.name}
                    title={bookData.title}
                    description={`Pages: ${bookData.pageCount}, Language: ${bookData.language.name}`}
                    author={bookData.author.pseudonym}
                    pagesNum={bookData.pageCount}
                    price={`${bookData.price}$`}
                    copiesNum={bookData.quantity}
                    soldCopies={bookData.soldUnits}
                    language={bookData.language.name}
                    genre_id={bookData.genre.id}
                    author_id={bookData.author.id}
                    language_id={bookData.language.id}
                />
            )}
            <Footer />
        </>
    );
}

export default Book;
