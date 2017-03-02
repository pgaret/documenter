import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {Button, FormGroup, ControlLabel, FormControl} from 'react-bootstrap'
import {editArticle} from '../actions/index.js'
import './components.css'

class Article extends Component {
  constructor(props){
    super(props)
    this.editModeOn = this.editModeOn.bind(this)
    this.state = {editable: false}
  }

  editModeOn(event){
    this.props.editTheArticle()
  }

  parseName(name){
    return name.replace(/\s/g, "").toLowerCase()
  }

  render(){
    let link = this.parseName('/features/edit/'+this.props.article.article.name)
    return (
      <div className='col-md-6 col-sm-6 col-6 article'>
        <Link onClick={this.editModeOn} to={link}><Button className='article--edit_button' bsStyle='primary'>Edit</Button></Link>
        <p className='article--name'>{this.props.article.article.name}</p>
        <p className='article--desc'>{this.props.article.article.description}</p>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {article: state.article}
}

const mapDispatchToProps = dispatch => {
  return {
    editTheArticle: () => {
      dispatch(editArticle())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article)
