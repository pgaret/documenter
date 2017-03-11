import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link, hashHistory} from 'react-router'
import {Button, FormGroup, ControlLabel, FormControl} from 'react-bootstrap'
import {editArticle, setArticleInState} from '../actions/index.js'
import './components.css'

class Article extends Component {
  constructor(props){
    super(props)
    this.editModeOn = this.editModeOn.bind(this)
    this.state = {editable: false}
    // console.log(props)
  }

  editModeOn(event){
    this.props.editTheArticle()
  }

  parseName(name){
    return name.replace(/\s/g, "").toLowerCase()
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.features.features && nextProps.article.length === 0){
      let subfeature = nextProps.location.pathname.split("/")[3]
      for (let i = 0; i < nextProps.features.features.length; i++){
        for (let j = 0; j < nextProps.features.features[i].subfeatures.length; j++){
          if (nextProps.features.features[i].subfeatures[j]._id === subfeature){
            nextProps.setTheArticle(nextProps.features.features[i].subfeatures[j])
            break;
          }
          // console.log(i)
        }
      }
      // console.log("EMPTY")
    }
  }

  render(){
    let link = '/features/'+this.props.article.f_id+"/"+this.props.article._id+"/edit"
    let btn = this.props.article.name !== 'Kustomer' ?
          <Link onClick={this.editModeOn} to={link}><Button className='article--edit_button' bsStyle='primary'>Edit</Button></Link> :
          <span />

    return (
      <div className='col-md-6 col-sm-6 col-6 article'>
        {btn}
        <p className='article--name'>{this.props.article.name}</p>
        <p className='article--desc'>{this.props.article.description}</p>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {article: state.article, features: state.features}
}

const mapDispatchToProps = dispatch => {
  return {
    editTheArticle: () => {
      dispatch(editArticle())
    },
    setTheArticle: (article) => {
      dispatch(setArticleInState(article))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article)
