import React, { useState } from "react";
import Footer from "../footer/Footer";
import { Link } from "react-router-dom";
import Navbar from "../navbar/Navbar";

function BookList() {
    const [books, setBooks] = useState([
        { id: 1, title: "Book 1", category: "Category 1", price: 10.99 },
        { id: 2, title: "Book 2", category: "Category 2", price: 15.99 },
        { id: 3, title: "Book 3", category: "Category 3", price: 20.99 },
        { id: 4, title: "Book 3", category: "Category 3", price: 20.99 },
        { id: 5, title: "Book 3", category: "Category 3", price: 20.99 },
        { id: 6, title: "Book 3", category: "Category 3", price: 20.99 },
        { id: 7, title: "Book 3", category: "Category 3", price: 20.99 },
        { id: 8, title: "Book 3", category: "Category 3", price: 20.99 },
        { id: 9, title: "Book 3", category: "Category 3", price: 20.99 },
        { id: 10, title: "Book 3", category: "Category 3", price: 20.99 },
    ]);

    const [selectedBook, setSelectedBook] = useState(null);

    const handleEdit = (id) => {
        console.log("Edit book with id:", id);
    };

    const handleDelete = (id) => {
        setBooks(books.filter(book => book.id !== id));
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
                                <th>Book Category</th>
                                <th>Book Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map(book => (
                                <tr key={book.id} className="element-body">
                                    <td>{book.title}</td>
                                    <td>{book.category}</td>
                                    <td>${book.price}</td>
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
                </div>
            </div>
            <Footer />
        </>
    );
}

export default BookList;
