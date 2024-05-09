import React, { useState } from "react";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import config from "../../config";

function GenreAdd() {
    const [name, setName] = useState("");

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const accessToken = getAccessTokenFromCookie();

            if (!accessToken) {
                window.location.href = "/login";
                return;
            }

            const headers = { Authorization: `Bearer ${accessToken}` };

            await axios.post(
                `${config.backApi}/genres`,
                { name },
                { headers: headers }
            );

            window.location.href = "/genre-list";
        } catch (error) {
            console.error("Error adding genre:", error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container animate__animated animate__zoomInUp">
                <h2>Add Genre</h2>
                <form onSubmit={handleFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={name}
                            onChange={handleNameChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Add Genre
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default GenreAdd;

function getAccessTokenFromCookie() {
    const name = 'accessToken=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return "";
}