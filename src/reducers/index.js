import {combineReducers} from 'redux'
import people from './people'
import projects from './projects'
import features from './features'
import article from './article'
import sidebar from './sidebar'

const rootReducer = combineReducers({
  projects: projects, people: people, features: features, article: article, sidebar: sidebar
})

export default rootReducer
