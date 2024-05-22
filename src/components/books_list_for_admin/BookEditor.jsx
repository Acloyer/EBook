import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import config from "../../config";

function BookEditor() {
    const [book, setBook] = useState({ name: "" });
    const [languages, setLanguages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const bookId = new URLSearchParams(location.search).get("id");

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`${config.backApi}/books/${bookId}`);
                setBook(response.data);
                fetchImage(response.data.posterUrl);
                setLoading(false);
            } catch (error) {
                setError("Error fetching book data");
                setLoading(false);
            }
        };

        const fetchLanguages = async () => {
            try {
                const response = await axios.get("http://localhost:6060/api/v1/languages");
                setLanguages(response.data);
            } catch (error) {
                setError("Error fetching languages data");
            }
        };

        fetchBook();
        fetchLanguages();
    }, [bookId]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setBook((prevBook) => ({
            ...prevBook,
            [name]: value
        }));
    };

    const handleLanguageChange = (event) => {
        const selectedLanguageId = event.target.value;
        setBook((prevBook) => ({
            ...prevBook,
            languageId: selectedLanguageId
        }));
    };

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const accessToken = getCookie("accessToken");
            await axios.put(`${config.backApi}/books/${bookId}`, book, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            window.location.href = "/book-list";
        } catch (error) {
            setError("Error updating book data");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <Navbar />
            <div className="container animate__animated animate__zoomInUp">
                <h2>Book Edit</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            value={book.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            name="description"
                            value={book.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pageCount">Page Count</label>
                        <input
                            type="text"
                            className="form-control"
                            id="pageCount"
                            name="pageCount"
                            value={book.pageCount}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input
                            type="text"
                            className="form-control"
                            id="price"
                            name="price"
                            value={book.price}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="language">Language</label>
                        <select
                            className="form-control"
                            id="language"
                            name="languageId"
                            value={book.languageId || ''}
                            onChange={handleLanguageChange}
                            style={{height: "50px"}}
                        >
                            <option value="" disabled>Select a language</option>
                            {languages.map((language) => (
                                <option key={language.id} value={language.id}>
                                    {language.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="quantity">Quantity</label>
                        <input
                            type="text"
                            className="form-control"
                            id="quantity"
                            name="quantity"
                            value={book.quantity}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="poster">Poster</label>
                        {/* сделать выбор картинки */}
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Save Changes
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default BookEditor;
