import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";

function Navbar() {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        axios.get(`${config.backApi}/genres`)
            .then(response => {
                setGenres(response.data);
            })
            .catch(error => {
                console.error("Error fetching genres:", error);
            });
    }, []);
    return (
        <>
            <div className="animate__animated animate__zoomInDown">
                <div className="header-top">
                    <div className="container">

                        <a href="#" className="logo">
                            <img src="icon.png" width="80" alt="EBook home" />
                        </a>

                        <div className="input-wrapper">
                            <input type="search" name="search" placeholder="Search" className="input-field" />

                            <button className="btn btn-primary">Search</button>
                        </div>
                    </div>
                </div>

                <div className="header-bottom" data-navbar>
                    <div className="container">

                        <nav className="navbar">

                            <div className="navbar-top">
                                <input type="search" name="search" placeholder="Search our store" className="input-field" />

                                <button className="search-btn" aria-label="Search">
                                    <ion-icon name="search-outline" aria-hidden="true"></ion-icon>
                                </button>
                            </div>

                            <ul className="navbar-list">

                                <li>
                                    <Link className="navbar-link" to='/Home'>
                                        <a>Home</a>
                                    </Link>
                                </li>

                                <li>
                                    <a href="#" className="navbar-link">Shop</a>
                                </li>

                                <li>
                                    <Link className="navbar-link" to='/Favorite'>
                                        <a>Favorites</a>
                                    </Link>
                                </li>

                                <li>
                                    <a href="#" className="navbar-link">Genres</a>
                                    <ul className="dropdown-menu animate__animated animate__bounceIn">
                                        {genres.map(genre => (
                                            <a href="#" className="navbar-link">{genre.name}</a>
                                        ))}
                                    </ul>
                                </li>

                                <li>
                                    <a href="#" className="navbar-link">About Us</a>
                                </li>

                                <li>
                                    <a href="#" className="navbar-link">Contact</a>
                                </li>

                            </ul>

                            <ul className="navbar-list">
                                <li>
                                    <span class="material-symbols-outlined">
                                        <Link className="navbar-auth" to='/Authentication'>
                                            <a>person_add</a>
                                        </Link>
                                    </span>
                                </li>
                            </ul>

                        </nav>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar;