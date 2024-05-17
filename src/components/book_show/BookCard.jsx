import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../card/Card";
import { Link } from "react-router-dom";
import config from "../../config";

function BookCard({ imageSrc, category, title, description, price, author, pagesNum, copiesNum, soldCopies, language, genre_id, author_id, language_id }) {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await axios.get(`${config.backApi}/books?PageSize=4&PageNumber=1&GenreId=${genre_id}`);
            setBooks(response.data.items);
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };
    return (
        <>
            <div className="container">
                <div className="book-section animate__animated animate__zoomInUp">
                    <img src={imageSrc} alt="Book Cover" />
                    <div className="book-info text-center">
                        <h1>{title}</h1>
                        <p>
                            Genre: <Link to={`${config.frontendIP}/shop?genreId=${category}`}>{category}</Link>
                        </p>
                        <p>
                            Author: <Link to={`${config.frontendIP}/shop?authorId=${author}`}>{author}</Link>
                        </p>
                        <p>
                            Language: <Link to={`${config.frontendIP}/shop?languageId=${language}`}>{language}</Link>
                        </p>
                        <p>Number of Pages: {pagesNum}</p>
                        <p>Price: {price}</p>
                        <p>Number of Copies: {copiesNum}</p>
                        <p>Number of Copies Sold: {soldCopies}</p>
                        <h2>"{description}"</h2>
                        <button className="buy-button">get book</button>
                    </div>
                </div>
                <br></br>
                <hr className="animate__animated animate__zoomInUp"></hr>
                <h1 className="animate__animated animate__zoomInUp">Similar books: </h1>
            </div>
            <div className="animate__animated animate__zoomInUp book" style={{paddingBlock: "1px 0px"}}>
                <section className="section featured animate__animated animate__zoomInUp" aria-label="featured collection">
                    <div className="container">
                        <div className="row">
                            {books.map(book => (
                                <div className="col-md-3" key={book.id}>
                                    <Card
                                        imageSrc={book.posterUrl}
                                        category={book.genre.name}
                                        title={book.title}
                                        description=""
                                        price={book.price}
                                        id={book.id}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default BookCard;
