import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import bookShelfTitles  from './data/bookShelfs';
import BookShelf from './BookShelf';

class BooksApp extends React.Component {
    state = {
        /**
         * TODO: Instead of using this state variable to keep track of which page
         * we're on, use the URL in the browser's address bar. This will ensure that
         * users can use the browser's back and forward buttons to navigate between
         * pages, as well as provide a good URL they can bookmark and share.
         */
         books: [],
    }
    componentDidMount() {
        BooksAPI.getAll()
        .then((books) => {
            console.log(books);
            this.setState(() => ({
              books,
              loading: false
            }));
        })
    }
    updateBookShelf = (book, shelf) => {
        const books = [...this.state.books];
        const index = books.findIndex(el => el.id === book.id);
        /* Giving son UI response to the user about the updating process  */
        books[index].isUpdating = true;
        this.setState({books});

        BooksAPI
        .update(book,shelf)
        .then((response) => {
            books[index].shelf = shelf;
            books[index].isUpdating = false;
            this.setState({books});
        })
        .catch(error => {
            /* Show an error */
            books[index].isUpdating = false;
            this.setState({books});
        })
    }
    getRoute = (state) => {
        return (
            <Switch>
                <Route exact path="/" render={()=>
                    <BookShelf
                        books={state.books}
                        shelfs={bookShelfTitles}
                        updateBookShelf={this.updateBookShelf}/>
                } />
                <Route path="/search" render={()=>  (
                    <div className="search-books">
                      <div className="search-books-bar">
                        <Link className="close-search" to="/">Close</Link>
                        <div className="search-books-input-wrapper">
                          {/*
                            NOTES: The search from BooksAPI is limited to a particular set of search terms.
                            You can find these search terms here:
                            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                            you don't find a specific author or title. Every search is limited by search terms.
                          */}
                          <input type="text" placeholder="Search by title or author"/>

                        </div>
                      </div>
                      <div className="search-books-results">
                        <ol className="books-grid"></ol>
                      </div>
                    </div>
                )} />
            </Switch>
        )
    }
    render() {
        return (
          <div className="app">
              {this.getRoute(this.state)}
          </div>
      )
  }
}

export default BooksApp
