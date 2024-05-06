import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../card/Card";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

function Favorite() {
    const [favoriteBooks, setFavoriteBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const accessToken = getCookie("accessToken");
        const refreshToken = getCookie("refreshToken");

        if (accessToken && refreshToken) {
            fetchFavoriteBooks(accessToken);
        } else {
            console.error("Access token or refresh token not found in cookies");
            setLoading(false);
        }
    }, []);

    const fetchFavoriteBooks = async (accessToken) => {
        try {
            const response = await axios.get("http://localhost:6060/api/v1/wisher", {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setFavoriteBooks(response.data.items);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching favorite books:", error);
            setLoading(false);
        }
    };

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
    };

    return (
        <>
            <Navbar />
            <section className="section featured animate__animated animate__zoomInUp" aria-label="featured collection">
                <div className="container">
                    <div className="row" style={{margin: "10px", display: "flex", width: "100%", flexDirection: "row", justifyContent: "center"}}>
                        {loading ? (
                            <p>Loading...</p>
                        ) : favoriteBooks.length ? (
                            favoriteBooks.map((book, index) => (
                                <div className="col-md-3" key={index}>
                                    {console.log(book)}
                                    <Card
                                        imageSrc={book.book.posterUrl}
                                        category={book.book.category}
                                        title={book.book.title}
                                        description={book.book.description}
                                        price={book.book.price}
                                    />
                                </div>
                            ))
                        ) : (
                            <h1>No favorite books found.</h1>
                        )}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Favorite;
