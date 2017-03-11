import React, {Component} from 'react'
import {Panel,Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {settingFeatureName, addFeatureToDb} from '../actions/index'

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
    return(
      this.state.clicked ?
      <div><input /><button onClick={this.handleSubmit}>Submit</button><button onClick={this.handleClick}>Cancel</button></div> :
      <Button onClick={this.handleClick}>Add Feature</Button>
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
      dispatch(addFeatureToDb(name))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewFeature)
