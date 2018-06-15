import React from 'react';
import { Route, Switch } from 'react-router-dom';
import * as BooksAPI from '../../api/BooksAPI';
import { bookShelves } from '../../data/bookShelves';
import BookShelf from '../BookShelf/BookShelf';
import Search from '../Search/Search';
import './App.css';

class BooksApp extends React.Component {
	state = {
		books: [],
		searchedBooks: [],
		loading: true,
		error: false
	};
	componentDidMount() {
		/* Getting the books */
		BooksAPI.getAll()
			.then(books => {
				this.setState(() => ({
					books,
					loading: false
				}));
			})
			.catch(e => {
				this.setState(() => ({
					books: [],
					loading: false,
					error: true
				}));
			});
	}
	/* Allows to update a shelf's book on the main page */
	updateBookShelf = (book, shelf) => {
		const books = [...this.state.books];
		const index = books.findIndex(el => el.id === book.id);
		/* Giving son UI response to the user about the updating process  */
		books[index].isUpdating = true;
		this.setState({ books });

		BooksAPI.update(book, shelf)
			.then(response => {
				books[index].shelf = shelf;
				books[index].isUpdating = false;
				this.setState({ books });
			})
			.catch(error => {
				books[index].isUpdating = false;
				this.setState({
					books,
					error: true
				});
			});
	};
	/* Allows to move a searched book to the shelf */
	moveBook = (book, shelf) => {
		this.setState(prevState => ({
			books: prevState.books.filter(b => b.id !== book.id).concat([book])
		}));
	}
	showError = () => {
		this.setState({error: true});
	}
	/* Will determinate the route given the path */
	getRoute = state => {
		return (
			<Switch>
				<Route
					exact
					path="/"
					render={() => (
						<BookShelf
							books={state.books}
							shelves={bookShelves}
							updateBookShelf={this.updateBookShelf}
							loading={this.state.loading}
						/>
					)}
				/>
				<Route
					path="/search"
					render={() => (
						<Search
							booksOnShelf={state.books}
							updateBookShelf={this.updateBookShelf}
							moveBook={this.moveBook}
							showError={this.showError}
						/>
					)}
				/>
			</Switch>
		);
	};
	render() {
		return (
			<div className="app">
				<div className="list-books">
					<div className="list-books-title">
						<h1>My Reads App</h1>
					</div>
					{this.state.error &&
						<div className="error-container">
							<div>An error has occurred. Please try later.</div>
						</div>
					}
					<div className="list-books-content">
						{this.getRoute(this.state)}
					</div>
					}
				</div>
			</div>
		);
	}
}

export default BooksApp;
