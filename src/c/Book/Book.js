import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectInput from './components/SelectInput/SelectInput';
import Loader from '../Loader/Loader';
import { coverShelves }  from '../../data/bookShelves';
import './Book.css';

class Book extends Component {
    static defaultProps = {
        showShelf: false
    }
    static propTypes = {
        book: PropTypes.object.isRequired,
        updateBookShelf: PropTypes.func.isRequired,
        showShelf: PropTypes.bool
    }
    /* Checks if the book has a author node and renders all the authors if it does */
    getAuthors(book) {
        return (book.authors && book.authors.length > 0)
            ?
                <div className='book-authors'>{book.authors.join(', ')}</div>
            :
                null;
    }
    /* Checks if the book has a title node and renders the title if it does */
    getTitle(book) {
        return (book.title && book.title !== '')
            ?
                <div className='book-title'>{book.title}</div>
            :
                null;
    }
    /* Checks if the book has a cover image set and renders the image if it does.
       If it doesn't it will render a white square
     */
    getCover(book) {
        const image = (book.imageLinks) ? `url(${book.imageLinks.smallThumbnail})` : null;
        return (<div
                className='book-cover'
                style={{ width: 128, height: 193, backgroundImage: image }}>
                { this.props.showShelf
                    && book.shelf
                    && book.shelf !== 'none'
                    && <div className={`book-status ${book.shelf}`}>{coverShelves[book.shelf]}</div> }
                </div>);
    }
    /* Method to move a book to a specific shelf */
    updateBookShelf = (shelf) => {
        this.props.updateBookShelf(this.props.book, shelf);
    }
    render(){
        const { book } = this.props;
        return (
            <li>
                <div className='book'>
                    <div className='book-top'>
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

export default Book;
