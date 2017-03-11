import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {Button, FormGroup, ControlLabel, FormControl} from 'react-bootstrap'
import {addArticleToDb} from '../actions/index.js'
import './components.css'

class NewArticle extends Component {
  constructor(props){
    super(props)
    this.saveTheArticle = this.saveTheArticle.bind(this)
    this.state = {f_id: props.features.features.find(item=>{return item._id === props.location.pathname.split("/")[2]})._id}
  }

  parseName(name){
    return name.replace(/\s/g, "").toLowerCase()
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps)
  }

  saveTheArticle(event){
    let new_article = {}
    for (let i = 0; i < event.target.parentElement.children.length; i++) {
      if (event.target.parentElement.children[i].className.includes('text')) {
        new_article[event.target.parentElement.children[i].id] = event.target.parentElement.children[i].value
      }
    }
    this.props.newArticle({...new_article, f_id: this.state.f_id})
  }

  render(){
    console.log(this.props)
    return (
      <div className='col-md-6 col-sm-6 col-6 article'>
        <FormGroup controlId='formControlsTextarea'>
          <Button onClick={this.saveTheArticle} id='save' className='article--edit_button' bsStyle='primary'>Submit</Button>
          <br/>
          <ControlLabel>Name</ControlLabel>
          <FormControl className='text' id='name' componentClass='textarea' placeholder='Article Name' />
          <ControlLabel>Description</ControlLabel>
          <FormControl className='text' id='description' componentClass='textarea' placeholder='Article Description' />
        </FormGroup>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {article: state.article, features: state.features}
}

const mapDispatchToProps = dispatch => {
  return {
    newArticle: (article) => {
      dispatch(addArticleToDb(article))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewArticle)
