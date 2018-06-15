import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectInput from './components/SelectInput/SelectInput';
import Loader from '../Loader/Loader';
import { coverShelves } from '../../data/bookShelves';
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
	showMore = e => {
		e.preventDefault();
		this.setState({ showMore: true });
		return true;
	}
	closeModal = e => {
		if (this.state.showMore && e.target.className === 'book-modal') {
			this.setState({ showMore: false });
		}
		return true;
	}
	render() {
		const { book } = this.props;
		console.log(book);
		const style = this.state.showMore ? ' modal-open' : '';
		return (
			<li>
				<div className={`book${style}`}>
					<div className="book-top">
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
					{book.description &&
						book.description.length > 0 && (
							<a
								onClick={e => this.showMore(e)}
								className="more-description">
								More information
							</a>
						)}
				</div>
				{this.state.showMore && (
					<div
						className="book-modal"
						onClick={e => this.closeModal(e)}>
						<div className="modal-content">
							<div className="book-modal-title">{BookUtils.getNode(book, 'title')}</div>
							<div>
								<u>DESCRIPTION:</u> {BookUtils.getNode(book, 'description')} <br/>
							</div>
							{ book.publishedDate &&
								<div>

									<u>PUBLISHED DATE:</u>{BookUtils.getNode(book, 'publishedDate')} <br/>
								</div>
							}
							{ book.averageRating &&
								<div>
									<u>AVERAGE RATING:</u>{BookUtils.getNode(book, 'averageRating')}
								</div>
							}
						</div>
					</div>
				)}
			</li>
		);
	}
}

export default Book;
