import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';

class BookShelf extends Component {
    renderBooks(books, shelfs) {
        return (
            <div>
            {
                shelfs.map((shelf, i) =>{
                    const filteredBooks = books.filter(book => book.shelf === shelf.id);
                    return (
                        <div className="bookshelf" key={i}>
                          <h2 className={`bookshelf-title ${shelf.id}`}>{shelf.label}
                              <span className="filtered-books-length">{filteredBooks.length}</span>
                          </h2>
                          <div className="bookshelf-books">
                            <ol className="books-grid">
                                {filteredBooks.map((book, j) =>{
                                    return <Book updateBookShelf={this.props.updateBookShelf} book={book} key={j} />
                                })}
                            </ol>
                          </div>
                        </div>
                    )
                })
            }
          </div>
        )
    }
    render() {
        const { books, shelfs } = this.props;
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    {this.renderBooks(books, shelfs)}
                    <div className="open-search">
                        <Link to="/search">Add a book</Link>
                    </div>
                 </div>
            </div>
        )
    }

}

export default BookShelf;
