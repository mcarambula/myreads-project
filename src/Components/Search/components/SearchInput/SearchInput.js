import React, { Component } from 'react';
import './SearchInput.css';

class Search extends Component {
  state = {
      search: ''
  }
  componentDidMount() {
      this.searchInput.focus();
  }
  handleInputChange = e => {
      this.setState({search: e.target.value});
  }
  cleanInput = e => {
       this.setState({search: ''});
       this.props.cleanSearch('');
  }
  handleSubmit = e => {
      e.preventDefault();
      this.props.onSearchBooks(this.state.search);
  }
  render() {
    return (
        <form onSubmit={this.handleSubmit} className="search-books-form" >
            <div className="search-books-input-wrapper">
                <input
                    type="text"
                    value={this.state.search}
                    placeholder="Search by title or author"
                    onChange={(e) => this.handleInputChange(e)}
                    ref={(input) => { this.searchInput = input; }}
                />
                {this.state.search !== '' && <div className="clean-search" onClick={this.cleanInput}></div>}
            </div>
        </form>
    );
  }
}

export default Search;
