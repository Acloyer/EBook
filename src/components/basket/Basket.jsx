import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from 'react-bootstrap';
import Card from '../card/Card';
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import config from "../../config";

function Basket() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const accessToken = getCookie("accessToken");
                const response = await axios.get(`${config.backApi}/carts` {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                setCartItems(response.data.items);
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };

        fetchCartItems();
    }, []);

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
    };

    return (
        <>
            <Navbar/>
            <Container>
                <h1>Shopping Cart</h1>
                <Row>
                    {cartItems.map((item) => (
                        <Col key={item.id} lg={4} md={6} sm={12}>
                            {console.log(item.book)}
                            <Card
                                id={item.book.id}
                                imageSrc={item.book.posterUrl}
                                category={item.book.category}
                                title={item.book.title}
                                description={item.book.description}
                                price={item.book.price}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
            <Footer/>
        </>
    );
}

export default Basket;
