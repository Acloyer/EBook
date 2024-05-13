import Card from "../card/Card";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import config from "../../config";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function Shop() {
    const location = useLocation();
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState("");
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const searchTerm = new URLSearchParams(location.search).get("search");
                setSearch(searchTerm);

                let url = `${config.backApi}/books?PageSize=5`;

                const genreId = new URLSearchParams(location.search).get("GenreId");
                if (genreId) {
                    url += `&GenreId=${genreId}`;
                }

                if (searchTerm) {
                    url += `&Title=${searchTerm}`;
                }
                console.log('url:' + url)
                const response = await axios.get(url);
                setBooks(response.data.items);
                setTotalCount(response.data.totalCount);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };

        fetchBooks();
    }, [location.search]);

    return (
        <>
            <Navbar />
            <hr className="container animate__animated animate__zoomInDown"/>
            <div className="col-md-3 container" style={{padding: "0px 0px 0px 20px"}}>
                {search && search !== "" && <p>Поиск по: {search}...</p>}
                {totalCount !== undefined && totalCount !== 0 ? (
                    <p>Всего найдено книг: {totalCount}</p>
                ) : (
                    <p>Книги не найдены</p>
                )}
            </div>
            <div className="container animate__animated animate__zoomInDown">
                <div className="row">
                    {books.map((book, index) => (
                        <div className="col-md-3" key={index}>
                            <Card
                                imageSrc={book.posterUrl}
                                category={book.category}
                                title={book.title}
                                description={book.description}
                                price={book.price}
                                id={book.id}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Shop;
