import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectInput from './components/SelectInput/SelectInput';
import Loader from '../Loader/Loader';
import BookModal from './components/BookModal/BookModal';
import * as BookUtils from '../../utils/bookUtils';
import './Book.css';

class Book extends Component {
	state = {
		showMore: false
	}
	static defaultProps = {
		showShelf: false
	}
	static propTypes = {
		book: PropTypes.object.isRequired,
		updateBookShelf: PropTypes.func.isRequired,
		showShelf: PropTypes.bool
	}
	/* Method to move a book to a specific shelf */
	updateBookShelf = shelf => {
		this.props.updateBookShelf(this.props.book, shelf);
	}
	/* Allows to show more information about the book */
	showMore = e => {
		e.preventDefault();
		this.setState({ showMore: true });
		return true;
	}
	/* Allows to close the modal with more information about the book */
	closeModal = () => {
		this.setState({ showMore: false });
		return true;
	}
	render() {
		const { book } = this.props;
		console.log(book.authors);
		return (
			<li>
				<div className='book'>
					<div className="book-top">
						{ /*
							Show a loader inside the book div to show to the user
							the book is updating
						*/ }
						{book.isUpdating && <Loader />}
						{BookUtils.getCover(book, this.props.showShelf)}
						<SelectInput
							isUpdating={book.isUpdating}
							updateBookShelf={this.updateBookShelf}
							currentShelf={book.shelf || ''}
						/>
					</div>
					{BookUtils.getNode(book, 'title', true)}
					{BookUtils.getAuthors(book)}
					{ ((book.description && book.description.length !== '')
						|| (book.authors && book.authors.length > 0)) && (
							<a
								onClick={e => this.showMore(e)}
								className="more-description">
								More information
							</a>
						)}
				</div>
				{this.state.showMore && (
					<BookModal
						book={book}
						closeModal={this.closeModal} />
				)}
			</li>
		);
	}
}

export default Book;
