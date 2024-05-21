import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { Link } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Button, ButtonGroup } from "bootstrap-react";
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { Resizable } from 'react-resizable';
import { CgMathPlus } from "react-icons/cg";
import config from "../../config";

function BookList() {
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [totalCount, setTotalCount] = useState(0);
    const [hasPrevious, setHasPrevious] = useState(false);
    const [hasNext, setHasNext] = useState(false);

    const fetchBooks = async () => {
        try {
            const response = await axios.get(`${config.backApi}/books?PageSize=${pageSize}&PageNumber=${currentPage}`);
            setBooks(response.data.items);
            setTotalCount(response.data.totalCount);
            setTotalPages(response.data.totalPages);
            setPageSize(response.data.pageSize);
            setHasPrevious(response.data.hasPrevious);
            setHasNext(response.data.hasNext);

        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    useEffect(() => {
        const getBooks = async () => {
            await fetchBooks();
            console.log(books)
        }
        getBooks();
    }, [currentPage, pageSize]);

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

    const handleDeleteBook = async (id) => {
        try {
            await axios.delete(`${config.backApi}/books/${id}`);
            alert("Book deleted successfully!");
            await fetchBooks();
        } catch (error) {
            console.error("Error deleting book:", error);
            alert("Failed to delete book.");
        }
    };

    return (
        <>
            <Navbar />
            <div className="content-wrapper animate__animated animate__zoomInUp">
                <div className="container">
                    <div className="list-header">
                        <h2>Books</h2>
                        <Link to='/add-book'>
                            <button className="btn btn-success mb-3 book-button">
                                <CgMathPlus />
                            </button>
                        </Link>
                    </div>

                    <table className="table" style={{ width: `${10000}px` }}>
                        <thead>
                            <tr>
                                <th style={{ fontSize: "20px" }}>Title</th>
                                <th style={{ fontSize: "20px" }}>Author</th>
                                <th style={{ fontSize: "20px" }}>Genre</th>
                                <th style={{ fontSize: "20px" }}>Language</th>
                                <th style={{ fontSize: "20px" }}>Page Count</th>
                                <th style={{ fontSize: "20px" }}>Price</th>
                                <th style={{ fontSize: "20px" }}>Quantity</th>
                                <th style={{ fontSize: "20px" }}>Sold Units</th>
                                <th style={{ fontSize: "20px" }}></th>
                            </tr>
                        </thead>
                        <tbody>
                        {books.map(book => (
                            <tr key={book.id}>
                                <td style={{ fontSize: "18px" }}>{book.title}</td>
                                <td style={{ fontSize: "18px" }}>{book.author.pseudonym}</td>
                                <td style={{ fontSize: "18px" }}>{book.genre.name}</td>
                                <td style={{ fontSize: "18px" }}>{book.language.name}</td>
                                <td style={{ fontSize: "18px" }}>{book.pageCount}</td>
                                <td style={{ fontSize: "18px" }}>{book.price}</td>
                                <td style={{ fontSize: "18px" }}>{book.quantity}</td>
                                <td style={{ fontSize: "18px" }}>{book.soldUnits}</td>
                                <td style={{ textAlign: "right", fontSize: "18px" }}>
                                    <ButtonGroup>
                                        <Button className="btn btn-outline-primary">
                                            <Link to={`/book-edit?id=${book.id}`}>
                                                <FaPencilAlt />
                                            </Link>
                                        </Button>
                                        <Button className="btn btn-outline-danger" onClick={() => handleDeleteBook(book.id)}>
                                            <FaTrash />
                                        </Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
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
            </div>
            <Footer />
        </>
    );
}

export default BookList;
