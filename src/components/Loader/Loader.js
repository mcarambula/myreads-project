import React from 'react';
import PropTypes from 'prop-types';
import './Loader.css';

const Loader = props => (
	<div className={`spinner ${props.section}`}>
		<div className="bounce1" />
		<div className="bounce2" />
		<div className="bounce3" />
	</div>
)

Loader.propTypes = {
	section: PropTypes.string
};

Loader.defaultProps = {
	section: ''
};

export default Loader;
