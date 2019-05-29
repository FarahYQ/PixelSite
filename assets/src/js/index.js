import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/App';
import store from './store';
import '../scss/index.scss';

ReactDOM.render(<Root store={store}/>, document.getElementById("app"));