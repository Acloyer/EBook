import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HeartOutline, HeartSharp } from 'react-ionicons';
import { CartOutline, CartSharp } from 'react-ionicons';
import axios from "axios";

function Card({ imageSrc, category, title, description, price, id }) {
    const [isHeartHovered, setIsHeartHovered] = useState(false);
    const [isHeartClicked, setIsHeartClicked] = useState(false);
    const [isCartHovered, setIsCartHovered] = useState(false);
    const [isCartClicked, setIsCartClicked] = useState(false);

    useEffect(() => {
        // Check if book is already in wishlist
        const checkWishlist = async () => {
            const accessToken = getCookie("accessToken");
            const refreshToken = getCookie("refreshToken");

            if (accessToken && refreshToken) {
                try {
                    const response = await axios.get(`http://localhost:6060/api/v1/wisher`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    });
                    const bookIds = response.data.map(book => book.id);
                    setIsHeartClicked(bookIds.includes(id));
                } catch (error) {
                    console.error("Error checking wishlist:", error);
                }
            }
        };

        checkWishlist();
    }, [id]);

    useEffect(() => {
        const checkCart = async () => {
            const accessToken = getCookie("accessToken");
            const refreshToken = getCookie("refreshToken");

            if (accessToken && refreshToken) {
                try {
                    const response = await axios.get(`http://localhost:6060/api/v1/carts`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    });
                    const bookIds = response.data.items.map(item => item.book.id);
                    setIsCartClicked(bookIds.includes(id));
                } catch (error) {
                    console.error("Error checking cart:", error);
                }
            }
        };

        checkCart();
    }, [id]);

    const handleHeartMouseEnter = () => {
        setIsHeartHovered(true);
    };

    const handleHeartMouseLeave = () => {
        setIsHeartHovered(false);
    };

    const handleHeartClick = async () => {
        const accessToken = getCookie("accessToken");
        const refreshToken = getCookie("refreshToken");

        if (accessToken && refreshToken) {
            try {
                if (isHeartClicked) {
                    await axios.delete(`http://localhost:6060/api/v1/wisher/${id}`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    });
                } else {
                    await axios.put(`http://localhost:6060/api/v1/wisher/${id}`, null, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    });
                }
                setIsHeartClicked(prevState => !prevState);
            } catch (error) {
                console.error("Error updating wishlist:", error);
            }
        }
    };

    const handleCartMouseEnter = () => {
        setIsCartHovered(true);
    };

    const handleCartMouseLeave = () => {
        setIsCartHovered(false);
    };

    const handleCartClick = async () => {
        const accessToken = getCookie("accessToken");
        const refreshToken = getCookie("refreshToken");

        if (accessToken && refreshToken) {
            try {
                if (isCartClicked) {
                    // Get cartId from API
                    const response = await axios.get(`http://localhost:6060/api/v1/carts`);
                    const cartId = response.data.id;
                    await axios.delete(`http://localhost:6060/api/v1/carts/${cartId}/items/${id}`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    });
                } else {
                    await axios.post(`http://localhost:6060/api/v1/carts/${id}`, null, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    });
                }
                setIsCartClicked(prevState => !prevState);
            } catch (error) {
                console.error("Error updating cart:", error);
            }
        }
    };

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
    };

    return (
        <div className="product-card">
            <div className="product-tumb">
                <Link to={`/BookView?id=${id}`}>
                    <img src={imageSrc} alt={title} />
                </Link>
            </div>
            <div className="product-details">
                <span className="product-catagory">{category}</span>
                <Link className="product-title" to={`/BookView?id=${id}`}>
                    <h4>{title}</h4>
                </Link>
                <p>{description}</p>
                <div className="product-bottom-details">
                    <div className="product-price">${price}</div>
                    <div className="product-icons">
                        {isHeartClicked ? (
                            <HeartSharp
                                className="product-icon"
                                onMouseEnter={handleHeartMouseEnter}
                                onMouseLeave={handleHeartMouseLeave}
                                onClick={handleHeartClick}
                            />
                        ) : (
                            <HeartOutline
                                className="product-icon"
                                onMouseEnter={handleHeartMouseEnter}
                                onMouseLeave={handleHeartMouseLeave}
                                onClick={handleHeartClick}
                            />
                        )}
                        {isCartClicked ? (
                            <CartSharp
                                className="product-icon"
                                onMouseEnter={handleCartMouseEnter}
                                onMouseLeave={handleCartMouseLeave}
                                onClick={handleCartClick}
                            />
                        ) : (
                            <CartOutline
                                className="product-icon"
                                onMouseEnter={handleCartMouseEnter}
                                onMouseLeave={handleCartMouseLeave}
                                onClick={handleCartClick}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
