import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import { Button, ButtonGroup } from "bootstrap-react";
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { Resizable } from 'react-resizable';
import { CgMathPlus } from "react-icons/cg";
import config from "../../config";

function GenreList() {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await axios.get(`${config.backApi}/genres`);
                setGenres(response.data);
            } catch (error) {
                console.error("Error fetching genres:", error);
            }
        };

        fetchGenres();
    }, []);

    const handleDeleteGenre = async (id) => {
        try {
            const accessToken = getAccessTokenFromCookie();
            const headers = { Authorization: `Bearer ${accessToken}` }; 
            await axios.delete(`${config.backApi}/genres/${id}`, { headers }); 
            alert("Genre deleted successfully!");
            const response = await axios.get(`${config.backApi}/genres`);
            setGenres(response.data);
        } catch (error) {
            console.error("Error deleting genre:", error);
            alert("Failed to delete genre.");
        }
    };

    return (
        <>
            <Navbar />
            <div className="container animate__animated animate__zoomInUp">
                <div className="list-header">
                    <h2>Genres</h2>
                    <Link to='/genre-add'>
                        <button className="btn btn-success mb-3 book-button">
                            <CgMathPlus />
                        </button>
                    </Link>
                </div>
                <br/>
                <table className="table" style={{ width: `${10000}px` }}>
                    <thead>
                        <tr>
                            <th style={{ fontSize: "20px" }}>Name</th>
                            <th style={{ fontSize: "20px" }}></th>
                        </tr>
                    </thead>
                    <tbody>
                    {genres.map(genre => (
                        <tr key={genre.id}>
                            <td style={{ fontSize: "18px" }}>{genre.name}</td>
                            <td style={{ textAlign: "right", fontSize: "18px" }}>
                                <ButtonGroup>
                                    <Button className="btn btn-outline-primary">
                                        <Link to={`/genre-edit?id=${genre.id}`}>
                                            <FaPencilAlt />
                                        </Link>
                                    </Button>
                                    <Button className="btn btn-outline-danger" onClick={() => handleDeleteGenre(genre.id)}>
                                        <FaTrash />
                                    </Button>
                                </ButtonGroup>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <Footer />
        </>
    );
}

export default GenreList;

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
