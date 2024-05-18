import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import config from "../../config";

function GenreEdit() {
    const location = useLocation();
    const [genre, setGenre] = useState({ name: "" });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const genreId = new URLSearchParams(location.search).get("id");

    useEffect(() => {
        const fetchGenre = async () => {
            try {
                const response = await axios.get(`${config.backApi}/genres/${genreId}`);
                setGenre(response.data);
                setLoading(false);
            } catch (error) {
                setError("Error fetching genre data");
                setLoading(false);
            }
        };

        fetchGenre();
    }, [genreId]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setGenre((prevGenre) => ({
            ...prevGenre,
            [name]: value
        }));
    };

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const accessToken = getCookie("accessToken");
            console.log(genre);
            await axios.put(`${config.backApi}/genres/${genreId}`, genre, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            window.location.href = "/genre-list";
        } catch (error) {
            // window.location.href = "/genre-list";
            setError("Error updating genre data");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <Navbar />
            <div className="container animate__animated animate__zoomInUp">
                <h2>Genre Edit</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={genre.name}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Save Changes
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default GenreEdit;
