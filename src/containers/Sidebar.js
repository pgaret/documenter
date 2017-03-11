import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Panel,ButtonGroup,Button} from 'react-bootstrap'
import Feature from './Feature'
import NewFeature from '../components/NewFeature'
import './containers.css'

class Sidebar extends Component {
  constructor(props){
    super(props)
    this.state = {features: [], new_feature: false, current: 'features', loaded: <p>Loading...</p>}
  }

  componentWillReceiveProps(nextProps){
    this.state.features = []
    if (nextProps.features.features.length !== 0){
      this.state.features = []
      for (let i = 0; i < nextProps.features.features.length; i++){
        let feature = nextProps.features.features[i]
        this.state.features.push(<Feature key={i+(i/10 + 1)} name={feature.name} subfeatures={feature.subfeatures} _id={feature._id} />)
      }
    }
    if (this.state.features !== 0){
      this.state.loaded = <span />
    }
  }

  render(){
    let current_buttons = <NewFeature />
    if (this.state.current === 'features'){
      current_buttons = <NewFeature />
    }
    return (
      <div className='col-md-4 col-sm-4 col-4 sidebar'>
        <ButtonGroup>
          <Button>Product</Button>
          <Button>Projects</Button>
          <Button>Team</Button>
        </ButtonGroup>
        <br />
        <br />
        {current_buttons}
        {this.state.loaded}
        {this.state.features}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {features: state.features, sidebar: state.sidebar}
}

export default connect(mapStateToProps, {})(Sidebar)
