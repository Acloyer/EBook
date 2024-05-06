import React from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

function Contact() {
    return (
        <>
            <Navbar />

            <div className="qr-code-container">
                <div className="qr-code" style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", padding: "20px", textAlign: "center" }}>
                    <img src="instagram.png" alt="Instagram" style={{ width: "400px", height: "400px" }} />
                    <h1 style={{ textShadow: "1px 1px 1px rgba(0,0,0,0.5)" }}>Instagram</h1>
                </div>
                <div className="qr-code" style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", padding: "20px", textAlign: "center" }}>
                    <img src="github.png" alt="GitHub" style={{ width: "400px", height: "400px" }} />
                    <h1 style={{ textShadow: "1px 1px 1px rgba(0,0,0,0.5)" }}>GitHub</h1>
                </div>
                <div className="qr-code" style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", padding: "20px", textAlign: "center" }}>
                    <img src="step.png" alt="Step" style={{ width: "400px", height: "400px" }} />
                    <h1 style={{ textShadow: "1px 1px 1px rgba(0,0,0,0.5)" }}>Step</h1>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Contact;