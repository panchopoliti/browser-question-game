import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import 'focus-visible'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.register();
