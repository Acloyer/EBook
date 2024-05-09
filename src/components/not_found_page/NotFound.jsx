import React, { useEffect } from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { gsap, Linear } from "gsap";

function NotFound() {
    useEffect(() => {
        let t1 = gsap.timeline();
        let t2 = gsap.timeline();
        let t3 = gsap.timeline();

        t1.to(".cog1",
            {
                transformOrigin: "50% 50%",
                rotation: "+=360",
                repeat: -1,
                ease: Linear.easeNone,
                duration: 8
            });

        t2.to(".cog2",
            {
                transformOrigin: "50% 50%",
                rotation: "-=360",
                repeat: -1,
                ease: Linear.easeNone,
                duration: 8
            });

        t3.fromTo(".wrong-para",
            {
                opacity: 0
            },
            {
                opacity: 1,
                duration: 1,
                stagger: {
                    repeat: -1,
                    yoyo: true
                }
            });
    }, []); // пустой массив зависимостей означает, что этот эффект будет запущен только один раз после монтирования компонента

    return (
        <>
            <Navbar />
            <div className="container-for-404 animate__animated animate__zoomInDown">
                <h1 className="first-four">4</h1>
                <div className="cog-wheel1">
                    <div className="cog1">
                        <div className="top"></div>
                        <div className="down"></div>
                        <div className="left-top"></div>
                        <div className="left-down"></div>
                        <div className="right-top"></div>
                        <div className="right-down"></div>
                        <div className="left"></div>
                        <div className="right"></div>
                    </div>
                </div>

                <div className="cog-wheel2">
                    <div className="cog2">
                        <div className="top"></div>
                        <div className="down"></div>
                        <div className="left-top"></div>
                        <div className="left-down"></div>
                        <div className="right-top"></div>
                        <div className="right-down"></div>
                        <div className="left"></div>
                        <div className="right"></div>
                    </div>
                </div>
                <h1 className="second-four">4</h1>
                <p className="wrong-para">Uh Oh! Page not found!</p>
            </div>
            <Footer />
        </>
    )
}

export default NotFound;