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

                    <div className="card">
                        <DataTable value={books} showGridlines={true} tableStyle={{ minWidth: '50rem' }}>
                            <Column field="title" header="Title" sortable style={{ width: '10%', height: '50px' }} />
                            <Column field="author.pseudonym" header="Author" sortable style={{ width: '10%' }} />
                            <Column field="genre.name" header="Genre" sortable style={{ width: '10%' }} />
                            <Column field="language.name" header="Language" sortable style={{ width: '10%' }} />
                            <Column field="pageCount" header="Page Count" sortable style={{ width: '10%' }} />
                            <Column field="price" header="Price" sortable style={{ width: '10%' }} />
                            <Column field="quantity" header="Quantity" sortable style={{ width: '10%' }} />
                            <Column field="soldUnits" header="Sold Units" sortable style={{ width: '10%' }} />

                            <Column header="Actions" body={(rowData) => {
                                return (
                                    <div className="book-buttons">
                                        <ButtonGroup >
                                            <Button className="btn btn-outline-primary btn-sm">
                                                <Link to={`/book-edit?id=${rowData.id}`}>
                                                    <FaPencilAlt />
                                                </Link>
                                            </Button>
                                            <Button className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteBook(rowData.id)}>
                                                <FaTrash />
                                            </Button>
                                        </ButtonGroup>
                                    </div>
                                );
                            }} />
                        </DataTable>
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
            </div>
            <Footer />
        </>
    );
}

export default BookList;
