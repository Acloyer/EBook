// import React, { useState } from "react";
// import { BasketOutline } from 'react-ionicons'

// function Basket() {
//     const books = [
//         { id: 1, cover: "book1.jpg", title: "Book 1", author: "Author 1", price: "$10" },
//         { id: 2, cover: "book2.jpg", title: "Book 2", author: "Author 2", price: "$15" },
//         { id: 3, cover: "book3.jpg", title: "Book 3", author: "Author 3", price: "$20" },
//     ];

//     return (
//         <div className="basket-content">
//             {books.map(book => (
//                 <div key={book.id} className="book-item">
//                     <img src={book.cover} alt={book.title} />
//                     <div className="book-info">
//                         <h3>{book.title}</h3>
//                         <p>{book.author}</p>
//                         <p>{book.price}</p>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default Basket;