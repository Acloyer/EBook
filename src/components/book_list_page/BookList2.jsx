import axios from "axios";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';  
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/saga-orange/theme.css';
import './flags.css';
import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import config from "../../config";

function BookList() {
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize, setPageSize] = useState(5); // Default page size
    const [totalCount, setTotalCount] = useState(0);
    const [hasPrevious, setHasPrevious] = useState(false);
    const [hasNext, setHasNext] = useState(false);

    const fetchBooks = async () => {
        try {
            // const response = await axios.get(`${config.backApi}/books?PageSize=${pageSize}&PageNumber=${currentPage}`); // пагинация самодельная
            const response = await axios.get(`${config.backApi}/books?PageSize=${1000}`);
            setBooks(response.data.items);
            setTotalPages(response.data.totalPages);
            setPageSize(response.data.pageSize);
            setTotalCount(response.data.totalCount);
            setHasPrevious(response.data.hasPrevious);
            setHasNext(response.data.hasNext);

        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    useEffect(() => {
        const getBooks = async () => {
            await fetchBooks();
            console.log(books)
        }
        getBooks();
    }, [currentPage, pageSize]);

    const handleNextPage = () => {
        if (hasNext) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (hasPrevious) {
            setCurrentPage(currentPage - 1);
        }
    };


    let emptyBook = {
        id: null,
        title: '',
        author: '',
        genre: '',
        language: '',
        page_count: 0,
        price: 0,
        quantity: 0,
        sold_units: 0
    };

    const [bookDialog, setBookDialog] = useState(false);
    const [deleteBookDialog, setDeleteBookDialog] = useState(false);
    const [deleteBooksDialog, setDeleteBooksDialog] = useState(false);
    const [book, setBook] = useState(emptyBook);
    const [selectedBooks, setSelectedBooks] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const openNew = () => {
        setBook(emptyBook);
        setSubmitted(false);
        setBookDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setBookDialog(false);
    };

    const hideDeleteBookDialog = () => {
        setDeleteBookDialog(false);
    };

    const hideDeleteBooksDialog = () => {
        setDeleteBooksDialog(false);
    };

    const saveBook = () => {
        setSubmitted(true);

        if (book.name.trim()) {
            let _books = [...books];
            let _book = { ...book };

            if (book.id) {
                const index = findIndexById(book.id);

                _books[index] = _book;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Book Updated', life: 3000 });
            } else {
                _book.id = createId();
                _book.image = 'book-placeholder.svg';
                _books.push(_book);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Book Created', life: 3000 });
            }

            setBooks(_books);
            setBookDialog(false);
            setBook(emptyBook);
        }
    };

    const editBook = (book) => {
        setBook({ ...book });
        setBookDialog(true);
    };

    const confirmDeleteBook = (book) => {
        setBook(book);
        setDeleteBookDialog(true);
    };

    const deleteBook = () => {
        let _books = books.filter((val) => val.id !== book.id);

        setBooks(_books);
        setDeleteBookDialog(false);
        setBook(emptyBook);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Book Deleted', life: 3000 });
    };

    const findIndexById = (id) => {
        let index = -1;

        for (let i = 0; i < books.length; i++) {
            if (books[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return id;
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteBooksDialog(true);
    };

    const deleteSelectedBooks = () => {
        let _books = books.filter((val) => !selectedBooks.includes(val));

        setBooks(_books);
        setDeleteBooksDialog(false);
        setSelectedBooks(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Books Deleted', life: 3000 });
    };

    const onCategoryChange = (e) => {
        let _book = { ...book };

        _book['category'] = e.value;
        setBook(_book);
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _book = { ...book };

        _book[`${name}`] = val;

        setBook(_book);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _book = { ...book };

        _book[`${name}`] = val;

        setBook(_book);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="Add" icon="pi pi-plus" severity="success" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedBooks || !selectedBooks.length} />
            </div>
        );
    };

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editBook(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteBook(rowData)} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage Books</h4>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </IconField>
        </div>
    );
    const bookDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveBook} />
        </React.Fragment>
    );
    const deleteBookDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteBookDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteBook} />
        </React.Fragment>
    );
    const deleteBooksDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteBooksDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedBooks} />
        </React.Fragment>
    );
    //
    return (
        <div>
            <Navbar/>
            <div className="flex flex-column md:flex-row justify-content-between my-5">
                <Button type="button" label="Button 1" className="mb-3 md:mb-0"></Button>
                <Button type="button" label="Button 2" className="p-button-secondary mb-3 md:mb-0"></Button>
                <Button type="button" label="Button 3" className="p-button-help"></Button>
            </div>
            <Toast ref={toast} />
            <div className="card">
                {/* <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar> с export */}
                <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
                <DataTable 
                        ref={dt} value={books} selection={selectedBooks} onSelectionChange={(e) => setSelectedBooks(e.value)}
                        dataKey="id" paginator rows={55} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} books" globalFilter={globalFilter} header={header}>
                    <Column selectionMode="multiple" exportable={false}/>
                    <Column field="title" header="Title" sortable style={{ minWidth: '12rem' }}/>
                    <Column field="author.pseudonym" header="Author" sortable style={{ minWidth: '16rem' }}/>
                    <Column field="genre.name" header="Genre" sortable style={{ minWidth: '16rem' }}/>
                    <Column field="language.name" header="Language" sortable style={{ minWidth: '16rem' }}/>
                    <Column field="pageCount" header="Page Count" sortable style={{ width: '10%' }} />
                    <Column field="price" header="Price" body={priceBodyTemplate} sortable style={{ minWidth: '8rem' }}/>
                    <Column field="quantity" header="Quantity" sortable style={{ minWidth: '10rem' }}/>
                    <Column field="soldUnits" header="SoldUnits" sortable style={{ minWidth: '10rem' }}/>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}/>
                </DataTable>
                
            </div>

            <Dialog visible={bookDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Book Details" modal className="p-fluid" footer={bookDialogFooter} onHide={hideDialog}>
                {book.image && <img src={`https://primefaces.org/cdn/primereact/images/book/${book.image}`} alt={book.image} className="book-image block m-auto pb-3" />}
                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Name
                    </label>
                    <InputText id="name" value={book.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({'p-invalid': submitted && !book.name})} />
                    {submitted && !book.name && <small className="p-error">Name is required.</small>}
                </div>

                <div className="field">
                    <label htmlFor="description" className="font-bold">
                        Description
                    </label>
                    <InputTextarea id="description" value={book.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
                </div>

                <div className="field">
                    <label className="mb-3 font-bold">Category</label>
                    <div className="formgrid grid">
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category1" name="category" value="Accessories" onChange={onCategoryChange} checked={book.category === 'Accessories'} />
                            <label htmlFor="category1">Accessories</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category2" name="category" value="Clothing" onChange={onCategoryChange} checked={book.category === 'Clothing'} />
                            <label htmlFor="category2">Clothing</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category3" name="category" value="Electronics" onChange={onCategoryChange} checked={book.category === 'Electronics'} />
                            <label htmlFor="category3">Electronics</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category4" name="category" value="Fitness" onChange={onCategoryChange} checked={book.category === 'Fitness'} />
                            <label htmlFor="category4">Fitness</label>
                        </div>
                    </div>
                </div>

                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="price" className="font-bold">
                            Price
                        </label>
                        <InputNumber id="price" value={book.price} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" />
                    </div>
                    <div className="field col">
                        <label htmlFor="quantity" className="font-bold">
                            Quantity
                        </label>
                        <InputNumber id="quantity" value={book.quantity} onValueChange={(e) => onInputNumberChange(e, 'quantity')} />
                    </div>
                </div>
            </Dialog>

            <Dialog visible={deleteBookDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteBookDialogFooter} onHide={hideDeleteBookDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {book && (
                        <span>
                            Are you sure you want to delete <b>{book.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteBooksDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteBooksDialogFooter} onHide={hideDeleteBooksDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {book && <span>Are you sure you want to delete the selected books?</span>}
                </div>
            </Dialog>
            <Footer/>
        </div>
    );
}

export default BookList;
