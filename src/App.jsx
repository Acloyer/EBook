import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Authentication from './components/authentication_page/Authentication';
import Home from './components/home_page/Home';
import Book from './components/book_show_page/Book';
import Favorite from './components/favorites_page/Favorite';
import LoginedUserNav from './components/logined_user_navbar/LoginedUserNav';
import Genres from './components/genres/Genres';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<Home />} />
        <Route path='home' element={<Home />} />
        <Route path='/authentication' element={<Authentication />} />
        <Route path='/bookview' element={<Book />} />
        <Route path='/Favorite' element={<Favorite/>} />
        <Route path='/a' element={<Navbar/>} />
        <Route path='/aa' element={<LoginedUserNav/>} />
        <Route path='/genres' element={<Genres/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
