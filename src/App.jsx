import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Authentication from './components/authentication_page/Authentication';
import Home from './components/home_page/Home';
import Book from './components/book_show_page/Book';
import Favorite from './components/favorites_page/Favorite';
import Shop from './components/Shop/Shop';
import Contact from './components/contact_page/Contact';
import BookList from './components/book_list_page/BookList';
import BookEditor from './components/books_list_for_admin/BookEditor';
import AddBook from './components/add_book_page/AddBook';
import Profile from './components/Profile/Profile';
import Basket from './components/basket/Basket';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<Home />} />
        <Route path='home' element={<Home />} />
        <Route path='/authentication' element={<Authentication />} />
        <Route path='/bookview' element={<Book />} />
        <Route path='/Favorite' element={<Favorite/>} />
        <Route path='/Shop' element={<Shop/>} />
        <Route path='/Contact' element={<Contact/>} />
        <Route path='/BookList' element={<BookList/>} />
        <Route path='/BookEditor' element={<BookEditor/>} />
        <Route path='/AddBook' element={<AddBook/>} />
        <Route path='/Profile' element={<Profile/>} />
        <Route path='/Basket' element={<Basket/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
