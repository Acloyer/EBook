import React, { useEffect, useState } from "react";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import axios from "axios";
import config from "../../config";
import { Link } from "react-router-dom";

function Profile() {
    const [userInfo, setUserInfo] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
    };

    const decodeToken = (token) => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        console.log('json parse:' + JSON.parse(atob(base64)))
        return JSON.parse(atob(base64));
    };

    const logout = () => {
        document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setIsLoggedIn(false);
        setUserInfo(null);
    };

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
                    } else {
                        console.log('logout');
                        logout();
                    }
                } catch (error) {
                    console.error("Error decoding token:", error);
                }
            }
        };

        checkAuthentication();
    }, []);

    const handlePasswordChange = () => {
        window.location.href = "/change-password";
    };

    return (
        <>
            <Navbar/>
            <div className="container animate__animated animate__zoomInDown">
                <div className="main-body">
                    <div className="row gutters-sm">
                        {isLoggedIn ? (
                            <>
                                <div className="col-md-4 mb-3">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="d-flex flex-column align-items-center text-center">
                                                <div className="mt-3">
                                                    <h4>{userInfo.firstName} {userInfo.lastName}</h4>
                                                    {userInfo.status === "Admin" ? (
                                                        <p className="text-danger mb-1">{userInfo.status}</p>
                                                    ) : (
                                                        <p className="text-secondary mb-1">{userInfo.status}</p>
                                                    )}
                                                    <hr/>
                                                    <h3>In this page you can edit your profile information.</h3>
                                                    <h4 className="text-secondary">(If you have any questions, please contact with us.)</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h4 className="mb-0" style={{margin: "10px 10px 10px 10px"}}>First Name</h4>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    {userInfo.firstName}
                                                </div>
                                            </div>
                                            <hr/>
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h4 className="mb-0" style={{margin: "10px 10px 10px 10px"}}>Last Name</h4>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    {userInfo.lastName}
                                                </div>
                                            </div>
                                            <hr/>
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h4 className="mb-0" style={{margin: "10px 10px 10px 10px"}}>Email</h4>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    {userInfo.email}
                                                </div>
                                            </div>
                                            <hr/>
                                            <div className="row">
                                                <div className="col-sm-12">
                                                <Link className="navbak" to='/change-password' style={{margin: "0px 0px 0px 10px"}}>
                                                    <p>Change Password</p>
                                                </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Profile;
