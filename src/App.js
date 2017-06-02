import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';

import reducers from './reducers';

import MoviesIndex from './components/movies_index';
import MoviesShow from './components/movies_show';

import logo from './logo.svg';
import './App.css';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

class App extends Component {
  render() {
    return (
      <Provider store={createStoreWithMiddleware(reducers)}>
        <div className="App">
          <BrowserRouter>
            <Switch>
              <Route path='/movies/:id' component={ MoviesShow } />
              <Route path='/' component={ MoviesIndex } />
            </Switch>
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

export default App;
