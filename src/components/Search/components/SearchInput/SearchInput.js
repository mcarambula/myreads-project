import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SearchInput.css';

class Search extends Component {
	state = {
		search: ''
	}
	static defaultProps = {
		onSearchBooks: () => {},
		cleanSearch: () => {}
	}
	static propTypes = {
		onSearchBooks: PropTypes.func.isRequired,
		cleanSearch: PropTypes.func.isRequired
	}
	componentDidMount() {
		this.searchInput.focus();
	}
	handleInputChange = e => {
		const search = e.target.value;
		const cleaned = search.trim();
		this.setState({ search });
		this.props.onSearchBooks(cleaned);
	}
	cleanInput = e => {
		this.setState({ search: '' });
		this.props.cleanSearch('');
	}
	render() {
		return (
			<div className="search-books-input-wrapper">
				<input
					type="text"
					value={this.state.search}
					placeholder="Search by title or author"
					onChange={e => this.handleInputChange(e)}
					ref={input => {
						this.searchInput = input;
					}}
				/>
				{this.state.search !== '' && (
					<div className="clean-search" onClick={this.cleanInput} />
				)}
			</div>
		);
	}
}

export default Search;
