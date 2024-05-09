import React, { useState } from "react";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";

function AddBook() {
    return (
        <>
            <Navbar/>
            <div className="container animate__animated animate__zoomInUp">
                <h2>Add New Book</h2>
                <form>
                    
                </form>
            </div>
            <Footer />
        </>
    );
}

export default AddBook;
