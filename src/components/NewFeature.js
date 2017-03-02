import React, {Component} from 'react'
import {connect} from 'react-redux'
import {settingFeatureName, createNewFeature} from '../actions/index'

class NewFeature extends Component {
  constructor(props){
    super(props)
    this.state = {clicked: false}
    this.handleClick = this.handleClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleClick(){
    this.props.settingName()
  }

  handleSubmit(event){
    this.props.createFeature(event.target.parentElement.children[0].value)
  }

  componentWillReceiveProps(nextProps){
    this.state.clicked = nextProps.features.features.setting
  }

  render(){
    let current = this.state.clicked ?
      <div><input /><button onClick={this.handleSubmit}>Submit</button><button onClick={this.handleClick}>Cancel</button></div> :
      <a href="#" onClick={this.handleClick}>+</a>
    return(
      <div>{current}</div>
    )
  }
}

const mapStateToProps = state => {
  return {features: state.features}
}

const mapDispatchToProps = dispatch => {
  return {
    settingName: () => {
      dispatch(settingFeatureName())
    },
    createFeature: (name) => {
      dispatch(createNewFeature(name))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewFeature)
