import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {Button, FormGroup, ControlLabel, FormControl} from 'react-bootstrap'
import {saveArticle} from '../actions/index.js'
import './components.css'

class EditArticle extends Component {
  constructor(props){
    super(props)
    this.saveTheArticle = this.saveTheArticle.bind(this)
    // console.log(props)
  }

  parseName(name){
    return name.replace(/\s/g, "").toLowerCase()
  }

  saveTheArticle(event){
    let parent = event.target.id === "save" ?  event.target.parentElement : event.target.parentElement.parentElement
    let new_article = {}
    for (let i = 0; i < parent.children.length; i++) {
      if (parent.children[i].className.includes('text')) {
        new_article[parent.children[i].id] = parent.children[i].value
      }
    }
    console.log(this.props)
    this.props.saveArticle({...new_article, _id: this.props.article._id, f_id: this.props.article.f_id, result: event.target.id})
  }

  render(){
    let link = '/features/'+this.parseName(this.props.article.name)
    return (
      <div className='col-md-6 col-sm-6 col-6 article'>
        <FormGroup controlId='formControlsTextarea'>
          <Button onClick={this.saveTheArticle} id='save' className='article--edit_button' bsStyle='primary'>Save</Button>
          <Link  onClick={this.saveTheArticle} id='finish' to={link}><Button id='finish' className='article--edit_button' bsStyle='primary'>Done</Button></Link>
          <br/>
          <ControlLabel>Name</ControlLabel>
          <FormControl className='text' id='name' componentClass='textarea' placeholder='Article Name' defaultValue={this.props.article.name} />
          <ControlLabel>Description</ControlLabel>
          <FormControl className='text' id='description' componentClass='textarea' placeholder='Article Description' defaultValue={this.props.article.description} />
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
    saveArticle: (article) => {
      dispatch(saveArticle(article))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditArticle)
