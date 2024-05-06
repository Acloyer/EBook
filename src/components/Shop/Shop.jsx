import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

function Shop() {
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        PageSize: 5,
        PageNumber: 1,
        MinPrice: "",
        MaxPrice: "",
        Title: "",
        LanguageId: "",
        AuthorId: "",
        GenreId: ""
    });

    useEffect(() => {
        fetchBooks();
    }, [currentPage, filters]); // Обновляем список книг при изменении currentPage или filters

    const fetchBooks = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:6060/api/v1/books`, {
                params: filters
            });
            setBooks(response.data.items);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("Error fetching books:", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value
        });
    };

    const handleSearch = () => {
        const queryString = Object.keys(filters)
            .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(filters[key])}`)
            .join("&");
        window.location.href = `/Shop?${queryString}`;
    };

    return (
        <div>
            <Navbar />
            <div className="shop-container">
                <div className="filters">
                    <h2>Filters</h2>
                    <div>
                        <label htmlFor="pageSize">Page Size:</label>
                        <input type="number" id="pageSize" name="PageSize" value={filters.PageSize} onChange={handleFilterChange} />
                    </div>
                    <div>
                        <label htmlFor="pageNumber">Page Number:</label>
                        <input type="number" id="pageNumber" name="PageNumber" value={filters.PageNumber} onChange={handleFilterChange} />
                    </div>
                    {/* Добавьте остальные фильтры здесь */}
                    <button onClick={handleSearch}>Search</button>
                </div>
                <div className="books">
                    {loading ? (
                        <p>Loading...</p>
                    ) : books.length ? (
                        <>
                            {books.map((book) => (
                                <div key={book.id} className="book-card">
                                    <h2>{book.title}</h2>
                                    <p>Author: {book.author.pseudonym}</p>
                                    <p>Price: {book.price}</p>
                                </div>
                            ))}
                            <div className="pagination">
                                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                                    <button key={page} onClick={() => handlePageChange(page)}>
                                        {page}
                                    </button>
                                ))}
                            </div>
                        </>
                    ) : (
                        <p>No books found.</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Shop;
