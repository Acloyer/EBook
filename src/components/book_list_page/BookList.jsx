import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { Link } from "react-router-dom";
import { Button } from 'primereact/button';
import { FaRegTrashAlt } from "react-icons/fa";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";

function BookList() {
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize, setPageSize] = useState(5); // Default page size
    const [totalCount, setTotalCount] = useState(0);
    const [hasPrevious, setHasPrevious] = useState(false);
    const [hasNext, setHasNext] = useState(false);

    const fetchBooks = async () => {
        try {
            const response = await axios.get(`http://localhost:6060/api/v1/books?PageSize=${pageSize}&PageNumber=${currentPage}`);
            setBooks(response.data.items);
            setTotalPages(response.data.totalPages);
            setPageSize(response.data.pageSize);
            setTotalCount(response.data.totalCount);
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
    }, [currentPage, pageSize]); // Trigger fetchBooks when currentPage, pageSize changes, or on page load

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


    // price DataTable
    //
    return (
        <>
            <Navbar />
            <div className="content-wrapper animate__animated animate__zoomInUp">
                <div className="container">
                    <div className="list-header">
                        <h2>Book List</h2>
                        <Link to='/add-book'>
                            <button className="btn btn-success mb-3 book-button">Add New Book</button>
                        </Link>
                    </div>

                    <div className="card">
                        <DataTable value={books} showGridlines={true} tableStyle={{ minWidth: '50rem' }}>
                            <Column field="title" header="Title" sortable  style={{ width: '10%', height: '50px' }}/>
                            <Column field="author.pseudonym" header="Author" sortable  style={{ width: '10%' }}/>
                            <Column field="genre.name" header="Genre" sortable style={{ width: '10%' }} />
                            <Column field="language.name" header="Language" sortable  style={{ width: '10%' }}/>
                            <Column field="pageCount" header="Page Count" sortable style={{ width: '10%' }} />
                            <Column field="price" header="Price" sortable style={{ width: '10%' }} />
                            <Column field="quantity" header="Quantity" sortable  style={{ width: '10%' }}/>
                            <Column field="soldUnits" header="Sold Units" sortable  style={{ width: '10%' }}/>

                            <Column style={{ width: '10%' }} header="ㅤㅤㅤActions" body={(rowData) => {
                                return (
                                    <div className="book-buttons">
                                        <Link to={'/book-editor?' + rowData.id}>
                                            <Button className="btn btn-primary mr-2 book-button"/>
                                        </Link>
                                        <Link to={''}>
                                            {/* <Button icon={<FaRegTrashAlt/>} className="btn btn-danger" style={{ width: '35px', height: '35px'}}  /> */}
                                            <Button className="btn btn-danger mr-2 book-button" style={{ width: '25px', height: '25px'}} ><InputIcon className="pi pi-trash"> </InputIcon></Button>
                                            {/* <IconField>
                                                <InputIcon className="pi pi-trash"> </InputIcon>
                                                <Button className="btn btn-danger" style={{ width: '35px', height: '35px'}} />
                                            </IconField> */}
                                            {/* icon={<FaRegTrashAlt/>}  */}
                                        </Link>
                                    </div>
                                );
                            }} />
                        </DataTable>
                    </div>

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
