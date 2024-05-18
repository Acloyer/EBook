import React, { useState } from "react";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Cookies from 'js-cookie';
import config from "../../config";

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
    // registration response
    const [responseStatus, setResponseStatus] = useState(null);
    const [errorDetail, setErrorDetail] = useState("");
    const [tokens, setTokens] = useState(null);

    // login response
    const [loginResponseStatus, setLoginResponseStatus] = useState(null);
    const [loginErrorDetail, setLoginErrorDetail] = useState("");
    const [loginTokens, setLoginTokens] = useState(null);

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
        console.log(responseStatus);
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${config.backApi}/users/login`, formData);
            setLoginResponseStatus(response.status);
            if (response.status === 200) {
                window.location.href = home;
                setLoginTokens(response.data);
                Cookies.set('accessToken', response.data.token);
                Cookies.set('refreshToken', response.data.refreshToken);
            }
        } catch (error) {
            if (error.response.status === 400 && error.response.data.detail) {
                setLoginErrorDetail(error.response.data.detail);
            } else {
                setLoginErrorDetail("An unexpected error occurred.");
            }
            setLoginResponseStatus(error.response.status);
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

            <div className="response">
            {responseStatus === 200 ? (
                <p>Registration was successful. Check your email for mail verification</p>
            ) : responseStatus === 500 ? (
                <p style={{color: "red"}}>Error 500: {errorDetail}</p>
            ) : responseStatus === 400 ? (
                <p style={{color: "red"}}>Error 400: {errorDetail}</p>
            ) : (
                <p></p>
            )}
            {loginResponseStatus === 200 ? (
                <p>Login was successful.</p>
            ) : loginResponseStatus === 500 ? (
                <p style={{color: "red"}}>Error 500: {loginErrorDetail}</p>
            ) : loginResponseStatus === 400 ? (
                <p style={{color: "red"}}>Error 400: {loginErrorDetail}</p>
            ) : (
                <p></p>
            )}
            </div>

            <Footer />
        </>
    );
}

export default Authentication;
