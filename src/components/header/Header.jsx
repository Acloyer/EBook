import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import Features from "../features/Features";
import Collection from "../collections/Collection";
import LoginedUserNav from "../logined_user_navbar/LoginedUserNav";

function Header() {
    return (
        <>
            <Navbar/>
            <section className="section hero has-bg-image">
                <div className="container">
                    <div className="animate__animated animate__zoomInLeft">
                        <div className="hero-content">

                            <h1 className="h1 hero-title has-after">
                                EBOOK
                            </h1>

                            <p className="hero-text">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit quibusdam cum vitae fugit laborum, ipsam accusantium eaque ab, neque voluptatibus magni facere deleniti dolor porro corrupti eius maiores quod beatae.
                            </p>

                            <div className="btn-wrapper">

                                <a href="#" className="btn">
                                    <span className="span">STORE</span>
                                </a>
                            </div>
                        </div>
                    </div>


                    <div className="animate__animated animate__zoomInRight">
                        <figure className="hero-banner">
                            <img src="head.png" width="475" height="600" alt="hero banner" className="w-100" />
                        </figure>
                    </div>
                </div>
            </section>
            <Features />
            <Collection />
        </>
    );
}

export default Header;