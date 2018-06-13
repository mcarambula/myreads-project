import React from 'react';
import PropTypes from 'prop-types';
import Book from '../Book/Book';
import './BooksGrid.css';

const BooksGrid = (props) => (
    <div className="bookshelf-books">
        <ol className="books-grid">
          {
              (props.books.length > 0 ) ?
                ( props.books.map((book, j) =>{
                      return <Book
                                updateBookShelf={props.updateBookShelf}
                                book={book}
                                key={j}
                                showShelf={props.showShelf} />
                  }))
              :
              <div className="no-books">No books</div>
          }
        </ol>
    </div>
);

BooksGrid.propTypes = {
    books: PropTypes.array.isRequired,
    updateBookShelf: PropTypes.func.isRequired,
    showShelf: PropTypes.bool
}

BooksGrid.defaultProps = {
    books: [],
    showShelf: false
};

export default BooksGrid;
