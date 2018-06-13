import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { coverShelves }  from '../data/bookShelves';

/* Checks if the book has a author node and renders all the authors if it does */
export function getAuthors(book) {
    return (book.authors && book.authors.length > 0)
        ?
            <div className='book-authors'>{book.authors.join(', ')}</div>
        :
            null;
}
/* Checks if the book has a cover image set and renders the image if it does.
   If it doesn't it will render a white square
 */
export function getCover(book, showShelf) {
    const image = (book.imageLinks) ? `url(${book.imageLinks.smallThumbnail})` : null;
    return (<Link
            to={{
                pathname: '/detail',
                state: {
                    book
                }
            }}
            className='book-cover'
            style={{ width: 128, height: 193, backgroundImage: image }}>
            { showShelf
                && book.shelf
                && book.shelf !== 'none'
                && <div className={`book-status ${book.shelf}`}>{coverShelves[book.shelf]}</div> }
            </Link>);
}

export function getNode(book, node) {
    return (book[node] && book[node] !== '') ? <div className={`book-${node}`}>{book[node]}</div> : null;
}
