import React, {Component} from 'react';

class SortBy extends Component {
    state = {
        value : this.props.sortBy || 'title'
    }
    handleChange = (event)=> {
        if (event.target.value !== this.state.value) {
            this.setState({value: event.target.value});
            this.props.onSort(event.target.value, this.props.shelf);
        }
        return true;
    }
    render() {
        return (
            <div className="sort-by">Sort By:&nbsp;
                <select
                    value={this.state.value}
                    onChange={this.handleChange}
                    disabled={(this.props.isSorting) ? true : false}
                    >
                    <option value="title">Title</option>
                    <option value="ratingsCount">Rating</option>
                    <option value="publisher">Publisher</option>
                </select>
            </div>
        );
    }
}

export default SortBy;
