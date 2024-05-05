import React, { useState } from "react";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Cookies from 'js-cookie'; // Импорт библиотеки js-cookie
import config from "../../config"; // Импорт констант из config.js, апишек и url

function Authentication() {
    const [loginChecked, setLoginChecked] = React.useState(false);
    const home = `${config.frontHome}`;
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        returnUrl: home
    });
    const [responseStatus, setResponseStatus] = useState(null);
    const [errorDetail, setErrorDetail] = useState("");
    const [tokens, setTokens] = useState(null);

    const handleLoginCheckboxChange = () => {
        setLoginChecked(!loginChecked);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${config.backApi}/users/register`, formData);
            setResponseStatus(response.status);
            if (response.status === 200) {
                window.location.href = home;
            }
        } catch (error) {
            if (error.response.status === 400 && error.response.data.detail) {
                setErrorDetail(error.response.data.detail);
            } else {
                setErrorDetail("An unexpected error occurred.");
            }
            setResponseStatus(error.response.status);
        }
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${config.backApi}/users/login`, formData);
            setResponseStatus(response.status);
            if (response.status === 200) {
                window.location.href = home;    
                setTokens(response.data);
                Cookies.set('accessToken', response.data.token);
                Cookies.set('refreshToken', response.data.refreshToken);
            }
        } catch (error) {
            if (error.response.status === 400 && error.response.data.detail) {
                setErrorDetail(error.response.data.detail);
            } else {
                setErrorDetail("An unexpected error occurred.");
            }
            setResponseStatus(error.response.status);
        }
    };

    return (
        <>
            <Navbar />
            <div className="reg animate__animated animate__zoomInDown">
                <div className="main">
                    <input
                        className="form-input"
                        type="checkbox"
                        id="chk"
                        aria-hidden="true"
                        checked={loginChecked}
                        onChange={handleLoginCheckboxChange}
                    />
                    <div className="signup">
                        <form onSubmit={handleRegisterSubmit}>
                            <label className="form-label" htmlFor="chk" aria-hidden="true">
                                Sign up
                            </label>
                            {responseStatus === 400 && <p>Error Detail: {errorDetail}</p>}
                            {responseStatus === 500 && <p>Ошибка c БД</p>}
                            {responseStatus === 200 && <p>Регистрация прошла успешно. Проверьте свою почту для верификации почты</p>}
                            <input
                                className="form-input"
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                required=""
                                onChange={handleChange}
                            ></input>
                            <input
                                className="form-input"
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                required=""
                                onChange={handleChange}
                            ></input>
                            <input
                                className="form-input"
                                type="email"
                                name="email"
                                placeholder="Email"
                                required=""
                                onChange={handleChange}
                            ></input>
                            <input
                                className="form-input"
                                type="password"
                                name="password"
                                placeholder="Password"
                                required=""
                                onChange={handleChange}
                            ></input>
                            <input
                                className="form-input"
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                required=""
                                onChange={handleChange}
                            ></input>
                            <button className="form-button" type="submit">
                                Sign up
                            </button>
                        </form>
                    </div>

                    <div className="login">
                        <form onSubmit={handleLoginSubmit}>
                            <label className="form-label" htmlFor="chk" aria-hidden="true">
                                Login
                            </label>
                            {responseStatus === 400 && <p>Error Detail: {errorDetail}</p>}
                            {responseStatus === 200 && tokens && (
                                <div>
                                    <p>Tokens:</p>
                                    <p>Access Token: {tokens.token}</p>
                                    <p>Refresh Token: {tokens.refreshToken}</p>
                                </div>
                            )}
                            <input
                                className="form-input"
                                type="email"
                                name="email"
                                placeholder="Email"
                                required=""
                                onChange={handleChange}
                            ></input>
                            <input
                                className="form-input"
                                type="password"
                                name="password"
                                placeholder="Password"
                                required=""
                                onChange={handleChange}
                            ></input>
                            <button className="form-button" type="submit">
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Authentication;
