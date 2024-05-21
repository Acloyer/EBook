import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../../config";
import { Airplane, BasketOutline, HandRight } from 'react-ionicons'
import { ChevronDownOutline } from 'react-ionicons'
import { ExitOutline } from 'react-ionicons'
import { OptionsOutline } from 'react-ionicons'
import { HeartOutline } from 'react-ionicons'
import { Dropdown, DropdownToggle, DropdownItem } from "bootstrap-react";

function Navbar() {
    // get cookie etc
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
    //
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

    // логика получения "сколько предметов в корзине"

    const [totalItemsCart, setTotalItemsCart] = useState(0);
    const fetchTotalItemsCart = async () => {
        try{
            const accessToken = getCookie("accessToken");
            const response = await axios.get(`${config.backApi}/carts/book-quantity`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            setTotalItemsCart(response.data);

        } catch (error) {
            console.error("Error fetching items in the cart: ", error);
        }
    }
    fetchTotalItemsCart();
    
    //
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
                            email: decodedToken.email,
                            status: decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
                        });
                        // status out
                        console.log(userInfo.status)
                        //
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


    // search
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = () => {
        if (searchValue.trim() !== '') {
            const encodedSearchValue = encodeURIComponent(searchValue);
            window.location.href = `/shop?search=${encodedSearchValue}`;
        }
    };
    //

    return (
        <>
            <div className="animate__animated animate__zoomInDown">
                <div className="header-top">
                    <div className="container">

                        <a href="/home" className="logo">
                            <img src="icon.png" width="80" alt="EBook home" />
                        </a>

                        <div className="input-wrapper">
                            <input
                                type="search"
                                name="search"
                                placeholder="Search"
                                className="input-field"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                            <button className="btn btn-primary" onClick={handleSearch}>Search</button>
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
                                    <Link className="navbar-link" to='/home'>
                                        <p>Home</p>
                                    </Link>
                                </li>
                                <li>
                                    <Link className="navbar-link" to='/shop'>
                                        <p>Shop</p>
                                    </Link>
                                </li>
                                
                                <li>
                                    <a href="#" className="navbar-link">Genres</a>
                                    <ul className="dropdown-menu animate__animated animate__bounceIn">
                                        {genres.map(genre => (
                                            <li key={genre.id}>
                                                <Link to={`${config.frontendIP}/Shop?GenreId=${genre.id}`} className="navbar-link">{genre.name}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                                {isLoggedIn && userInfo.status !== "User" && (
                                    <li>
                                        <a href="#" className="navbar-link">Admin</a>
                                        <ul className="dropdown-menu animate__animated animate__bounceIn">
                                            <li>
                                                <Link to={`${config.frontendIP}/book-list`} className="navbar-link">Books</Link>
                                            </li>
                                            <li>
                                                <Link to={`${config.frontendIP}/genre-list`} className="navbar-link">Genres</Link>
                                            </li>
                                        </ul>
                                    </li>
                                )}
                                <li>    
                                    <Link className="navbar-link" to='/contact'>
                                        <p>Contact</p>
                                    </Link>
                                </li>
                                {isLoggedIn ? (
                                    <div className="ml-auto" style={{padding: "0px 300px"}}>
                                        <div className="user-info">
                                            <div className="user-icons">
                                                <div className="basket">
                                                    <div className="item-counter">
                                                        <p>{totalItemsCart}</p>
                                                    </div>
                                                    <Link className="navbar-link" to='/basket'>
                                                        <BasketOutline
                                                            color={'#00000'}
                                                            className="basket-icon"
                                                            height="auto"
                                                            width="30px" />
                                                    </Link>
                                                </div>
                                                <div className="favorites">
                                                    <Link className="navbar-link" to='/favorite'>
                                                        <HeartOutline
                                                            color={'#00000'}
                                                            height="auto"
                                                            width="25px"
                                                        />
                                                    </Link>
                                                </div>
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
                                                <ChevronDownOutline 
                                                    className="shape"
                                                    height="auto"
                                                    width="25px"/>
                                                {dropdownOpen && (
                                                    <div className="shape-dropdown">
                                                        <ul className="animate__animated animate__bounceIn">
                                                            <li>
                                                                <a className="navbar-link shape-link" href="/Profile">
                                                                    <OptionsOutline 
                                                                        color={'#00000'}/>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a className="navbar-link shape-link" href="#" onClick={logout}>
                                                                    <ExitOutline 
                                                                        color={'#00000'}/>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <li>
                                        <div className="nav-icons" style={{padding: "0px 400px"}}>
                                            <div className="favorites">
                                                <Link className="navbar-link" to='/'>
                                                    <HeartOutline
                                                        color={'#00000'}
                                                        height="auto"
                                                        width="25px"
                                                    />
                                                </Link>
                                            </div>
                                            <span className="material-symbols-outlined">
                                                <Link className="navbar-auth" to='/Authentication'>
                                                    <a>person_add</a>
                                                </Link>
                                            </span>
                                        </div>
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
