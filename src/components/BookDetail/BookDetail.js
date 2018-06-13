import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as BookUtils from '../../utils/bookUtils';
import './Detail.css';

const BookDetail = props => {
    const { book } = props;
    console.log(props);
    const image = (book.imageLinks) ? book.imageLinks.smallThumbnail : null;
    return (
        <div>
            <div>{ BookUtils.getNode(book, 'title') }</div>
            <div><img src={image} alt="Cover"/></div>
            <div>{ BookUtils.getAuthors(book) }</div>
            <div>{ BookUtils.getNode(book, 'description') }</div>
            <div>{ BookUtils.getNode(book, 'publishedDate') }</div>
            <div>Average Rating: { BookUtils.getNode(book, 'averageRating') }</div>
        </div>
    )
}

export default BookDetail;
