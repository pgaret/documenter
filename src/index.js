import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import { Router, Route, hashHistory } from 'react-router'
import { composeWithDevTools } from 'redux-devtools-extension'

import App from './containers/App';
import Article from './components/Article'
import EditArticle from './components/EditArticle'
import NewArticle from './components/NewArticle'
import FeaturePage from './containers/FeaturePage'
import {getPeopleFromDb, getProjectsFromDb, getFeaturesFromDb, setSidebarMode} from './actions/index'
import rootReducer from './reducers'

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

store.dispatch(getPeopleFromDb())
store.dispatch(getProjectsFromDb())
store.dispatch(getFeaturesFromDb())
store.dispatch(setSidebarMode('features'))

ReactDOM.render((
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path='/' component={App}>
      <Route path='/features/:feature_id/new' component={NewArticle} />
        <Route path='/features/:feature_id/:subfeature_id/edit' component={EditArticle} />
        <Route path='/features/:feature_id/:subfeature_id' component={Article} />
        <Route path='/features/:feature_id' component={FeaturePage} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'));
