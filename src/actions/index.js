import {hashHistory, browserHistory} from 'react-router'
import axios from 'axios'

const URL='https://documenter-api.herokuapp.com/api/v1/'
const WINDOW_URL='https://documenter.herokuapp.com/'
// const URL='http://localhost:9000/api/v1/'
// const WINDOW_URL='http://localhost:3000/'

function parseName(name){
  return name.replace(/\s/g, "").toLowerCase()
}

export const linkArticle = (article) => {
  hashHistory.push(article._id)
  return {type: 'SET_ARTICLE', payload: article}
}

export const addPeopleToState = (people) => {
  return {type: 'GET_PEOPLE', payload: people}
}

export const addProjectsToState = (projects) => {
  return {type: 'GET_PROJECTS', payload: projects}
}

export const addFeaturesToState = (features) => {
  return {type: 'GET_FEATURES', payload: features}
}

export const setArticleInState = (article) => {
  return {type: 'SET_ARTICLE', payload: article}
}

export const setDefaultArticle = () => {
  if (window.location.href !== WINDOW_URL+"#/") { hashHistory.push('/') }
  return {type: 'SET_ARTICLE', payload: {name: 'Kustomer', description: 'Awesome Customer Service Startup', edit: false, saved: false}}
}

export const editArticle = () => {
  return {type: 'EDIT_ARTICLE'}
}

export const saveArticleToState = (article) => {
  return {type: 'SAVE_ARTICLE', payload: article}
}

export const finishArticleInState = (article) => {
  return {type: 'FINISH_ARTICLE', payload: article}
}

export const updateFeatureInState = (article) => {
  return {type: 'UPDATE_FEATURES', payload: article}
}

export const settingFeatureName = () => {
  return {type: 'SETTING_FEATURE_NAME'}
}

export const addFeatureToState = (feature) => {
  return {type: 'CREATE_FEATURE', payload: feature}
}

export const addSubfeatureToState = (article) => {
  return {type: 'ADD_SUBFEATURE', payload: article}
}

export const createNewArticle = (f_id) => {
  return {type: 'NEW_ARTICLE', payload: {f_id: f_id}}
}

export const saveArticle = (article) => {
  return function(dispatch){
    console.log(article)
    axios({method: 'PATCH', url:URL+'features/'+article.f_id+"/"+article._id, data: article}).then(result=>{
      if (article.result === 'save'){
        dispatch(saveArticleToState(article))
      } else {
        dispatch(finishArticleInState(article))
        if (window.location.href !== WINDOW_URL+"#/features/"+article.f_id+"/"+article._id){
          hashHistory.push("features/"+article.f_id+"/"+article._id)
        }
      }
      dispatch(addSubfeatureToState(article))
    }).catch(response=>{
      //  console.log(response)
    })
  }
}

export const addFeatureToDb = (name) => {
  return function(dispatch){
    console.log(name)
    axios({method: 'POST', url:URL+'features/new', data: {name: name}}).then(result=>{
      console.log(result)
      dispatch(addFeatureToState(result.data))
    })
  }
}

export const addArticleToDb = (article) => {
  return function(dispatch){
    console.log(article)
    axios({method: 'POST', url:URL+'features/'+article.f_id+"/new", data: article}).then(result=>{
      article._id=result.data.result._id
      dispatch(finishArticleInState(article))
      dispatch(addSubfeatureToState(article))
      hashHistory.push('features/'+article.f_id+"/"+result.data.result._id)
    }).catch(response=>{
       console.log(response)
    })
  }
}

export const getPeopleFromDb = () => {
  return function(dispatch){
    axios({method:'GET', url:URL+'team'}).then(result=>{
      dispatch(addPeopleToState(result.data.team))
    }).catch(response=>{
      // console.log(response)
    })
  }
}

export const getProjectsFromDb = () => {
  return function(dispatch){
    axios({method:'GET', url:URL+'projects'}).then(result=>{
      dispatch(addProjectsToState(result.data.projects))
    }).catch(response=>{
      // console.log(response)
    })
  }
}

export const getFeaturesFromDb = () => {
  return function(dispatch){
    axios({method:'GET', url:URL+'features'}).then(result=>{
      dispatch(addFeaturesToState(result.data.features))
    }).catch(response=>{
      // console.log(response)
    })
  }
}

export const setSidebarMode = (mode) => {
  return {type: 'SET_SIDEBAR', payload: mode}
}
