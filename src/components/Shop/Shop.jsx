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
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [hasPrevious, setHasPrevious] = useState(false);
    const [hasNext, setHasNext] = useState(false);
    
    // фильтры
    const [search, setSearch] = useState("");
    const [genreId, setGenreId] = useState("");
    const [authorId, setAuthorId] = useState("");
    const [languageId, setLanguageId] = useState("");
    //

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                let url = `${config.backApi}/books?PageSize=8&PageNumber=${currentPage}`;

                const searchTerm = new URLSearchParams(location.search).get("search");
                setSearch(searchTerm);
                
                
                const genreId_temp = new URLSearchParams(location.search).get("genreId");
                const authorId_temp = new URLSearchParams(location.search).get("authorId");
                const languageId_temp = new URLSearchParams(location.search).get("languageId");
                setGenreId(genreId_temp);
                setAuthorId(authorId_temp);
                setLanguageId(languageId_temp);
                
                if (genreId) {
                    console.log('gernre id : ' + genreId)
                    url += `&GenreId=${genreId}`;
                }
                if (authorId) {
                    url += `&AuthorId=${authorId}`;
                }
                if (languageId) {
                    url += `&LanguageId=${languageId}`;
                }
                if (searchTerm) {
                    url += `&Title=${searchTerm}`;
                }

                // console.log('response Url To GET from Back/Books: ' + url);
                const response = await axios.get(url);
                
                setBooks(response.data.items);
                setTotalPages(response.data.totalPages);
                setHasPrevious(response.data.hasPrevious);
                setHasNext(response.data.hasNext);
                setTotalCount(response.data.totalCount);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };
        
        fetchBooks();
    }, [currentPage, authorId, languageId, search, genreId]);

    const handlePreviousPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    return (
        <>
            <Navbar />
            <hr className="container animate__animated animate__zoomInDown" />
            <div className="col-md-3 container animate__animated animate__zoomInDown" style={{ padding: "0px 0px 0px 20px" }}>
                {search && search !== "" && <p>Поиск по: {search}...</p>}
                {totalCount !== undefined && totalCount !== 0 ? (
                    <p>Total books found: {totalCount}</p>
                ) : (
                    <p>No books found</p>
                )}
            </div>
            <div className="container animate__animated animate__zoomInDown">
                <div className="row">
                    {console.log(books)}
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
                <nav className="d-flex justify-content-center">
                    <ul className="pagination">
                        <li className={`page-item ${!hasPrevious && 'disabled'}`}>
                            <button className="page-link" onClick={handlePreviousPage}>Previous</button>
                        </li>
                        <li className="page-item disabled">
                            <span className="page-link">{currentPage} of {totalPages}</span>
                        </li>
                        <li className={`page-item ${!hasNext && 'disabled'}`}>
                            <button className="page-link" onClick={handleNextPage}>Next</button>
                        </li>
                    </ul>
                </nav>
            </div>
            <Footer />
        </>
    );
}

export default Shop;
