import React, { useEffect, useState } from 'react';
import './BookList.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/books');
      setBooks(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const deleteBook = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        const response = await axios.delete(`http://localhost:5000/books/${id}`);
        if (response.status === 200) {
          alert("Book Deleted Successfully");
          setBooks((prevBooks) => prevBooks.filter(book => book.id !== id));
        } else {
          throw new Error('Failed to delete the book');
        }
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const viewBook = (id) => {
    navigate(`/books/detail?id=${id}`);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setCurrentBook(null);
  };

  const handleModalShow = (book) => {
    setCurrentBook(book);
    setModalVisible(true);
  };

  const handleUpdateBook = async (e) => {
    e.preventDefault();
    if (currentBook) {
      const updatedBook = {
        ...currentBook,
        bookTitle: e.target.elements.bookTitle.value,
        bookAuthor: e.target.elements.bookAuthor.value,
        publishedDate: e.target.elements.publishedDate.value,
        publisher: e.target.elements.publisher.value,
        overview: e.target.elements.overview.value,
      };

      try {
        const response = await axios.put(`http://localhost:5000/books/${currentBook.id}`, updatedBook);
        if (response.status === 200) {
          setBooks((prevBooks) => prevBooks.map(book => (book.id === currentBook.id ? updatedBook : book)));
          alert("Book updated successfully!");
          handleModalClose();
        }
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const handleAddBook = () => {
    navigate('/add'); 
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Book Details</h4>
              <button 
                type="button" 
                className="btn btn-info" 
                onClick={handleAddBook}
              >
                <i className="fa fa-plus" aria-hidden="true"></i> Add Book
              </button>
            </div>
            <div className="card-body">
              {loading && <p className="text-center">Loading...</p>}
              <div className="table-responsive" id="proTeamScroll" tabIndex="2">
                <table className="table table-striped text-center">
                  <thead>
                    <tr>
                      <th>Cust.</th>
                      <th>Book Title</th>
                      <th>Book Author</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {error && (
                      <tr>
                        <td colSpan="4" className="text-danger text-center">{error}</td>
                      </tr>
                    )}
                    {books.length === 0 && !error && (
                      <tr>
                        <td colSpan="4" className="text-center">No books available</td>
                      </tr>
                    )}
                    {books.map((book, index) => (
                      <tr key={book.bookId}>
                        <td>{index + 1}</td>
                        <td>{book.bookTitle}</td>
                        <td>{book.bookAuthor}</td>
                        <td>
                          <button className="btn btn-sm btn-success rounded" onClick={() => viewBook(book.id)}>
                            <i className="fa fa-eye" aria-hidden="true"></i>
                          </button>&nbsp;
                          <button className="btn btn-sm btn-primary rounded" onClick={() => handleModalShow(book)}>
                            <i className="fas fa-edit"></i>
                          </button>&nbsp;
                          <button className="btn btn-sm btn-danger rounded-custom" onClick={() => deleteBook(book.id)}>
                            <i className="fa fa-trash" aria-hidden="true"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`modal fade ${modalVisible ? 'show' : ''}`} style={{ display: modalVisible ? 'block' : 'none' }} tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden={!modalVisible}>
    <div className="modal-dialog modal-lg">
        <div className="modal-content">
            <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">{currentBook ? "Update Details" : "Add New Book"}</h5>
               
            </div>
            <div className="modal-body">
                <form onSubmit={handleUpdateBook}>
                    <div className="form-group">
                        <label htmlFor="bookTitle">Book Title</label>
                        <input type="text" className="form-control" id="bookTitle" name="bookTitle" defaultValue={currentBook?.bookTitle} placeholder="Enter book title" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="bookAuthor">Author</label>
                        <input type="text" className="form-control" id="bookAuthor" name="bookAuthor" defaultValue={currentBook?.bookAuthor} placeholder="Enter author name" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="bookPublishedDate">Published Date</label>
                        <input type="date" className="form-control" id="bookPublishedDate" name="publishedDate" defaultValue={currentBook?.publishedDate.split('T')[0]} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="bookPublisher">Publisher</label>
                        <input type="text" className="form-control" id="bookPublisher" name="publisher" defaultValue={currentBook?.publisher} placeholder="Enter publisher name" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="bookOverview">Overview</label>
                        <textarea className="form-control" rows="5" id="bookOverview" name="overview" defaultValue={currentBook?.overview} style={{ height: '150px' }} placeholder="Enter overview" required></textarea>
                    </div>
                    <div className="modal-footer">
                    <button type="submit" className="btn btn-success">Update</button>
                        <button type="button" className="btn btn-secondary" onClick={handleModalClose}>Close</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

    </div>
  );
};

export default BookList;
