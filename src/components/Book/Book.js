import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SelectInput from './components/SelectInput/SelectInput';
import Loader from '../Loader/Loader';
import * as BookUtils from '../../utils/bookUtils';
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
                        { BookUtils.getCover(book, this.props.showShelf) }
                        <SelectInput
                            isUpdating={book.isUpdating}
                            updateBookShelf={this.updateBookShelf}
                            currentShelf={book.shelf || ''}/>
                    </div>
                    { BookUtils.getNode(book, 'title') }
                    { BookUtils.getAuthors(book) }
                </div>
            </li>
        );
    }
}

export default Book;
