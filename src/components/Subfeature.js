import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {setArticle} from '../actions/index.js'
import './components.css'

class Subfeature extends Component {
  constructor(props){
    super(props)
    this.setTheArticle = this.setTheArticle.bind(this)
  }

  parseName(name){
    return name.replace(/\s/g, "").toLowerCase()
  }

  setTheArticle(){
    this.props.setNewArticle({name: this.props.name, description: this.props.description, _id: this.props._id, f_id: this.props.f_id})
  }

  render() {
    let link = this.parseName('/features/'+this.props.name)
    return (
      <div className='sidebar--subfeature'>
        <Link onClick={this.setTheArticle} to={link}>{this.props.name}</Link>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {features: state.features}
}

const mapDispatchToProps = dispatch => {
  return {
    setNewArticle: (article) => {
      dispatch(setArticle(article))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Subfeature)
