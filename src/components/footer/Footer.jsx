import React from "react";
import { Link } from "react-router-dom";
import IonIcon from '@reacticons/ionicons';

function Footer() {
    return (
        <>
            <div className="footer-main animate__animated animate__zoomInUp">
                <footer className="footer">
                    <div className="waves">
                        <div className="wave" id="wave1"></div>
                        <div className="wave" id="wave2"></div>
                        <div className="wave" id="wave3"></div>
                        <div className="wave" id="wave4"></div>
                    </div>
                    <ul className="social-icon">
                        <li className="social-icon__item"><a className="social-icon__link" href="#">
                            <IonIcon name="logo-facebook"></IonIcon>
                        </a></li>
                        <li className="social-icon__item"><a className="social-icon__link" href="#">
                            <IonIcon name="logo-twitter"></IonIcon>
                        </a></li>
                        <li className="social-icon__item"><a className="social-icon__link" href="#">
                            <IonIcon name="logo-linkedin"></IonIcon>
                        </a></li>
                        <li className="social-icon__item"><a className="social-icon__link" href="#">
                            <IonIcon name="logo-instagram"></IonIcon>
                        </a></li>
                    </ul>

                    <ul className="menu">
                        <Link to="/Home">
                            <li className="menu__item"><a className="menu__link">Home</a></li>
                        </Link>
                        <li className="menu__item"><a className="menu__link" href="#">Shop</a></li>
                        <Link to="/Favorite">
                            <li className="menu__item"><a className="menu__link">Favorites</a></li>
                        </Link>
                        <li className="menu__item"><a className="menu__link" href="#">About Us</a></li>
                        <li className="menu__item"><a className="menu__link" href="#">Contact</a></li>
                        <Link to="/Authentication">
                            <li className="menu__item"><a className="menu__link">Login</a></li>
                        </Link>
                    </ul>
                    <p>&copy;2024 EBOOK | All Rights Reserved</p>
                </footer>
                <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
                <script src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
            </div >
        </>
    )
}

export default Footer;