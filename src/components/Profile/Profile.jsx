import React, { useEffect, useState } from "react";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import axios from "axios";
import config from "../../config";

function Profile() {
    const [userInfo, setUserInfo] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    //    

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
                        logout();
                    }
                } catch (error) {
                    console.error("Error decoding token:", error);
                }
            }
        };

        checkAuthentication();
    }, []);

    return (
        <>
            <Navbar />
            <section>
                <div className="container animate__animated animate__zoomInDown">
                    <div className="row">
                        <div className="col-lg-12 mb-4 mb-sm-5">
                            <div className="card card-style1 border-0">
                                <div className="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
                                    <div className="row align-items-center">
                                        <div className="col-lg-6 px-xl-10">
                                            <div className="bg-secondary d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded">
                                                <h3 className="h2 text-white mb-0">{userInfo.firstName} {userInfo.lastName}</h3>
                                                <span className="text-primary">{userInfo.status}</span>
                                            </div>
                                            <ul className="list-unstyled mb-1-9">
                                                <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Role:</span> {userInfo.status}</li>
                                                <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Name:</span> {userInfo.firstName}</li>
                                                <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Surname:</span> {userInfo.lastName}</li>
                                                <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Email:</span> {userInfo.email}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Profile;

