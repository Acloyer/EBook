import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { Link } from "react-router-dom";

function BookList() {
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize, setPageSize] = useState(5); // Default page size
    const [totalCount, setTotalCount] = useState(0);
    const [hasPrevious, setHasPrevious] = useState(false);
    const [hasNext, setHasNext] = useState(false);

    useEffect(() => {
        fetchBooks();
    }, [currentPage, pageSize]); // Trigger fetchBooks when currentPage or pageSize changes

    const fetchBooks = async () => {
        try {
            const response = await axios.get(`http://localhost:6060/api/v1/books?PageSize=${pageSize}&PageNumber=${currentPage}`);
            setBooks(response.data.items);
            setCurrentPage(response.data.currentPage);
            setTotalPages(response.data.totalPages);
            setTotalCount(response.data.totalCount);
            setHasPrevious(response.data.hasPrevious);
            setHasNext(response.data.hasNext);
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    const handleEdit = (id) => {
        console.log("Edit book with id:", id);
    };

    const handleDelete = (id) => {
        // Implement delete functionality if needed
    };

    const handleNextPage = () => {
        if (hasNext) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (hasPrevious) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            <Navbar />
            <div className="content-wrapper animate__animated animate__zoomInUp">
                <div className="container">
                    <div className="list-header">
                        <h2>Book List</h2>
                        <Link to='/AddBook'>
                            <button className="btn btn-success mb-3 book-button">Add New Book</button>
                        </Link>
                    </div>
                    <table className="table table-striped book-table">
                        <thead className="thead-dark">
                            <tr>
                                <th>Book Title</th>
                                <th>Page Count</th>
                                <th>Price</th>
                                <th>Language</th>
                                <th>Quantity</th>
                                <th>Sold Units</th>
                                <th>Genre</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map(book => (
                                <tr key={book.id} className="element-body">
                                    <td>{book.title}</td>
                                    <td>{book.pageCount}</td>
                                    <td>${book.price}</td>
                                    <td>{book.language.name}</td>
                                    <td>{book.quantity}</td>
                                    <td>{book.soldUnits}</td>
                                    <td>{book.genre.name}</td>
                                    <td className="book-buttons">
                                        <Link to='/BookEditor'>
                                            <button className="btn btn-primary mr-2 book-button" onClick={() => handleEdit(book.id)}>Edit</button>
                                        </Link>
                                        <button className="btn btn-danger book-button" onClick={() => handleDelete(book.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <nav>
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
            </div>
            <Footer />
        </>
    );
}

export default BookList;
