import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {setArticleInState} from '../actions/index.js'
import './components.css'

class Subfeature extends Component {
  constructor(props){
    super(props)
    this.setArticle = this.setArticle.bind(this)
  }

  parseName(name){
    return name.replace(/\s/g, "").toLowerCase()
  }

  setArticle(){
    this.props.setArticleInState({name: this.props.name, description: this.props.description, _id: this.props._id, f_id: this.props.f_id})
  }

  render() {
    let link = this.parseName('/features/'+this.props.f_id+"/"+this.props._id)
    return (
      <div className='sidebar--subfeature'>
        <Link onClick={this.setArticle} to={link}>{this.props.name}</Link>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {features: state.features}
}

const mapDispatchToProps = dispatch => {
  return {
    setArticleInState: (article) => {
      dispatch(setArticleInState(article))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Subfeature)
