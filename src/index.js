import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { composeWithDevTools } from 'redux-devtools-extension'

import App from './containers/App';
import Article from './components/Article'
import EditArticle from './components/EditArticle'
import NewArticle from './components/NewArticle'
import {queryPeople, queryProjects, queryFeatures, setDefaultArticle} from './actions/index'
import rootReducer from './reducers'

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

store.dispatch(queryPeople())
store.dispatch(queryProjects())
store.dispatch(queryFeatures())
store.dispatch(setDefaultArticle())

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <Route path='/features/edit/:feature_name' component={EditArticle} />
        <Route path='/features/new' component={NewArticle} />
        <Route path='/features/:feature_name' component={Article} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'));
