import React from "react";
import Card from "../card/Card";

function Collection() {
    const cardData = {
        imageSrc: "book-4.png",
        category: "Action",
        title: "Some Book",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, possimus nostrum!",
        price: "12.99"
    };

    return (
        <section className="section featured animate__animated animate__zoomInUp" aria-label="featured collection">
            <div className="container">
                <div className="row">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div className="col-md-3" key={index}>
                            <Card {...cardData} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Collection;
