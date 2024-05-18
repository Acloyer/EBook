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
<<<<<<< Updated upstream
=======

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

    // carts length
    const [cartsLength, setCartsLength] = useState(0);
    //
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

        const getCarts = async () => {
            const accessToken = getCookie("accessToken");
            const cartResponse = await axios.get(`${config.backApi}/carts`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            try{
                setCartsLength(cartResponse.data.items.length);
            } catch(error) {
                console.error("Error puting carts length: ", error)
            }
        }
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

    //
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = () => {
        if (searchValue.trim() !== '') {
            const encodedSearchValue = encodeURIComponent(searchValue);
            window.location.href = `/shop?search=${encodedSearchValue}`;
        }
    };
    //
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
                                            <a href="#" className="navbar-link">{genre.name}</a>
=======
                                            <li key={genre.id}>
                                                <Link to={`${config.frontendIP}/Shop?genreId=${genre.id}`} className="navbar-link">{genre.name}</Link>
                                            </li>
>>>>>>> Stashed changes
                                        ))}
                                    </ul>
                                </li>

                                <li>
                                    <a href="#" className="navbar-link">About Us</a>
                                </li>
<<<<<<< Updated upstream

                                <li>
                                    <a href="#" className="navbar-link">Contact</a>
                                </li>

=======
                                {isLoggedIn ? (
                                    <div className="ml-auto" style={{padding: "0px 300px"}}>
                                        <div className="user-info">
                                            <div className="user-icons">
                                                <div className="basket">
                                                    <div className="item-counter">
                                                        <p>{cartsLength}</p>
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
>>>>>>> Stashed changes
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