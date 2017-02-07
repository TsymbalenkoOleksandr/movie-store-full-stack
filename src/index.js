import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router';

import routes from './routes';

import configureStore from './store/configureStore';
const store = configureStore();

// Save a reference to the root element for reuse
const rootEl = document.getElementById('root');

// Create a reusable render method that we can call more than once
let render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory} routes={routes(store)} />
    </Provider>,
    rootEl
  );
};

if(module.hot) {
  // Support hot reloading of components
  // and display an overlay for runtime errors
  const renderApp = render;
  const renderError = (error) => {
    const RedBox = require('redbox-react').default;
    ReactDOM.render(
      <RedBox error={error} />,
      rootEl,
    );
  };

  // In development, we wrap the rendering function to catch errors,
  // and if something breaks, log the error and render it to the screen
  render = () => {
    try {
      renderApp();
    }
    catch(error) {
      console.error(error);
      renderError(error);
    }
  };

  // Whenever the App component file or one of its dependencies
  // is changed, re-import the updated component and re-render it
  module.hot.accept('./components/App/App', () => {
    setTimeout(render);
  });
}

render();
