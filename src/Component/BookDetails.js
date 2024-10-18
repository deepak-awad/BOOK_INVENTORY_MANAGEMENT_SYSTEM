import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Book_Details = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id'); 
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/books/${id}`);
        if (response.status === 200) {
          setBook(response.data);
        } else {
          throw new Error('Book not found'); 
        }
      } catch (error) {
        setError(error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBookDetail();
    }
  }, [id]);

  if (loading) {
    return <p className="text-center">Loading...</p>; 
  }
  
  if (error) {
    return <p className="text-danger text-center">{error}</p>;
  }

  if (!book) {
    return <p className="text-center">No book found with the given ID.</p>; 
  }

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="mb-0"><strong>Book Title:</strong> {book.bookTitle}</h4>
            </div>
            <div className="card-body">
              <p><strong>Author:</strong> {book.bookAuthor}</p>
              <p><strong>Published Date:</strong> {book.publishedDate}</p>
              <p><strong>Publisher:</strong> {book.publisher}</p>
              <p><strong>Overview:</strong> {book.overview}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book_Details;
