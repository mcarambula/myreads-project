import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectInput from './components/SelectInput/SelectInput';
import Loader from '../Loader/Loader';
import { coverShelves }  from '../../data/bookShelves';
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
    updateBookShelf = (shelf) => {
        this.props.updateBookShelf(this.props.book, shelf);
    }
    /* Checks if the book has a author node and renders all the authors if it does */
    getAuthors = (book) => {
        return (book.authors && book.authors.length > 0)
            ?
                <div className='book-authors'>{book.authors.join(', ')}</div>
            :
                null;
    }
    /* Checks if the book has a cover image set and renders the image if it does.
       If it doesn't it will render a white square
     */
     getCover = (book, showShelf) => {
        const image = (book.imageLinks) ? `url(${book.imageLinks.smallThumbnail})` : null;
        return (<div
                className='book-cover'
                style={{ width: 128, height: 193, backgroundImage: image }}>
                { showShelf
                    && book.shelf
                    && book.shelf !== 'none'
                    && <div className={`book-status ${book.shelf}`}>{coverShelves[book.shelf]}</div> }
                </div>);
    }
    getNode = (book, node) => {
        return (book[node] && book[node] !== '') ? <div className={`book-${node}`}>{book[node]}</div> : null;
    }
    showMore = (e) => {
        e.preventDefault();
        this.setState({showMore: true});
        return true;
    }
    closeModal = (e) => {
        if (this.state.showMore && e.target.className === 'book-modal') {
            this.setState({showMore: false});
        }
        return true;
    }
    render(){
        const { book } = this.props;
        const style = (this.state.showMore) ? ' modal-open': '';
        return (
            <li>
                <div className={`book${style}`}>
                    <div className='book-top'>
                        { book.isUpdating && <Loader /> }
                        { this.getCover(book, this.props.showShelf) }
                        <SelectInput
                            isUpdating={book.isUpdating}
                            updateBookShelf={this.updateBookShelf}
                            currentShelf={book.shelf || ''}/>
                    </div>
                    { this.getNode(book, 'title') }
                    { this.getAuthors(book) }
                    <a onClick={e => this.showMore(e)}>More</a>
                </div>
                {this.state.showMore &&
                    <div className='book-modal' onClick={(e) => this.closeModal(e)}>
                        <div className='modal-content'>
                            {this.getNode(book, 'description')}
                        </div>
                    </div>
                }
            </li>
        );
    }
}

export default Book;
