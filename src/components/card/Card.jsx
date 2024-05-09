import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HeartOutline, HeartSharp } from 'react-ionicons'
import { CartOutline, CartSharp } from 'react-ionicons'
import axios from "axios";
import config from "../../config";

function Card({ imageSrc, category, title, description, price, id }) {

    const [isHeartHovered, setIsHeartHovered] = useState(false);
    const [isHeartClicked, setIsHeartClicked] = useState(false);
    const [isCartHovered, setIsCartHovered] = useState(false);
    const [isCartClicked, setIsCartClicked] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const accessToken = getCookie("accessToken");
            const refreshToken = getCookie("refreshToken");

            if (accessToken && refreshToken) {
                try {
                    const cartResponse = await axios.get(`${config.backApi}/carts`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    });
                    const wishlistResponse = await axios.get(`${config.backApi}/wisher`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    });

                    const cartBookIds = cartResponse.data.items.map(item => item.book.id);
                    const wishlistBookIds = wishlistResponse.data.items.map(item => item.book.id);

                    const isInCart = cartBookIds.includes(id);

                    const isInWishlist = wishlistBookIds.includes(id);
                    
                    setIsCartClicked(isInCart);

                    setIsHeartClicked(isInWishlist);
                    
                    console.log("isInCart: " + isInCart)
                    console.log("isInWishlist: " + isInWishlist)
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
        };

        fetchData();
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
            setIsHeartClicked(prevState => !prevState);
            try {
                if (isHeartClicked) {
                    console.log(`deleting heart : ${id}`)
                    await axios.delete(`${config.backApi}/wisher/${id}`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    });
                } else {
                    console.log(`putting heart : ${id}`)
                    await axios.put(`${config.backApi}/wisher/${id}`, null, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    });
                }
            } catch (error) {
                setIsHeartClicked(prevState => !prevState);
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
                    const cartResponse = await axios.get(`${config.backApi}/carts`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    });
                    const cartId = cartResponse.data.items.find(item => item.book.id === id)?.id;
                    console.log(cartId);
                    console.log(`deleting cart : ${id}`);
                    await axios.delete(`${config.backApi}/carts/items/${cartId}`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    });
                    setIsCartClicked(false);
                } else {
                    console.log(`posting cart: ${id}`);
                    await axios.post(`${config.backApi}/carts/${id}`, null, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    });
                    setIsCartClicked(true);
                }
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
            <div className="product-tumb" onClick={() => window.location.href = `${config.frontendIP}/book-view?id=${id}`}>
                <img src={imageSrc} alt={title} />
            </div>
            <div className="product-details">
                <span className="product-catagory">{category}</span>
                <h4><Link to={`/book-view?id=${id}`}>{title}</Link></h4>
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
