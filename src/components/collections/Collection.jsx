import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../card/Card";

function Collection() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await axios.get("http://localhost:6060/api/v1/books?PageSize=8&PageNumber=1");
            setBooks(response.data.items);
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    return (
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
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Collection;
