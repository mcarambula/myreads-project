import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../../api/BooksAPI';
import BooksGrid from '../BooksGrid/BooksGrid';
import Loader from '../Loader/Loader';
import SearchInput from './components/SearchInput/SearchInput';
import './Search.css';

class Search extends Component {
	state = {
		search: '',
		searchedBooks: [],
		loading: false
	}
	static defaultProps = {
		booksOnShelf: [],
		updateBookShelf: () => {},
		moveBook: () => {},
		showError: () => {}
	}
	static propTypes = {
		booksOnShelf: PropTypes.array.isRequired,
		updateBookShelf: PropTypes.func.isRequired,
		moveBook: PropTypes.func.isRequired,
		showError: PropTypes.func,
	}
	/*
		This function will search the book given the query
		and will check on the initials books to see if
		they already are in a specific shelf
	*/
	onSearchBooks = query => {
		if (query === '') {
			this.setState({search: '', searchedBooks: [], loading: false });
			return;
		}
		/* Wait until the state is updating to make the call to the API */
		this.setState({ loading: true, search: query }, () => {
			BooksAPI.search(query)
				.then(searchedBooks => {
					/* Cancel the process if the query changes while the request was in process */
					if (query !== this.state.search) return;
					let updatedBooks = [];
					if (!searchedBooks.error) {
						/* Adding the shelf value on the books returned on the search */
						updatedBooks = searchedBooks.map(book => {
							/* Find the book */
							const bAux =
								this.props.booksOnShelf.filter(
									b => b.id === book.id
								)[0] || {};
							if (bAux.shelf !== undefined) {
								book.shelf = bAux.shelf;
							}
							return book;
						});
					}
					this.setState(() => ({
						search: query,
						searchedBooks: updatedBooks,
						loading: false
					}));
				})
				.catch(e => {
					this.setState(() => ({
						searchedBooks: [],
						loading: false
					}));
					this.props.showError();
				});
			}
		);
	}
	/* Clean searched books */
	cleanSearch = () => {
		this.setState(() => ( {searchedBooks: []} ));
		return true;
	}
	updateBook = (book, shelf) => {
		const searchedBooks = [...this.state.searchedBooks];
		const index = searchedBooks.findIndex(el => el.id === book.id);
		/* Giving son UI response to the user about the updating process  */
		searchedBooks[index].isUpdating = true;
		this.setState({ searchedBooks });
		/* Update the book with the API */
		BooksAPI.update(book, shelf)
			.then(response => {
				searchedBooks[index].shelf = shelf;
				searchedBooks[index].isUpdating = false;
				this.setState({ searchedBooks });
				// Move the current book to the app state
				this.props.moveBook(book, shelf);
			})
			.catch(error => {
				/* Show an error */
				searchedBooks[index].isUpdating = false;
				this.setState({ searchedBooks });
				this.props.showError();
			});
	}
	render() {
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link className="close-search" to="/">
						Close
					</Link>
					<SearchInput
						onSearchBooks={this.onSearchBooks}
						cleanSearch={this.cleanSearch}
					/>
				</div>
				{this.state.loading ? (
					<div className="loading">
						<Loader section="search" />
						Loading books..
					</div>
				) : (
					<BooksGrid
						books={this.state.searchedBooks}
						updateBookShelf={this.updateBook}
						showShelf={true}
					/>
				)}
			</div>
		);
	}
}

export default Search;
