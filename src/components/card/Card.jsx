import React from "react";
import { Link } from "react-router-dom";

function Card({ imageSrc, category, title, description, price, id }) {
    return (
        <div className="product-card">
            <div className="product-tumb">
                <Link to={`/BookView?id=${id}`}>
                    <img src={imageSrc} alt={title} />
                </Link>
            </div>
            <div className="product-details">
                <span className="product-catagory">{category}</span>
                <Link to={`/BookView?id=${id}`}>
                    <h4>{title}</h4>
                </Link>
                <p>{description}</p>
                <div className="product-bottom-details">
                    <div className="product-price">${price}</div>
                    <div className="product-links">
                        <a href=""><i className="fa fa-heart"></i></a>
                        <a href=""><i className="fa fa-shopping-cart"></i></a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;



// import React from "react";

// function Card({ product }) {
//     const { description } = product;
//     const words = description.split(' ');
//     let limitedText = words.slice(0, 15).join(' ');

//     if (words.length > 15) {
//         limitedText += '...';
//     }

//     return (
//         <>
//             <div className="product-card">
//                 <div className="badge">Hot</div>
//                 <div className="product-tumb">
//                     <img src="https://i.imgur.com/xdbHo4E.png" />
//                 </div>
//                 <div className="product-details">
//                     <span className="product-catagory">Women,bag</span>
//                     <h4><a href="">Women leather bag</a></h4>
//                     <p>{limitedText}</p>
//                     <div className="product-bottom-details">
//                         <div className="product-price"><small>$96.00</small>$230.99</div>
//                         <div className="product-links">
//                             <a href=""><i className="fa fa-heart"></i></a>
//                             <a href=""><i className="fa fa-shopping-cart"></i></a>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Card;

// Этот код надо будет использовать уже когда мы возьмем описание с дб. Тут стоит ограничение description на 15 слов 