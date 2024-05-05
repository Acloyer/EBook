import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

function Genres() {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:6060/api/v1/genres")
            .then(response => {
                setGenres(response.data);
            })
            .catch(error => {
                console.error("Error fetching genres:", error);
            });
    }, []);

    return (
        <>
            <Navbar />
            <div className="genres-container">
                <h2>Genres</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {genres.map(genre => (
                            <tr key={genre.id}>                              
                                <td>{genre.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer />
        </>
    );
}

export default Genres;
