import React from 'react';
import * as BookUtils from '../../../../utils/bookUtils';
import './BookModal.css';

const BookModal = props => {
    const { book } = props;
    return (
        <div className="book-modal" >
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
    )
};

export default BookModal;
