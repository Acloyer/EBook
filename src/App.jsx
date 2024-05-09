import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import GenreList from './components/genre_list/GenreList';
import GenreAdd from './components/genre_add/GenreAdd';
import GenreEdit from './components/genre-edit/GenreEdit';
import NotFound from './components/not_found_page/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path='home' element={<Home />} />
        <Route path='/' element={<Home />} />
        <Route path='/authentication' element={<Authentication />} />
        <Route path='/book-view' element={<Book />} />
        <Route path='/favorite' element={<Favorite/>} />
        <Route path='/shop' element={<Shop/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/book-list' element={<BookList/>} />
        <Route path='/book-edit' element={<BookEditor/>} />
        <Route path='/add-book' element={<AddBook/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/basket' element={<Basket/>} />
        <Route path='/genre-add' element={<GenreAdd/>} />
        <Route path='/genre-edit' element={<GenreEdit/>} />
        <Route path='/genre-list' element={<GenreList/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
