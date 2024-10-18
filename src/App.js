import {Routes, Route} from 'react-router-dom'
import AddBook from './Component/AddBook';
import BookList from './Component/BookList'
import Book_Details from './Component/BookDetails';

function App() {
  return (
      <div>      
        <Routes>
         <Route path='/' element={ <BookList/> } />
          <Route path='/add' element={ <AddBook/> } />
          <Route path='/books/detail' element={ <Book_Details/> } />
        </Routes>
      </div>
  );
}

export default App;