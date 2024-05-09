import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";

function BookEditor() {
    return(
        <>
            <Navbar/>
            <div className="container animate__animated animate__zoomInUp">
                <h2>Edit Book</h2>
                <form>
                    
                </form>
            </div>
            <Footer/>
        </>
    )
}

export default BookEditor;
