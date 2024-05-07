import React, { useState } from "react";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";

function BookEditor() {
    const [book, setBook] = useState({
        image: null,
        title: "Book Title",
        category: "Category",
        price: 0,
        author: "Author",
        sold: 0,
        copies: 0
    });

    const [fileError, setFileError] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'image/png') {
            setFileError(null);
            const reader = new FileReader();
            reader.onloadend = () => {
                setBook({ ...book, image: reader.result });
            };
            reader.readAsDataURL(file);
        } else {
            setFileError('Please choose a PNG image file.');
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setBook({ ...book, [name]: value });
    };

    return(
        <>
            <Navbar/>
            <div className="container animate__animated animate__zoomInUp">
                <h2>Edit Book</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="image">Choose Image (PNG only):</label>
                        <input type="file" className="form-control-file" id="image" accept=".png" onChange={handleImageChange} />
                        {fileError && <p className="text-danger">{fileError}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input type="text" className="form-control" id="title" name="title" value={book.title} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Category:</label>
                        <input type="text" className="form-control" id="category" name="category" value={book.category} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price:</label>
                        <input type="number" className="form-control" id="price" name="price" value={book.price} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="author">Author:</label>
                        <input type="text" className="form-control" id="author" name="author" value={book.author} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="sold">Sold Copies:</label>
                        <input type="number" className="form-control" id="sold" name="sold" value={book.sold} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="copies">Total Copies:</label>
                        <input type="number" className="form-control" id="copies" name="copies" value={book.copies} onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Save Changes</button>
                </form>
            </div>
            <Footer/>
        </>
    )
}

export default BookEditor;
