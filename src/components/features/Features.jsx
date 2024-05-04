import React from "react";

function Features() {
    return (
        <>
            <section className="section feature animate__animated animate__zoomInUp" aria-label="feature">
                <div className="container">

                    <div className="grid-list">

                        <li>
                            <div className="feature-card">

                                <div className="card-icon">
                                    <img src="feature-1.png" width="100" height="100" loading="lazy" alt="feature icon" className="w-100" />
                                </div>

                                <div>
                                    <h3 className="h3 card-title">Free Shipping</h3>

                                    <p className="card-text">Order over $100</p>
                                </div>

                            </div>
                        </li>

                        <li>
                            <div className="feature-card">

                                <div className="card-icon">
                                    <img src="feature-2.png" width="100" height="100" loading="lazy" alt="feature icon" className="w-100" />
                                </div>

                                <div>
                                    <h3 className="h3 card-title">Secure Payment</h3>

                                    <p className="card-text">100% Secure Payment</p>
                                </div>

                            </div>
                        </li>

                        <li>
                            <div className="feature-card">

                                <div className="card-icon">
                                    <img src="feature-3.png" width="100" height="100" loading="lazy" alt="feature icon" className="w-100" />
                                </div>

                                <div>
                                    <h3 className="h3 card-title">Best Price</h3>
                                    <p className="card-text">Guaranteed Low Cost</p>
                                </div>
                            </div>
                        </li>

                        <li>
                            <div className="feature-card">

                                <div className="card-icon">
                                    <img src="feature-4.png" width="100" height="100" loading="lazy" alt="feature icon" className="w-100" />
                                </div>

                                <div>
                                    <h3 className="h3 card-title">Easy Return</h3>

                                    <p className="card-text">Within 30 Days returns</p>
                                </div>

                            </div>
                        </li>

                    </div>

                </div>
            </section>

        </>
    )
}

export default Features;