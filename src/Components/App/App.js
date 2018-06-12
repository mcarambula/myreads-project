import React from 'react';
import { Route, Switch } from 'react-router-dom';
import * as BooksAPI from '../../BooksAPI';
import { bookShelves }  from '../../data/bookShelves';
import BookShelf from '../BookShelf/BookShelf';
import Search from '../Search/Search';
import './App.css';

class BooksApp extends React.Component {
    state = {
         books: [],
         searchedBooks: [],
         loading: true
    }
    componentDidMount() {
        BooksAPI.getAll()
        .then((books) => {
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
    moveBook = (book, shelf) => {
        this.setState(prevState => ({
          books: prevState.books.filter(b => b.id !== book.id).concat([ book ])
        }))
    }
    getRoute = (state) => {
        return (
            <Switch>
                <Route exact path="/" render={()=>
                    <BookShelf
                        books={state.books}
                        shelfs={bookShelves}
                        updateBookShelf={this.updateBookShelf}
                        onSort={this.sortBooks}
                        loading={this.state.loading}
                    />
                } />
                <Route path="/search" render={()=>  (
                    <Search
                        onSearchBooks={this.onSearchBooks}
                        shelfs={bookShelves}
                        booksOnShelf={state.books}
                        updateBookShelf={this.updateBookShelf}
                        moveBook={this.moveBook} />
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
