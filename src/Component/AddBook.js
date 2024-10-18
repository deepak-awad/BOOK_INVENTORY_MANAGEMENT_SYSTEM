import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
  const [bookTitle, setBookTitle] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [publisher, setPublisher] = useState('');
  const [overview, setOverview] = useState('');

  const navigate = useNavigate(); 


  const isValidString = (value) => /^[A-Za-z\s]+$/.test(value);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'bookTitle') {
      if (!isValidString(value)) {
        alert('Book Title must contain only letters and spaces.');
        return; 
      }
      setBookTitle(value);
    } else if (name === 'bookAuthor') {
      if (!isValidString(value)) {
        alert('Book Author must contain only letters and spaces.');
        return; 
      }
      setBookAuthor(value);
    } else if (name === 'publisher') {
      if (!isValidString(value)) {
        alert('Publisher must contain only letters and spaces.');
        return; 
      }
      setPublisher(value);
    } else if (name === 'publishedDate') {
      setPublishedDate(value);
    } else if (name === 'overview') {
      setOverview(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    try {
      const response = await axios.post('http://localhost:5000/books', {
        bookTitle,
        bookAuthor,
        publishedDate,
        publisher,
        overview,
      });

      console.log('Book added:', response.data);
      alert('Book added successfully!');
      navigate('../'); 
    } catch (error) {
      console.error('Error adding book:', error);
      alert('There was an error adding the book. Please try again.'); 
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-12 col-md-11 col-lg-8 col-xl-7 col-xxl-6">
          <div className="bg-white p-4 p-md-5 rounded shadow-sm">
            <form onSubmit={handleSubmit}>
              <div className="row gy-3 gy-md-4 overflow-hidden">
                <div className="col-12">
                  <label htmlFor="bookTitle" className="form-label">
                    Book Title <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="bookTitle"
                    id="bookTitle"
                    value={bookTitle}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="bookAuthor" className="form-label">
                    Book Author <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="bookAuthor"
                    id="bookAuthor"
                    value={bookAuthor}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="publishedDate" className="form-label">
                    Published Date <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name="publishedDate"
                    id="publishedDate"
                    value={publishedDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="publisher" className="form-label">
                    Published By <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="publisher"
                    id="publisher"
                    value={publisher}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="overview" className="form-label">
                    Overview
                  </label>
                  <textarea
                    className="form-control"
                    name="overview"
                    id="overview"
                    rows="3"
                    value={overview}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="col-12">
                  <div className="d-grid">
                    <button className="btn btn-md btn-primary" type="submit">
                      Add Book
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
