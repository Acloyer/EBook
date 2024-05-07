import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../../config";
import { Airplane, BasketOutline, HandRight } from 'react-ionicons'
import { ChevronDownOutline } from 'react-ionicons'
import { ExitOutline } from 'react-ionicons'
import { OptionsOutline } from 'react-ionicons'

function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleMouseEnter = () => {
        setDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        setDropdownOpen(false);
    };

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
                                {isLoggedIn ? (
                                    <div className="ml-auto" style={{padding: "0px 300px"}}>
                                        <div className="user-info">
                                            <div className="basket">
                                                <a href="/Basket">
                                                    <BasketOutline className="basket-icon"
                                                        href="/Basket"
                                                        height="auto"
                                                        width="30px" />
                                                </a>
                                            </div>
                                            <div className="user-photo">
                                                <img src="user.png" />
                                            </div>
                                            <div className="user-detail">
                                                <h4>{userInfo.firstName} {userInfo.lastName}</h4>
                                                <h5>{userInfo.email}</h5>
                                            </div>
                                            <div
                                                className="dropdown-shape"
                                                onMouseEnter={handleMouseEnter}
                                                onMouseLeave={handleMouseLeave}
                                                >
                                                <ChevronDownOutline className="shape" height="auto" width="25px"/>
                                                {dropdownOpen && (
                                                    <div className="shape-dropdown">
                                                        <ul className="animate__animated animate__bounceIn">
                                                            <li><a className="shape-link" href="/Profile"><OptionsOutline /></a></li>
                                                            <li><a className="shape-link" onClick={logout}><ExitOutline /></a></li>
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <li>
                                        <span className="material-symbols-outlined" style={{padding: "0px 500px"}}>
                                            <Link className="navbar-auth" to='/Authentication'>
                                                <a>person_add</a>
                                            </Link>
                                        </span>
                                    </li>
                                )}
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar;
