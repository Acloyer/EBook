import React from "react";

function BookCard({ imageSrc, category, title, description, price, author, pagesNum, copiesNum, soldCopies, language }) {
    return (
        <div className="container">
            <div className="book-section animate__animated animate__zoomInUp">
                <div className="book-cover">
                    <img src={imageSrc} alt="Book Cover" />
                </div>
                <div className="book-info text-center">
                    <h1>"{title}"</h1>
                    <p>Genre: {category}</p>
                    <p>Author: {author}</p>
                    <p>Number of Pages: {pagesNum}</p>
                    <p>Price: {price}</p>
                    <p>Number of Copies: {copiesNum}</p>
                    <p>Number of Copies Sold: {soldCopies}</p>
                    <p>Language: {language}</p>
                    <h2>"{description}"</h2>
                    <button className="buy-button">get book</button>
                </div>
            </div>
        </div>
    );
}

export default BookCard;
