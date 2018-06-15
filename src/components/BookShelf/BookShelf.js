import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BooksGrid from '../BooksGrid/BooksGrid';
import './BookShelf.css';

class BookShelf extends Component {
	renderHowMany = length => {
		if (length > 1) {
			return <span className="books-length">{length} books</span>;
		} else if (length === 1) {
			return <span className="books-length">{length} book</span>;
		}
		return null;
	}
	renderBooks(books, shelfs) {
		return (
			<div>
				{shelfs.map((shelf, i) => {
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
									<div>Loading ...</div>
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
		const { books, shelfs } = this.props;
		return (
			<div>
				{this.renderBooks(books, shelfs)}
				<div className="open-search">
					<Link to="/search">Add a book</Link>
				</div>
			</div>
		);
	}
}

export default BookShelf;
