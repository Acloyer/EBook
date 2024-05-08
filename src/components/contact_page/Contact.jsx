import React from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

function Contact(){
    return(
        <>
        <Navbar/>
        <div className="qr-code-container animate__animated animate__zoomInDown">
            <div className="qr-code">
                <img src="instagram.png" alt="Instagram" />
                <h1 style={{ textShadow: "1px 1px 1px rgba(0,0,0,0.5)" }}>Instagram</h1>
            </div>
            <div className="qr-code">
                <img src="github.png" alt="GitHub" />
                <h1 style={{ textShadow: "1px 1px 1px rgba(0,0,0,0.5)" }}>GitHub</h1>
            </div>
            <div className="qr-code">
                <img src="step.png" alt="Step"/>
                <h1 style={{ textShadow: "1px 1px 1px rgba(0,0,0,0.5)" }}>Step it</h1>
            </div>
        </div>
        <Footer/>
        </>
    )
}

export default Contact;