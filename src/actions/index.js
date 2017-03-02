import {browserHistory} from 'react-router'
import axios from 'axios'

// const URL='https://kustomer-api.herokuapp.com/api/v1/'
const URL='http://localhost:9000/api/v1/'

export const loadPeople = (people) => {
  return {type: 'GET_PEOPLE', payload: people}
}

export const queryPeople = () => {
  return function(dispatch){
    axios({method:'GET', url:URL+'team'}).then(result=>{
      dispatch(loadPeople(result.data.team))
    }).catch(response=>{
      // console.log(response)
    })
  }
}

export const loadProjects = (projects) => {
  return {type: 'GET_PROJECTS', payload: projects}
}

export const queryProjects = () => {
  return function(dispatch){
    axios({method:'GET', url:URL+'projects'}).then(result=>{
      dispatch(loadProjects(result.data.projects))
    }).catch(response=>{
      // console.log(response)
    })
  }
}

export const loadFeatures = (features) => {
  return {type: 'GET_FEATURES', payload: features}
}

export const queryFeatures = () => {
  return function(dispatch){
    axios({method:'GET', url:URL+'features'}).then(result=>{
      dispatch(loadFeatures(result.data.features))
    }).catch(response=>{
      // console.log(response)
    })
  }
}

export const setArticle = (article) => {
  return {type: 'SET_ARTICLE', payload: article}
}

export const setDefaultArticle = () => {
  browserHistory.push('/')
  return {type: 'SET_ARTICLE', payload: {name: 'Kustomer', description: 'Awesome Customer Service Startup', edit: false, saved: false}}
}

export const editArticle = () => {
  return {type: 'EDIT_ARTICLE'}
}

export const finishSaving = (article) => {
  return {type: 'SAVE_ARTICLE', payload: {article: article}}
}

export const finishEditing = (article) => {
  return {type: 'FINISH_ARTICLE', payload: {article: article}}
}

export const updateFeatures = (article) => {
  return {type: 'UPDATE_FEATURES', payload: {article: article}}
}

export const saveArticle = (article) => {
  return function(dispatch){
    // console.log(article)
    axios({method: 'PATCH', url:URL+'features/'+article.f_id+"/"+article._id, data: article}).then(result=>{
      article.result === 'save' ? dispatch(finishSaving(article)) : dispatch(finishEditing(article))
      dispatch(updateFeatures(article))
    }).catch(response=>{
      //  console.log(response)
    })
  }
}

export const settingFeatureName = () => {
  return {type: 'SETTING_FEATURE_NAME'}
}

export const finishFeature = (feature) => {
  return {type: 'CREATE_FEATURE', payload: {feature: feature}}
}

export const createNewFeature = (name) => {
  return function(dispatch){
    console.log(name)
    axios({method: 'POST', url:URL+'features/new', data: {name: name}}).then(result=>{
      console.log(result)
      dispatch(finishFeature(result.data))
    })
  }
}

export const createNewArticle = (f_id) => {
  return {type: 'NEW_ARTICLE', payload: {f_id: f_id}}
}

export const createNewSubfeature = (article) => {
  return {type: 'ADD_SUBFEATURE', payload: {article: article}}
}

export const finishPosting = (article) => {
  return {type: 'NEW_ARTICLE', payload: article}
}

function parseName(name){
  return name.replace(/\s/g, "").toLowerCase()
}

export const newArticle = (article) => {
  return function(dispatch){
    console.log(article)
    axios({method: 'POST', url:URL+'features/'+article.f_id+"/new", data: article}).then(result=>{
      console.log(result)
      article.id=result.data.result._id.$oid
      dispatch(finishEditing(article))
      dispatch(createNewSubfeature(article))
      browserHistory.push('features/'+parseName(article.name))
    }).catch(response=>{
       console.log(response)
    })
  }
}
