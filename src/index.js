import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App/App';
import './index.css';

ReactDOM.render(
	<BrowserRouter basename='/my-reads'>
		<App />
	</BrowserRouter>,
	document.getElementById('root')
);
