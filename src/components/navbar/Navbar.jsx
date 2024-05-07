import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../../config";

function Navbar() {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        fetchGenres();
    }, []);

    const fetchGenres = async () => {
        try {
            const response = await axios.get(`${config.backApi}/genres`);
            setGenres(response.data);
        } catch (error) {
            console.error("Error fetching genres:", error);
        }
    };

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const checkAuthentication = async () => {
            const accessToken = getCookie("accessToken");
            const refreshToken = getCookie("refreshToken");

            if (accessToken && refreshToken) {
                try {
                    const decodedToken = decodeToken(accessToken);

                    if (decodedToken.exp * 1000 > Date.now()) {
                        setIsLoggedIn(true);
                        setUserInfo({
                            firstName: decodedToken.given_name,
                            lastName: decodedToken.family_name,
                            email: decodedToken.email
                        });
                    } else {
                        logout();
                    }
                } catch (error) {
                    console.error("Error decoding token:", error);
                }
            }
        };

        checkAuthentication();
    }, []);

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
    };

    const decodeToken = (token) => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(atob(base64));
    };

    const logout = () => {
        // Очищаем cookies и устанавливаем статус авторизации как false
        document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setIsLoggedIn(false);
        setUserInfo(null);
    };
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
                                    <a href="Shop" className="navbar-link">Shop</a>
                                </li>

                                <li>
                                    <Link className="navbar-link" to='/Favorite'>
                                        <a>Favorites</a>
                                    </Link>
                                </li>

                                <li>
                                    <a href="" className="navbar-link">Genres</a>
                                    <ul className="dropdown-menu animate__animated animate__bounceIn">
                                        {genres.map(genre => (
                                            <li key={genre.id}>
                                                <Link to={`${config.frontendIP}/Shop?GenreId=${genre.id}`} className="navbar-link">{genre.name}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>

                                <li>
                                    <Link className="navbar-link" to='/Contact'>
                                        <a>Contact</a>
                                    </Link>
                                </li>

                                <li>
                                    {isLoggedIn ? (
                                        <li>
                                            <div className="user-info">
                                                <div className="user-photo">
                                                    <img src="user.png" alt="User" />
                                                </div>
                                                <div className="user-detail">
                                                    <h2>{userInfo.firstName} {userInfo.lastName}</h2>
                                                    <h3>{userInfo.email}</h3>
                                                </div>
                                            </div>
                                        </li>
                                    ) : (
                                        <li>
                                            <span className="material-symbols-outlined">
                                                <Link className="navbar-auth" to='/Authentication'>
                                                    <a>person_add</a>
                                                </Link>
                                            </span>
                                        </li>
                                    )}
                                </li>
                            </ul>

                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar;
