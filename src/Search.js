import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import SearchInput from './SearchInput';
import BooksGrid from './BooksGrid';
import * as BooksAPI from './BooksAPI';

class Search extends Component {
    state = {
        searchedBooks: [],
        loading: false
    }
    onSearchBooks = (query) => {
        this.setState(() => ({loading: true}));
        BooksAPI.search(query)
        .then((searchedBooks) => {
            let updatedBooks = [];
            if (!searchedBooks.error) {
                /* Adding the shelf value on the books */
                updatedBooks = searchedBooks.map(book => {
                    /* Find the book */
                    const bAux = this.props.booksOnShelf.filter(b => b.id === book.id)[0] || {};
                    if (bAux.shelf !== undefined) {book.shelf = bAux.shelf;}
                    return book;
                });
            }
            this.setState(() => ({
                searchedBooks: updatedBooks,
                loading: false
            }));
        })
        .catch(e => {
            this.setState(() => ({
                searchedBooks: []
            }));
        })
    }
    cleanSearch = () => {
        this.setState(() => ({
            searchedBooks: []
        }));
    }
    updateBook = (book, shelf) => {
        const searchedBooks = [...this.state.searchedBooks];
        const index = searchedBooks.findIndex(el => el.id === book.id);
        /* Giving son UI response to the user about the updating process  */
        searchedBooks[index].isUpdating = true;
        this.setState({searchedBooks});

        BooksAPI
        .update(book,shelf)
        .then((response) => {
            searchedBooks[index].shelf = shelf;
            searchedBooks[index].isUpdating = false;
            this.setState({searchedBooks});
        })
        .catch(error => {
            /* Show an error */
            searchedBooks[index].isUpdating = false;
            this.setState({searchedBooks});
        })
        this.props.moveBook(book, shelf);
    }
    render() {
        return (
            <div className="search-books-container">
                <div className="search-books-title"></div>
                <div className="search-books-content">
                    <div className="search-books">
                      <div className="search-books-bar">
                        <Link className="close-search" to="/">Close</Link>
                        <SearchInput
                            onSearchBooks={this.onSearchBooks}
                            cleanSearch={this.cleanSearch}
                        />
                      </div>
                      {this.state.loading  ?
                          <div>Loading.. </div>
                          :
                          <BooksGrid
                              books={this.state.searchedBooks}
                              updateBookShelf={this.updateBook}
                              showShelf={true} />
                      }
                    </div>
                </div>
            </div>
        )
    }
}

export default Search;
