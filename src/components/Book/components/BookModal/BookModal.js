import React from 'react';
import PropTypes from 'prop-types';
import * as BookUtils from '../../../../utils/bookUtils';
import './BookModal.css';

const BookModal = props => {
	const { book } = props;
	return (
		<div className="book-modal">
			<div className="modal-content">
				<img
					className="close-modal"
					src={require('../../../../icons/close.svg')}
					alt="Close"
					onClick={() => props.closeModal()}
				/>
				<div className="book-modal-title">
					{BookUtils.getNode(book, 'title')}
				</div>
				<div>
					<u>DESCRIPTION:</u>
					{BookUtils.getNode(book, 'description')} <br />
				</div>
				<div>
					<u>AUTHOR(S):</u>
					{BookUtils.getAuthors(book, false)}<br />
				</div>
				{book.publishedDate && (
					<div>
						<u>PUBLISHED DATE:</u>
						{BookUtils.getNode(book, 'publishedDate')}
						<br />
					</div>
				)}
				{book.averageRating && (
					<div>
						<u>AVERAGE RATING:</u>
						{BookUtils.getNode(book, 'averageRating')}
					</div>
				)}
			</div>
		</div>
	);
}

BookModal.propTypes = {
	book: PropTypes.object.isRequired,
	closeModal: PropTypes.func.isRequired
};

BookModal.defaultProps = {
	book: {},
	closeModal: () => {}
};

export default BookModal;
