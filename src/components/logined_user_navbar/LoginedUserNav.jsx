import React, { useEffect, useState } from "react";
import axios from "axios";

function LoginedUserNav({ user }) {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:6060/api/v1/genres")
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
                        <nav className="user-logined-navbar">
                            <div className="navbar-top">
                                <input type="search" name="search" placeholder="Search our store" className="input-field" />
                                <button className="search-btn" aria-label="Search">
                                    <ion-icon name="search-outline" aria-hidden="true"></ion-icon>
                                </button>
                            </div>
                            <ul className="navbar-list">
                                <li>
                                    <a href="#" className="navbar-link">Home</a>
                                </li>
                                <li>
                                    <a href="#" className="navbar-link">Shop</a>
                                </li>
                                <li>
                                    <a href="#" className="navbar-link">Favorites</a>
                                </li>
                                <li>
                                    <a href="#" className="navbar-link">Genres</a>
                                    <ul className="dropdown-menu animate__animated animate__bounceIn">
                                        <li>{genres.map(genre => (
                                                // <tr key={genre.id}>
                                                    <a href="#" className="navbar-link">{genre.name}</a>
                                                    // <td>{genre.name}</td>
                                                // </tr>
                                            ))}
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#" className="navbar-link">About Us</a>
                                </li>
                                <li>
                                    <a href="#" className="navbar-link">Contact</a>
                                </li>
                            </ul>
                            <div className="user-info">
                                <div className="user-photo">
                                    <img src="user.png" />
                                </div>
                                <div className="user-detail">
                                    <h2>UserName LastName</h2>
                                    <h3>gmail</h3>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginedUserNav;
