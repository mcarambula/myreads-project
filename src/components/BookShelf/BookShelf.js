import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import BooksGrid from '../BooksGrid/BooksGrid';
import './BookShelf.css';

class BookShelf extends Component {
	static defaultProps = {
		books: [],
		shelves: [],
		updateBookShelf: () => {},
		moveBook: () => {},
		loading: false
	}
	static propTypes = {
		books: PropTypes.array.isRequired,
		shelves: PropTypes.array.isRequired,
		updateBookShelf: PropTypes.func.isRequired,
		moveBook: PropTypes.func.isRequired,
		loading: PropTypes.bool
	}
	renderHowMany = length => {
		if (length > 1) {
			return <span className="books-length">{length} books</span>;
		} else if (length === 1) {
			return <span className="books-length">{length} book</span>;
		}
		return null;
	}
	renderBooks(books, shelves) {
		return (
			<div>
				{shelves.map((shelf, i) => {
					if (shelf.id !== 'none') {
						const filteredBooks = books.filter(
							book => book.shelf === shelf.id
						);
						const length = filteredBooks.length;
						return (
							<div className="bookshelf" key={i}>
								<h2 className={`bookshelf-title ${shelf.id}`}>
									{shelf.label}
									{this.renderHowMany(length)}
								</h2>
								{this.props.loading ? (
									<div className="loading">
										<Loader section="search" />
										Loading books..
									</div>
								) : length > 0 ? (
									<BooksGrid
										books={filteredBooks}
										updateBookShelf={
											this.props.updateBookShelf
										}
									/>
								) : (
									<p className="no-books"> No books </p>
								)}
							</div>
						);
					}
					return null;
				})}
			</div>
		);
	}
	render() {
		const { books, shelves } = this.props;
		return (
			<div>
				{this.renderBooks(books, shelves)}
				<div className="open-search">
					<Link to="/search">Add a book</Link>
				</div>
			</div>
		);
	}
}

export default BookShelf;
