import React from "react";
import { Link } from "react-router-dom";
import IonIcon from '@reacticons/ionicons';

function Footer() {
    return (
        <>
            <div className="footer-main animate__animated animate__zoomInUp">
                <footer class="footer">
                    <div class="waves">
                        <div class="wave" id="wave1"></div>
                        <div class="wave" id="wave2"></div>
                        <div class="wave" id="wave3"></div>
                        <div class="wave" id="wave4"></div>
                    </div>
                    <ul class="social-icon">
                        <li class="social-icon__item"><a class="social-icon__link" href="#">
                            <IonIcon name="logo-facebook"></IonIcon>
                        </a></li>
                        <li class="social-icon__item"><a class="social-icon__link" href="#">
                            <IonIcon name="logo-twitter"></IonIcon>
                        </a></li>
                        <li class="social-icon__item"><a class="social-icon__link" href="#">
                            <IonIcon name="logo-linkedin"></IonIcon>
                        </a></li>
                        <li class="social-icon__item"><a class="social-icon__link" href="#">
                            <IonIcon name="logo-instagram"></IonIcon>
                        </a></li>
                    </ul>

                    <ul class="menu">
                        <Link to="/Home">
                            <li class="menu__item"><a class="menu__link">Home</a></li>
                        </Link>
                        <li class="menu__item"><a class="menu__link" href="#">Shop</a></li>
                        <Link to="/Favorite">
                            <li class="menu__item"><a class="menu__link">Favorites</a></li>
                        </Link>
                        <li class="menu__item"><a class="menu__link" href="#">About Us</a></li>
                        <li class="menu__item"><a class="menu__link" href="#">Contact</a></li>
                        <Link to="/Authentication">
                            <li class="menu__item"><a class="menu__link">Login</a></li>
                        </Link>
                    </ul>
                    <p>&copy;2024 EBOOK | All Rights Reserved</p>
                </footer>
                <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
                <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
            </div >
        </>
    )
}

export default Footer;