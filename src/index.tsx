// eslint-disable-next-line no-use-before-define
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import store from 'store/store';

import './i18n-init';
import './index.css';

// All module imports with non-relative names are assumed to be relative to the src/ folder
import { ROUTES } from 'app-constants';

import Home from 'views/Home/Home';
import NoMatch from 'views/NoMatch/NoMatch';
import PlaceholderUsers from 'views/Placeholder/PlaceholderUsers';

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path={ROUTES.HOME}>
            <Home />
          </Route>
          <Route exact path={ROUTES.PLACEHOLDER_USERS}>
            <PlaceholderUsers />
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
