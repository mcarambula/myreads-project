import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bookShelves }  from '../../../../data/bookShelves';
import './SelectInput.css';

class SelectInput extends Component {
    state = {
        value : this.props.currentShelf
    }
    static defaultProps = {
        isUpdating: false,
        currentShelf: 'none'
    }
    static propTypes = {
        isUpdating: PropTypes.bool,
        currentShelf: PropTypes.string
    }
    /* Handling changes on the select option */
    handleChange = (event) => {
        if (event.target.value !== this.state.value) {
            this.setState({ value: event.target.value });
            this.props.updateBookShelf(event.target.value);
        }
        return true;
    }
    render() {
        return (
            <div className='book-shelf-changer'>
                <select
                    value={ this.state.value }
                    onChange={ this.handleChange }
                    disabled={ (this.props.isUpdating) ? true : false } >
                        <option value='move' disabled>Move to...</option>
                        {
                            bookShelves.map((shelf, index) => {
                                return <option key={index} value={shelf.id}>{shelf.label}</option>
                           })
                        }
                </select>
            </div>
        );
    }
}

export default SelectInput;
