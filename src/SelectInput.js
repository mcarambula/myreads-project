import React, {Component} from 'react';

class SelectInput extends Component {
    state = {
        value : this.props.currentShelf || 'none'
    }
    handleChange = (event)=> {
        if (event.target.value !== this.state.value) {
            this.setState({value: event.target.value});
            this.props.updateBookShelf(event.target.value);
        }
        return true;
    }
    render() {
        return (
            <div className="book-shelf-changer">
                <select
                    value={this.state.value}
                    onChange={this.handleChange}
                    disabled={(this.props.isUpdating) ? true : false}
                    >
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        );
    }
}

export default SelectInput;
