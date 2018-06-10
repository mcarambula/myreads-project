import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectInput from './SelectInput';
import Loader from './Loader';
import { coverShelves }  from './data/bookShelves';

class Book extends Component {
    getAuthors(book) {
        return (book.authors && book.authors.length > 0)
            ?
                <div className="book-authors">{book.authors.join(', ')}</div>
            :
                null;
    }
    getTitle(book) {
        return (book.title && book.title !== '')
            ?
                <div className="book-title">{book.title}</div>
            :
                null;
    }
    getCover(book) {
        const image = (book.imageLinks) ? `url(${book.imageLinks.smallThumbnail})` : null;
        return (<div
                className="book-cover"
                style={{ width: 128, height: 193, backgroundImage: image }}>
                { this.props.showShelf
                    && book.shelf && book.shelf !== 'none'
                    && <div className={`book-status ${book.shelf}`}>{coverShelves[book.shelf]}</div> }
                </div>);
    }
    updateBookShelf = (shelf) => {
        this.props.updateBookShelf(this.props.book, shelf);
    }
    render(){
        const { book } = this.props;
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        { book.isUpdating && <Loader /> }
                        { this.getCover(book) }
                        <SelectInput
                            isUpdating={book.isUpdating}
                            updateBookShelf={this.updateBookShelf}
                            currentShelf={book.shelf || ''}/>
                    </div>
                    { this.getTitle(book) }
                    { this.getAuthors(book) }
                </div>
            </li>
        );
    }
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    updateBookShelf: PropTypes.func.isRequired,
    showShelf: PropTypes.bool
}

Book.defaultProps = {
    showShelf: false
};

export default Book;
