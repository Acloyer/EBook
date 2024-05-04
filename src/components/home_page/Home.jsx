import React, { useEffect } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";

function Home() {
    return (
        <>
            <Header />
            <Footer/>
        </>
    );
}

export default Home;


// GET METHOD
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const TableComponent = () => {
//   const [languages, setLanguages] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:6060/api/v1/languages')
//       .then(response => {
//         setLanguages(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching languages:', error);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>Languages Table</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Code</th>
//           </tr>
//         </thead>
//         <tbody>
//           {languages.map(language => (
//             <tr key={language.id}>
//               <td>{language.id}</td>
//               <td>{language.name}</td>
//               <td>{language.code}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TableComponent;
