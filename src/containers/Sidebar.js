import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Panel} from 'react-bootstrap'
import Feature from './Feature'
import NewFeature from '../components/NewFeature'
import './containers.css'

class Sidebar extends Component {
  constructor(props){
    super(props)
    this.state = {features: [], new_feature: false}
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps)
    this.state.features = []
    if (this.state.features.length !== nextProps.features.features.length){
      this.state.features = [<NewFeature key={-1} />]
      for (let i = 0; i < nextProps.features.features.length; i++){
        let feature = nextProps.features.features[i]
        this.state.features.push(<Feature key={i+(i/10 + 1)} name={feature.name} subfeatures={feature.subfeatures} _id={feature._id} />)
      }
    }
  }

  render(){
    let loader = this.state.features.length === 0 ? <p>Loading...</p> : <span />
    console.log(this.state.features)
    return (
      <div className='col-md-4 col-sm-4 col-4 sidebar'>
        {loader}
        {this.state.features}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {features: state.features}
}

export default connect(mapStateToProps, {})(Sidebar)
