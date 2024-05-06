import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Card from "../card/Card";
import { Row, Col } from "react-bootstrap";

function Shop() {
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        PageSize: 3,
    });

    useEffect(() => {
        if (Object.values(filters).some(value => value !== "")) {
            fetchBooks();
        } else {
            setBooks([]);
            setTotalPages(0);
        }
    }, [currentPage, filters]);
    
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
        const url = `/Shop`;
        window.location.href = url;
    };

    return (
        <div>
            <Navbar />
            <div className="shop-container">
                <Row>
                    <Col md={3} className="leftside">
                        <div className="filters">
                            <h2>Filters</h2>
                            <div>
                                <label htmlFor="pageSize">Page Size:</label>
                                <input type="number" id="pageSize" name="PageSize" value={filters.PageSize} onChange={handleFilterChange} />
                            </div>
                            <div>
                                <label htmlFor="minPrice">Min price:</label>
                                <input type="number" id="minPrice" name="MinPrice" value={filters.MinPrice} onChange={handleFilterChange} />
                            </div>
                            <div>
                                <label htmlFor="maxPrice">Max price:</label>
                                <input type="number" id="maxPrice" name="MaxPrice" value={filters.MaxPrice} onChange={handleFilterChange} />
                            </div>
                            <button onClick={handleSearch}>Search</button>
                        </div>
                    </Col>
                    <Col md={9} className="rightside">
                        <section>
                            <div className="container">
                                <div className="row">
                                    {loading ? (
                                        <p>Loading...</p>
                                    ) : books.length ? (
                                        <>
                                            {books.map((book) => (
                                                <Col md={4} key={book.id}>
                                                    <Card
                                                        imageSrc={book.posterUrl}
                                                        category={book.genre.name}
                                                        title={book.title}
                                                        description={book.description}
                                                        price={book.price}
                                                        id={book.id}
                                                    />
                                                </Col>
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
                        </section>
                    </Col>
                </Row>
            </div>
            <Footer />
        </div>
    );
}

export default Shop;
